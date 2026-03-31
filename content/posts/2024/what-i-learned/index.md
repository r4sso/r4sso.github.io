---
title: "Site dev: What I Learned"
date: 2024-02-28
lastmod: 2024-02-28T10:08:00Z
summary: "All things about what I learned when making this site."
tags: ["webdev"]
---

This article was meant to be published last year, but here we go. I will update this post as time goes by, sharing more things I learn and discover.

In early of 2023, I discovered [Hugo](https://gohugo.io/), a Static Site Generator. Additionally, I learned about [Tailwindcss](https://tailwindcss.com/). I don't have a lot of experience when it comes to developing websites. I have made websites with plain HTML, CSS, and even Bootstrap, but they were mostly `for fun projects` that I didn't finish and eventually abandoned. This website is probably the only one I took seriously and actually completed.

Below are a few things I learned when creating this site.

## Optimization

Reducing the overall size and bandwidth usage is crucial for performance. If you look the web today, you'll notice that it's often bloated with unnecessary analytics, and ads.

### Hugo

Hugo provides a convenient way to minify CSS, JS, JSON, HTML, SVG, or XML resources using `resources.Minify`. Here's an example in Go HTML template:

```go
{{ $css := resources.Get "css/main.css" }} 
{{ $style := $css | resources.Minify }}
```

Additionally, you can minify the final HTML output to `/public` by running the following command:

```bash
hugo --minify
```


### Tailwind CSS

Tailwind CSS is incredibly performance-focused and aims to produce the smallest CSS file possible by only generating the CSS you are actually using in your project. To minify Tailwind CSS, you can use the following command:

```bash
npx tailwindcss -o build.css --minify
```


### Images

Images are the biggest oversight, I've seen some site display uncompressed images (including me previously LOL) that can be several megabytes in size. As a result, this can significantly slow down and negatively impact its performance.

#### Size Them Correctly
Ensure that your images are appropriately sized. If the `max-width` of your website is `960px`, there's no need to serve images with a width larger than that. Similarly, if it's a thumbnail, use a thumbnail-sized image.


#### Serve Them in Modern Formats
The [WebP](https://en.wikipedia.org/wiki/WebP) image format is widely [supported by modern browsers](https://caniuse.com/webp) and can significantly reduce the file size of JPEG or PNG images without a noticeable loss in quality. 

[AVIF](https://en.wikipedia.org/wiki/AVIF) offers even better compression but since it's relatively new, it's not supported by Hugo. For sake of simplicity i will use WebP.

#### Lazy Load Them 
Take advantage of the lazy loading feature in HTML, which loads images as the user scrolls down the page and they come into view. This can improve the loading speed of pages with numerous images.
    
#### Set the Correct Width and Height
Always specify the width and height attributes for images to prevent content from shifting when the image loads, ensuring a smoother user experience. [Learn more](https://web.dev/optimize-cls/#images-without-dimensions).
    
#### Set the `alt`Text.
Add descriptive `alt` text to your images, not only for users who rely on screen readers but also to enhance your search engine ranking. Additionally, it serves as a fallback when the image fails to load. Writing a brief sentence describing the image is a small but worthwhile effort.
   
#### Hugo image proccessing   
To implement into hugo, create file `/layouts/_default/render-image.html`[^1]:
```go
{{ $src := .Page.Resources.GetMatch (printf "%s" (.Destination | safeURL)) }}

{{ if $src }}
<figure>
  {{ $data := newScratch }}

  {{ if gt $src.Width 1100 }}
    {{ $data.Set "webp" ($src.Resize "960x webp q90") }}
    {{ $data.Set "fallback" ($src.Resize "960x q90") }}
  {{ else }}
    {{ $data.Set "webp" ($src.Resize (printf "%dx%d webp q90" $src.Width $src.Height)) }}
    {{ $data.Set "fallback" ($src.Resize (printf "%dx%d q90" $src.Width $src.Height)) }}
  {{ end }}

  {{ $webp := $data.Get "webp" }}
  {{ $fallback := $data.Get "fallback" }}

  <a href="{{ $src.RelPermalink }}">
    <picture>
      <source srcset="{{ $webp.RelPermalink }}" type="image/webp">
      <img src="{{ $fallback.RelPermalink }}" alt="{{ .Text }}" loading="lazy" decoding="async" width="{{ $src.Width }}" height="{{ $src.Height }}" />
    </picture>
  </a>
  {{ with .Title }}<figcaption>- {{ . | markdownify }}</figcaption>{{ end }}
</figure>
{{end}}

``` 
[^1]: Images optimization reference: [ericmurphy.xyz/blog/images/](https://ericmurphy.xyz/blog/images/).

- Make sure to keep your [images in the same directory](https://gohugo.io/content-management/page-bundles/#leaf-bundles) as the post for this to work.

- If the image is wider than 960px, it will resize it to 960px. Otherwise, it will keep the image size the same and just convert it to WebP. (It will also optimize the fallback image for browsers that don’t support WebP.)'

- Wrap the image in a link to the original, unoptimized version of the image. So you can see the original images.

Use like normally in your markdown:
```markdown 
![Red Fox](fox.jpg "Photo by Ray Hennessy on Unsplash.")
```

![Red Fox](fox.jpg "Photo by [Ray Hennessy](https://unsplash.com/@rayhennessy) on [Unsplash](https://unsplash.com/).")

This image is only 48 KB, compared to the original 188 KB (1920 x 1277)
### Fonts
To further optimize your website, use WOFF and WOFF2 font formats to reduce file size. You can use site like [fontsquirrel.com/tools/webfont-generator](https://www.fontsquirrel.com/tools/webfont-generator) to generate webfont for you. If its say file is corrupted you can use site like [glyphrstudio.com/online/](https://www.glyphrstudio.com/online/) & And export it.