/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
const basePath = isExport && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '';

/** 
 * Note: GitLab Pages is static-only. We compile a static export when NEXT_PUBLIC_STATIC_EXPORT=1,
 * and set basePath/assetPrefix so assets work at https://<user>.gitlab.io/<project>/
 */
const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: 'export' } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 60
    }
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "geolocation=()" }
      ]
    }
  ]
};

export default nextConfig;
