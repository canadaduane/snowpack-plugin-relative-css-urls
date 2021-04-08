const path = require("path");
const { promises: fs } = require("fs");
const replace = require("replace-css-url");

const pkg = require("./package.json");

module.exports = function plugin(snowpackConfig, options) {
  return {
    name: pkg.name,
    async transform({ id, contents, isDev, fileExt }) {
      if (fileExt === ".css") {
        let relativePath;
        for (const [dirDisk, dirUrl] of Object.entries(snowpackConfig.mount)) {
          if (id.startsWith(dirDisk)) {
            relativePath = path.dirname(id.replace(dirDisk, dirUrl.url)).split(path.sep).join(path.posix.sep);
          }
        }

        if (relativePath) {
          const newContents = replace(contents, (url) => {
            if (
              url.startsWith("http") ||
              url.startsWith("//") ||
              url.startsWith("data:") ||
              url.startsWith("#") ||
              path.isAbsolute(url)
            ) {
              // don't touch absolute URLs
              return url;
            } else {
              return path.join(relativePath, url).split(path.sep).join(path.posix.sep);
            }
          });
          return newContents;
        } else {
          console.log(`[${pkg.name}] Unable to get relative path`);
          return contents;
        }
      }
    },
  };
};
