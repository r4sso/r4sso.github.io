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
```bash
hugo --minify --cleanDestinationDir
# or
make build
```

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
