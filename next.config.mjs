
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "cdn.sanity.io",  // Corrected hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  