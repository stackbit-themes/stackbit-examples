import { Model } from "@stackbit/types";

export const SiteConfig: Model = {
  type: "data",
  name: "SiteConfig",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Site title",
    },
  ],
  singleInstance: true,
  file: "config.json",
};
