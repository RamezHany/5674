import { baseURL } from '@/app/resources'
import { getPosts } from '@/app/utils/utils'

export default async function sitemap() {
    const posts = await getPosts()
    const blogPosts = posts.map((post) => ({
        url: `https://${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const routes = [
        {
            url: `https://${baseURL}`,
            lastModified: new Date('2025-01-14T15:15:36+02:00'),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `https://${baseURL}/blog`,
            lastModified: new Date('2025-01-14T15:15:36+02:00'),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `https://${baseURL}/resources`,
            lastModified: new Date('2025-01-14T15:15:36+02:00'),
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ]

    // Ensure all URLs are properly formatted and unique
    const allRoutes = [...routes, ...blogPosts]
    const uniqueRoutes = Array.from(new Set(allRoutes.map(route => route.url)))
        .map(url => allRoutes.find(route => route.url === url))

    return uniqueRoutes
}