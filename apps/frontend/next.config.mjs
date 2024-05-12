/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@workify/ui'],
	env: {
		API_URL: process.env.API_URL,
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
}

export default nextConfig
