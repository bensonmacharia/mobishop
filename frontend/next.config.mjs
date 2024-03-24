/** @type {import('next').NextConfig} */
const nextConfig = {
    output: `standalone`,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'zicco.co.ke',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    }
};

export default nextConfig;