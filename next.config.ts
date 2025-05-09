
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'punkapi.online',
            },
        ],
    },
};


export default nextConfig;
