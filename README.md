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
