## r4sso.github.io
My Hugo personal website with custom theme.

### Requirements
- Hugo **extended** (latest)

### Development
```bash
hugo server --disableFastRender
# or
make run
```

### Production
Deployment runs on GitHub Actions: any push to `main` rebuilds the site
(`hugo --minify`) and publishes `./public` to the `gh-pages` branch.
For a local preview build:
```bash
hugo --minify --cleanDestinationDir
# or
make build
```

### Comments
No accounts, no email. The form POSTs to a tiny Cloudflare Worker
(`tools/worker/`) that verifies a Cloudflare Turnstile token first, then commits
one JSON entry to `data/comments/` on a branch and opens a review PR. Approve =
merge; the deploy workflow rebuilds `gh-pages` on every merge. Bots fail the
Turnstile check before any GitHub call, so spam never leaves a PR in history.

```json
{
  "title": "Comment on: <page title>",
  "created": "2026-10-24T12:00:00Z",
  "author": "Satoshi",
  "website": "https://example.com",
  "body": "markdown body"
}
```

The build renders every entry whose title matches the page, sorted by date;
`comment: false` in front matter hides the section. One-time setup:
1. Create a GitHub App named e.g. `comment-bot`, with contents and
   pull-requests read/write, generate a private key, and install it on this repo.
2. Create a Turnstile widget in the Cloudflare dashboard for `r4sso.my`.
3. `cd tools/worker` and set the secrets `APP_ID`, `INSTALLATION_ID`,
   `PRIVATE_KEY` (the PEM), and `TURNSTILE_SECRET` with `npx wrangler secret put <name>`.
4. Put the worker URL in `commentsEndpoint` and the widget's site key in
   `turnstileSiteKey` in `config.toml`, then `npx wrangler deploy`.

Comment form tests: `bun test tools/worker/`.

### Debug
```bash
hugo server -D --logLevel debug --disableFastRender
# or
make debug
```

### Fonts
The shipped web fonts are cut down to the characters this site uses, which is
17 KB instead of 48 KB. The full fonts live in `tools/fonts/` and are never
published.

After adding content with new characters, cut the fonts again:
```bash
pip install brotli fonttools
python3 tools/subset-fonts.py
```
