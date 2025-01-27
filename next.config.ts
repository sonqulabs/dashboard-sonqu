import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'stimpulsacdnprod.blob.core.windows.net',
			},
		],
		unoptimized: true,
	},
};

export default nextConfig;
