/** @type {import('next').NextConfig} */
//https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.formula1.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
