import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// When will be deploy not to GH Pages but to Vercel or other hosting, we need modify config
const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/financial" : "",
  images: {
    unoptimized: true,
  },
};

export default isProd ? nextConfig : {};
