/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: { NEXT_URL: process.env.URL, MONGO_URL: process.env.MONGO_URL }
};

export default nextConfig;
