import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// When will be deploy not to GH Pages but to Vercel or other hosting, we need modify config
const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/financial" : "",
  assetPrefix: isProd ? "/financial" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/financial",
  },
};

export default isProd ? nextConfig : {};
