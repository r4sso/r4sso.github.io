## r4sso.github.io
My Hugo personal website with custom `cgit` black & white square theme — no Tailwind, lightweight custom CSS.

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
