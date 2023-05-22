/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack5: true,
	webpack: (config) => {
		config.externals = [...config.externals, "bcrypt"]
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				pathname: "/*"
			},
			{
				protocol: "https",
				hostname: "i0.wp.com",
				pathname: "/lifeinmichigan.com/wp-content/gallery/jeff-fest-2022/*"
			}
		]
	}
}

module.exports = nextConfig
