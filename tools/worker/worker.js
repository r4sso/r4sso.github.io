// Comment form endpoint: anonymous HTML form POST -> pull request in the site
// repo. Deploy to Cloudflare Workers (free tier), then set the secret:
//   npx wrangler secret put TOKEN
// TOKEN is a fine-grained GitHub PAT for r4sso.github.io with
// contents:read+write and pull-requests:read+write, nothing else.
// The site form posts name/email(honeypot-guarded)/website/message; this
// commits one JSON file to data/comments/ on a branch and opens a review PR.

const REPO = "r4sso/r4sso.github.io";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return Response.redirect("https://r4sso.my", 302);
    }

    const f = await request.formData();
    const link = clean(String(f.get("link") || ""), 300) || "https://r4sso.my";

    if (f.get("spot")) return back(link); // honeypot: silently drop bots

    const page = clean(String(f.get("page") || ""), 200);
    const author = clean(String(f.get("name") || ""), 60);
    const email = clean(String(f.get("email") || ""), 80);
    const website = linkify(clean(String(f.get("website") || ""), 120));
    const body = clean(String(f.get("message") || ""), 4000);

    if (!page || !author || !body) return back(link);

    const entry = {
      title: "Comment on: " + page,
      created: new Date().toISOString(),
      author: author,
      email: email,
      website: website,
      body: body,
    };

    try {
      const now = Date.now();
      const branch = "comment-" + now;
      const path = "data/comments/" + now + ".json";

      const [baseOk, base] = await gh(env, "git/ref/heads/main", "GET");
      if (!baseOk) throw new Error("main ref");
      const baseSha = base.object.sha;

      const [refOk] = await gh(env, "git/refs", "POST", {
        ref: "refs/heads/" + branch,
        sha: baseSha,
      });
      if (!refOk) throw new Error("create branch");

      const [putOk] = await gh(env, "contents/" + path, "PUT", {
        message: "comment: " + page,
        content: b64(JSON.stringify(entry, null, 2)),
        branch: branch,
      });
      if (!putOk) throw new Error("create file");

      const [prOk] = await gh(env, "pulls", "POST", {
        title: "comment: " + page,
        head: branch,
        base: "main",
      });
      if (!prOk) throw new Error("create pr");
    } catch (err) {
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

function gh(env, path, method, payload) {
  return fetch("https://api.github.com/repos/" + REPO + "/" + path, {
    method: method,
    headers: {
      Authorization: "Bearer " + env.TOKEN,
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
