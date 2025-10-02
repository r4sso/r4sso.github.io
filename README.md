## my-website
My website source code.

### Requirements
- Hugo+**extended** (latest)
- Nodejs (npm) or BUN
- Tailwindcss
- [Typography plugin](https://tailwindcss.com/docs/typography-plugin)


## Build
### Install Tailwindcss
#### NPM
```
npm install -D tailwindcss @tailwindcss/cli @tailwindcss/typography
```
#### BUN
```
bun add -d tailwindcss @tailwindcss/cli @tailwindcss/typography postcss autoprefixer 
```

### 
For tailwindcss add following to `package.json`: 
```json
  "scripts": {
    "build": "npx @tailwindcss/cli -i ./assets/main.css -o ./assets/style.css",
    "watch": "npx @tailwindcss/cli -i ./assets/main.css -o ./assets/style.css --watch",
    "minify": "npx @tailwindcss/cli -i ./assets/main.css -o ./assets/style.css --minify"
  },
```
``` 
bun run build
hugo --cleanDestinationDir
```
#### Optimizing for Production
```
bun run minify
hugo --minify --cleanDestinationDir
```


## Watch mode
- Tailwind CSS will continuously monitor the specified input file (./assets/main.css in this case) for changes. Whenever a change is detected in the input file, Tailwind CSS will automatically recompile and regenerate the output file (./assets/style.css) with the updated styles. 

```
bun run watch
```

```
make run
```


## Build for Production
```
make build
```
