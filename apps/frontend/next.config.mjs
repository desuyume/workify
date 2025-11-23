/** @type {import('next').NextConfig} */
const nextConfig = {
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
	staticPageGenerationTimeout: 180,
	experimental: {
		turbo: {
			turbo: {
      	rules: {
        	'*.svg': {
          	loaders: ['@svgr/webpack'],
          	as: '*.js',
        	},
				}
			},
		reactCompiler: true
		}
	},
}

export default nextConfig
