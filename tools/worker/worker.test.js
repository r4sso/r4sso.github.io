import { test, expect, afterEach } from "bun:test";
import worker from "./worker.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function json(value) {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function makeEnv() {
  const { privateKey } = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  );
  const raw = new Uint8Array(await crypto.subtle.exportKey("pkcs8", privateKey));
  const b64 = btoa(String.fromCharCode(...raw)).match(/.{1,64}/g).join("\n");
  return {
    APP_ID: "1",
    INSTALLATION_ID: "2",
    PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----\n${b64}\n-----END PRIVATE KEY-----`,
  };
}

const env = await makeEnv();

function stub() {
  const calls = [];
  const auth = [];
  globalThis.fetch = async (url, opts) => {
    calls.push(String(url));
    if (String(url).includes("/app/installations/")) return json({ token: "bot-token" });
    auth.push(opts?.headers?.Authorization);
    if (String(url).includes("git/ref/heads/main")) return json({ object: { sha: "abc" } });
    return json({});
  };
  return { calls, auth };
}

function form(message = "Hello") {
  const f = new FormData();
  f.set("link", "https://r4sso.my/post/");
  f.set("page", "Test page");
  f.set("name", "Alice");
  f.set("message", message);
  return f;
}

function post(f) {
  return worker.fetch(
    new Request("https://example.com", { method: "POST", body: f }),
    env
  );
}

test("empty fields are ignored", async () => {
  const { calls } = stub();
  const res = await post(form(""));
  expect(res.headers.get("location")).toBe("https://r4sso.my/post/#comments");
  expect(calls.length).toBe(0);
});

test("valid comment opens the PR as the app", async () => {
  const { calls, auth } = stub();
  const res = await post(form());
  expect(res.headers.get("location")).toBe("https://r4sso.my/post/#comments");
  // bot token + ref, branch, file, PR
  expect(calls.length).toBe(5);
  expect(auth.every((header) => header === "Bearer bot-token")).toBe(true);
});
