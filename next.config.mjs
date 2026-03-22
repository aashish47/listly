/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	reactCompiler: true,
};

export default nextConfig;
