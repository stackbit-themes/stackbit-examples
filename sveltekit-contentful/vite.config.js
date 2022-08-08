import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  server: { hmr: { path: "/vite-hmr/" } },
  plugins: [sveltekit()],
};

export default config;
