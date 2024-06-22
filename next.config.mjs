/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: { NEXT_URL: process.env.URL }
};

export default nextConfig;