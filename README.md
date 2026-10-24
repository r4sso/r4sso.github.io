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
JavaScript-free, no accounts, no email. The form POSTs (plain HTML) to a tiny
Cloudflare Worker (`tools/worker/`) that commits one JSON entry to
`data/comments/` on a branch and opens a review PR. Approve = merge; the
deploy workflow rebuilds `gh-pages` on every merge.

```json
{
  "title": "Comment on: <page title>",
  "created": "2026-10-24T12:00:00Z",
  "author": "Satoshi",
  "email": "",
  "website": "https://example.com",
  "body": "markdown body"
}
```

`email` is stored but never displayed; `comment: false` in front matter hides
the section. One-time worker setup:
1. Fine-grained GitHub PAT for this repo only — contents + pull-requests, read/write.
2. `cd tools/worker && npx wrangler deploy && npx wrangler secret put TOKEN`
3. Put the worker URL into `commentsEndpoint` in `config.toml`.

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
