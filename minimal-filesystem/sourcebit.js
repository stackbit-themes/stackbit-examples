const path = require("path");

const isDev = process.env.NODE_ENV === "development";

function urlPathFromFilePath(filePath) {
  const pathObject = path.posix.parse(filePath);
  const parts = pathObject.dir.split(path.posix.sep).filter(Boolean);
  if (pathObject.name !== "index") {
    parts.push(pathObject.name);
  }
  const urlPath = parts.join("/").toLowerCase();
  return "/" + urlPath;
}

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-filesystem"),
      options: {
        watch: isDev,
        sources: [
          { name: "data", path: path.join(__dirname, "content/data") },
          { name: "pages", path: path.join(__dirname, "content/pages") },
        ],
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        flattenAssetUrls: true,
        liveUpdate: isDev,
        pages: function (objects, utils) {
          return objects.reduce((pages, page) => {
            if (page.__metadata.sourceName === "pages") {
              return pages.concat({
                path: "/{slug}",
                page: {
                  ...page,
                  slug: urlPathFromFilePath(page.__metadata.relSourcePath),
                },
              });
            }

            return pages;
          }, []);
        },
        commonProps: function (objects, utils) {
          return {
            site: objects.find((object) => object.type === "SiteConfig"),
          };
        },
      },
    },
  ],
};
