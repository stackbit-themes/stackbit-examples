const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-filesystem"),
      options: {
        watch: isDev,
        sources: [{ name: "data", path: path.join(__dirname, "content/data") }],
      },
    },
    {
      module: require("sourcebit-sample-plugin"),
      options: {
        watch: isDev,
        titleCase: true,
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        flattenAssetUrls: true,
        liveUpdate: isDev,
        pages: function(objects, utils) {
          return objects.reduce((pages, object) => {
            if (
              object.__metadata.modelName === "Page" &&
              object.__metadata.source === "sourcebit-sample-plugin"
            ) {
              return pages.concat({
                path: "/{slug}",
                page: { ...object, slug: utils.slugify(object["title"]) },
              });
            }

            return pages;
          }, []);
        },
        commonProps: function(objects, utils) {
          return {
            site: objects.find(
              (object) => object.__metadata.modelName === "SiteConfig"
            ),
          };
        },
      },
    },
  ],
};
