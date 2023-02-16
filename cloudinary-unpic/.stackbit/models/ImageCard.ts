import { Model } from "@stackbit/types";

export const ImageCard: Model = {
  type: "object",
  name: "ImageCard",
  label: "Image Card",
  fields: [
    {
      type: "image",
      name: "image",
      required: true,
      source: "cloudinary",
    },
    {
      type: "string",
      name: "alt",
      required: true,
    },
    {
      type: "markdown",
      name: "attribution",
    },
  ],
};
