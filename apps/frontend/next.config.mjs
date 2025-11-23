/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
	reactStrictMode: true,
	transpilePackages: ['@workify/ui'],
	env: {
		API_URL: process.env.API_URL,
		BACKEND_URL: process.env.BACKEND_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
	redirects: async () => {
		return [
			{
				source: '/settings',
				destination: '/settings/profile',
				permanent: true,
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/**',
			},
		],
	},
	output: "standalone",
	// Убираем экспериментальные фичи которые могут мешать
	// experimental: {
	// 	turbo: {
	// 		rules: {
	// 			'*.svg': {
	// 				loaders: ['@svgr/webpack'],
	// 				as: '*.js',
	// 			},
	// 		}
	// 	},
	// 	reactCompiler: true
	// }
}

export default nextConfig