/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com", // Google
            "res.cloudinary.com" // Cloudinary
        ]
    }
}

module.exports = nextConfig
