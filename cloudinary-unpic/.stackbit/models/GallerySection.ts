import { Model } from "@stackbit/types";

export const GallerySection: Model = {
  type: "object",
  name: "GallerySection",
  label: "Gallery",
  fields: [
    {
      type: "string",
      name: "title",
      default: "Gallery Title",
    },
    {
      type: "list",
      name: "cards",
      items: {
        type: "model",
        models: ["ImageCard"],
      },
    },
  ],
};
