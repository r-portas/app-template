import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools(), // this plugin needs to be first
    // this is the plugin that enables path aliases
    viteTsConfigPaths(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
