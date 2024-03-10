/** @type {import('next').NextConfig} */
const nextConfig = {
    output: `standalone`,
    images: {
        domains: ['images.unsplash.com', 'zicco.co.ke']
    }
};

export default nextConfig;