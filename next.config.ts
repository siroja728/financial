import type { NextConfig } from "next";

// When will be deploy not to GH Pages but to Vercel or other hosting, we need modify config
const nextConfig: NextConfig = {};

export const runtime = "nodejs";

export default nextConfig;
