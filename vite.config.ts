import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    TanStackRouterVite({
      addExtensions: true,
    }),
    nodePolyfills(),
  ],
  build: {
    commonjsOptions: {
      include: ["node_modules/buffer/index.js"],
    },
  },
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
});
