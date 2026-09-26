/** Where the Express API lives. The browser never calls it directly for REST:
 * every `/api/*` request hits this Next.js app and is proxied server-side, so
 * the API shares the frontend's origin (no CORS preflights, one public URL).
 * Socket.IO still connects to the backend directly - Vercel rewrites can't
 * proxy WebSockets. */
const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:4000").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` }];
  },
};

module.exports = nextConfig;
