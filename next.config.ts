import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Forward browser logs to the terminal for easier debugging
    browserDebugInfoInTerminal: true,

    // Enable new devtools features
    devtoolNewPanelUI: true,
    devtoolSegmentExplorer: true,
  },
};

export default nextConfig;
