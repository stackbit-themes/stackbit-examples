// nitro.config.ts
import { defineNitroConfig } from "nitropack";
export default defineNitroConfig({
  serverAssets: [
    {
      baseName: "content",
      dir: "./content",
    },
  ],
});
