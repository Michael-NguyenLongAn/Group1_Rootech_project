import type { NextConfig } from "next";

const nextConfig: any = {
  experimental: {
    allowedDevOrigins: ["localhost:3000", "192.168.152.1:3000"],
  },
};

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}

export default nextConfig;
