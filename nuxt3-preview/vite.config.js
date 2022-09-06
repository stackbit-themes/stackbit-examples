// vite.config.js
import { defineConfig } from "vite";

// Don't trigger a rebuild of the Vite server on local content file changes
export default defineConfig({
  server: {
    watch: {
      ignored: ["**/content/**"],
    },
  },
});
