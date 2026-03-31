---
title: "First init: Syntax"
date: 2021-01-23T23:11:13Z
lastmod: 2023-10-03T08:49:00Z
layout: "post"
thumb: "images/sisyphus.gif"
summary: "Hello World!"
math: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus feugiat ante justo, ut efficitur quam lacinia in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam tincidunt, leo in accumsan vestibulum, urna quam cursus risus, ac venenatis ante purus ac dolor. Nullam tempus lorem ac gravida venenatis. Etiam consectetur luctus magna ac consectetur. Nulla vel felis tempus, ultrices lorem a, aliquam magna. Donec velit libero, hendrerit in egestas vel, pretium nec nisi. Quisque in dolor est. Sed dignissim malesuada elit, eu tristique nunc ultrices id.

## Config
To enable globally, set in `config.toml` :
```
[params]
     tableOfContents = true
```
set toc to `false` in fronmatter do disable individually

## Frontmatter & Markdown

Feature | frontmatter | Description 
---- | ---- | ----
Disable Comments   | `comment:false` | Disable comments on a specific post or page. 
Disable Table of Contents | `toc:false` | Disable the table of contents for a specific post or page.
Enable Math | `math:true` | Enable math rendering for a specific post or page.
Add Thumbnail to Post| `thumb:"image.jpg"` | (local images only) Add a thumbnail image to a post. External images are not processed.

### Image

Add images to post:
``` markdown
![images](images.jpg "alt text here")
```
- Images uploaded locally will be converted into `.webp` format and also have a `.jpg` fallback.

### Mathematical notation.

- To enable KaTex globally set the parameter `math` to `true` in a project's configuration
- To enable KaTex on a per page basis include the parameter `math: true` in content files

**Note:** Use the online reference of [Supported TeX Functions](https://katex.org/docs/supported.html)


### Examples

Inline Math:

$ \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\) $

`$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$`,
$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$

Block math:

$$ \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } $$


The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.
```html
# H1
## H2
### H3
#### H4
##### H5
###### H6
```
### Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

### Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use *Markdown syntax* within a blockquote.

#### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

### Tables

Tables aren't part of the core Markdown spec, but Hugo supports them out-of-the-box.

   Name | Age
--------|------
    Bob | 27
  Alice | 23

  


#### Inline Markdown within tables

| Italics   | Bold     | Code   |
| --------  | -------- | ------ |
| *italics* | **bold** | `code` |

### Code Blocks

#### Code block with backticks

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

#### Code block indented with four spaces

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Example HTML5 Document</title>
    </head>
    <body>
      <p>Test</p>
    </body>
    </html>

#### Code block with Hugo's internal highlight shortcode
{{< highlight html >}}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
{{< /highlight >}}

### List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

* List item
* Another item
* And another item

#### Nested list

* Fruit
  * Apple
  * Orange
  * Banana
* Dairy
  * Milk
  * Cheese

### Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.


### Youtube Test
{{< youtube dQw4w9WgXcQ >}}



