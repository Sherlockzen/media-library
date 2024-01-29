/** @type {import('next').NextConfig} */
const nextConfig = {
 webpack: (config) => {
  config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
  return config;
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "d3p4cyetgqth06.cloudfront.net",
    port: "",
    pathname: "/**",
   },
  ],
 },
};

export default nextConfig;
