const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-contentful"),
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        deliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
        previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
        preview: isDev,
        watch: isDev,
        host: isDev ? "preview.contentful.com" : undefined,
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        flattenAssetUrls: true,
        liveUpdate: isDev,
      },
    },
  ],
};
