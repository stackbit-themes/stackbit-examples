import { Model, FieldListModel } from "@stackbit/types";

export const Page: Model = {
  type: "page",
  name: "Page",
  fields: [
    {
      type: "string",
      name: "title",
      default: "This is a new page",
      required: true,
    },
    {
      type: "list",
      name: "sections",
      items: {
        type: "model",
        models: ["TextSection", "GallerySection"],
      },
    },
  ],
};
