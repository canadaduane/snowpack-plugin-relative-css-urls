# snowpack-plugin-relative-css-urls

A plugin for [Snowpack](https://www.snowpack.dev) that lets you use relative URLs in your CSS, like this:

```css
.button {
  background-image: url(./icon.png);
}
```

The above CSS assumes your directory structure looks something like this:

```
PROJECT ROOT
+-src
  +-components
    +-Button
      +-index.js
      +-button.css
      +-icon.png
```

If you like to keep your assets together with your components, this makes it possible to reference them within your CSS.

This has also been tested with [Svelte](https://svelte.dev) via [@snowpack/plugin-svelte](https://www.snowpack.dev/#svelte).

## Usage

### Install

```bash
yarn add -D snowpack-plugin-relative-css-urls
```

### Configuration

Add this plugin to your Snowpack config:

**snowpack.config.json**

```json
{
  "plugins": ["snowpack-plugin-relative-css-urls"]
}
```

## Why is this necessary?

CSS normally allows relative images. It does so through a "baseURI" property--a read-only property that is set when CSS files are loaded by the browser. This allows a CSS file's internal `url()` references to refer to assets relative to the CSS file, NOT the path of the current page (i.e. the HTML file).

When snowpack adds `*.css.proxy.js` files in place of `*.css` files, it injects a `style` tag with the CSS corresponding to the `.css` file into the page. Everything works EXCEPT relative `url()` paths, because there is no way to set the style tag's baseURI.

See also:

- Discussion at https://github.com/pikapkg/snowpack/discussions/1327

Other resources:

- https://stackoverflow.com/questions/3812375/specifying-base-url-for-css
- https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
- https://developer.mozilla.org/en-US/docs/Web/CSS/url()
