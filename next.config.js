/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // swcPlugins: [
        //     ['next-superjson-plugin', {}] // allows us to safely pass datetime objects and other properties that might not be compatible from server to client
        // ],
        // serverActions: true, // allows us to use server side actions
    },
    images: {
        domains: [
            'res.cloundinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    }
}

module.exports = nextConfig;