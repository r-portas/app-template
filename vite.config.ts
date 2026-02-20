import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    viteTsConfigPaths(), // this is the plugin that enables path aliases
    tanstackStart(),
    viteReact(),
    tailwindcss(),
  ],
});

export default config;
