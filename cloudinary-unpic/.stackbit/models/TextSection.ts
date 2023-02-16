import { Model } from "@stackbit/types";

export const TextSection: Model = {
  type: "object",
  name: "TextSection",
  label: "Text Section",
  fields: [
    {
      type: "string",
      name: "title",
      default: "Section Title",
    },
    {
      type: "markdown",
      name: "body",
      default: "Section Body",
    },
  ],
};
