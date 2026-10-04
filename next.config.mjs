/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    'ais-dev-kjaszmqk26rc2l3rliuaim-98617995296.asia-east1.run.app',
    'ais-pre-kjaszmqk26rc2l3rliuaim-98617995296.asia-east1.run.app',
    '*.asia-east1.run.app',
    '*.run.app',
    'localhost:3000',
    '127.0.0.1:3000'
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
