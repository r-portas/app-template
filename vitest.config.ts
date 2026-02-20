import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsConfigPaths(), viteReact()],
  test: {
    environment: "happy-dom",
    setupFiles: ["src/test/setup.ts"],
  },
});
