import { baseURL } from '@/app/resources'

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/blog',
                    '/blog/*',
                    '/resources',
                    '/resources/*'
                ],
                crawlDelay: 10,
                disallow: [
                    '/api/',
                    '/private/',
                    '/*.json$',
                    '/admin',
                    '/about',
                    '/about/*',
                    '/*?*',
                    '/*/private/*',
                ],
            },
            {
                userAgent: 'GPTBot',
                allow: ['/blog/', '/resources/'],
                disallow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/blog',
                    '/blog/*',
                    '/resources',
                    '/resources/*'
                ],
                disallow: ['/private/', '/admin/', '/about/', '/about/*'],
            },
            {
                userAgent: 'Bingbot',
                allow: [
                    '/',
                    '/blog',
                    '/blog/*',
                    '/resources',
                    '/resources/*'
                ],
                disallow: ['/private/', '/admin/', '/about/', '/about/*'],
            }
        ],
        sitemap: `https://${baseURL}/sitemap.xml`,
        host: `https://${baseURL}`,
    }
}