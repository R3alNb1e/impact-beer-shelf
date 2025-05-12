
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'punkapi.online',
            },
            {
                protocol: 'https',
                hostname: 'images.punkapi.com',
                // pathname: '/v2/**', // Example
            }
        ],
    },
};

export default nextConfig;