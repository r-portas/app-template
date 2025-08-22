import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: Fix the app shell then enable this
  // typedRoutes: true,
  experimental: {
    // Forward browser logs to the terminal for easier debugging
    browserDebugInfoInTerminal: true,

    // Enable new devtools features
    devtoolSegmentExplorer: true,
  },
};

export default nextConfig;
