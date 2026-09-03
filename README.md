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
