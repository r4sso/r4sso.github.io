// Comment form endpoint: JavaScript-free HTML form POST -> pull request in
// the site repo. Deploy to Cloudflare Workers (free tier), then set secrets:
//   npx wrangler secret put APP_ID
//   npx wrangler secret put INSTALLATION_ID
//   npx wrangler secret put PRIVATE_KEY
// A GitHub App opens the PRs, so they are never authored by your personal
// account. The app needs contents:read+write and pull-requests:read+write.
// The form posts name/website/message; this commits one JSON file to
// data/comments/ on a branch and opens a review PR.

const REPO = "r4sso/r4sso.github.io";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return Response.redirect("https://r4sso.my", 302);
    }

    const f = await request.formData();
    const link = clean(String(f.get("link") || ""), 300) || "https://r4sso.my";

    const page = clean(String(f.get("page") || ""), 200);
    const author = clean(String(f.get("name") || ""), 60);
    const website = linkify(clean(String(f.get("website") || ""), 120));
    const body = clean(String(f.get("message") || ""), 4000);

    if (!page || !author || !body) return back(link);

    const entry = {
      title: "Comment on: " + page,
      created: new Date().toISOString(),
      author: author,
      website: website,
      body: body,
    };

    try {
      const bot = await installToken(env);
      const now = Date.now();
      const branch = "comment-" + now;
      const path = "data/comments/" + now + ".json";

      const [baseOk, base] = await gh(bot, "git/ref/heads/main", "GET");
      if (!baseOk) throw new Error("main ref");
      const baseSha = base.object.sha;

      const [refOk] = await gh(bot, "git/refs", "POST", {
        ref: "refs/heads/" + branch,
        sha: baseSha,
      });
      if (!refOk) throw new Error("create branch");

      const [putOk] = await gh(bot, "contents/" + path, "PUT", {
        message: "comment: " + page,
        content: b64(JSON.stringify(entry, null, 2)),
        branch: branch,
      });
      if (!putOk) throw new Error("create file");

      const [prOk] = await gh(bot, "pulls", "POST", {
        title: "comment: " + page,
        head: branch,
        base: "main",
      });
      if (!prOk) throw new Error("create pr");
    } catch (err) {
      console.error("comment: GitHub step failed:", err);
      return Response.redirect(link + "#comments-error", 303);
    }

    return Response.redirect(link + "#comments", 303);
  },
};

function clean(s, max) {
  return s.replace(/\p{C}/gu, " ").trim().slice(0, max);
}

function linkify(w) {
  if (!w) return "";
  if (/^https?:\/\/\S+$/.test(w)) return w;
  if (/^[^\s/]+\.[^\s/]+$/.test(w)) return "https://" + w;
  return "";
}

function back(link) {
  return Response.redirect(link + "#comments", 303);
}

// GitHub App auth: sign a short-lived JWT, exchange it for an installation
// token. PRs then show as the app, not as your personal account.
async function installToken(env) {
  const jwt = await appJwt(env);
  const url = "https://api.github.com/app/installations/" + env.INSTALLATION_ID + "/access_tokens";
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + jwt,
      Accept: "application/vnd.github+json",
      "User-Agent": "comments-worker",
    },
  });
  const data = await r.json();
  if (!r.ok || !data.token) throw new Error("bot token");
  return data.token;
}

async function appJwt(env) {
  const pem = (env.PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const keyData = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const key = await crypto.subtle.importKey(
    "pkcs8",
    Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({ iat: now - 60, exp: now + 540, iss: env.APP_ID })
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(head + "." + payload)
  );
  return head + "." + payload + "." + b64url(sig);
}

function gh(token, path, method, payload) {
  return fetch("https://api.github.com/repos/" + REPO + "/" + path, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "comments-worker",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  }).then((r) => Promise.all([r.ok, r.json()]));
}

function b64(s) {
  return btoa(
    String.fromCharCode(...new TextEncoder().encode(s))
  );
}

function b64url(value) {
  const bytes = typeof value === "string"
    ? new TextEncoder().encode(value)
    : new Uint8Array(value);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
