/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
};

module.exports = withNextIntl(nextConfig);