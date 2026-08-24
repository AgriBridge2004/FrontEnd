const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const apiImagePattern = apiBaseUrl
  ? (() => {
      const url = new URL(apiBaseUrl);

      return {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
      };
    })()
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(apiImagePattern ? [apiImagePattern] : []),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
