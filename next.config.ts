import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    // This allows your specific local network IP to talk to the server
    allowedDevOrigins: ["localhost:3000", "192.168.152.1:3000"],
  },
} as any;

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}

export default nextConfig;
