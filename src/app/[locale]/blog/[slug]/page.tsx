import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/app/utils/utils'
import { getTranslations } from 'next-intl/server'
import { baseURL, renderContent } from '@/app/resources'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import styles from '../../blog.module.scss'

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
    }
}

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }) {
    console.log('Generating metadata for:', params);

    try {
        const post = await getPost(params.slug, params.locale);
        
        if (!post?.metadata?.title) {
            return {};
        }

        return generateMetadataFromPost(post, params);
    } catch (error) {
        console.error('Error generating metadata:', error);
        return notFound();
    }
}

function generateMetadataFromPost(post: any, params: { slug: string, locale: string }) {
    if (!post?.metadata?.title) {
        console.error('Invalid post metadata:', post);
        return notFound();
    }

    const publishDate = post.metadata.publishedAt ? new Date(post.metadata.publishedAt).toISOString() : null;
    const imageUrl = post.metadata.image ? `https://${baseURL}${post.metadata.image}` : `https://${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`;

    return {
        title: post.metadata.title,
        description: post.metadata.summary || '',
        keywords: post.metadata.tags || [],
        authors: [{ name: 'Selene Yu' }],
        publisher: 'Selene Yu',
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.summary || '',
            type: 'article',
            url: `https://${baseURL}/${params.locale}/blog/${params.slug}`,
            images: [
                {
                    url: imageUrl,
                    alt: post.metadata.title,
                    width: 1200,
                    height: 630
                }
            ],
            locale: params.locale,
            siteName: 'Selene Yu',
            publishedTime: publishDate,
            modifiedTime: publishDate,
            authors: ['Selene Yu']
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metadata.title,
            description: post.metadata.summary || '',
            images: [imageUrl],
            creator: '@seleneyu'
        },
        alternates: {
            canonical: `https://${baseURL}/${params.locale}/blog/${params.slug}`
        }
    };
}

export async function generateStaticParams({
    params: { locale }
}: {
    params: { locale: string }
}) {
    const posts = await getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    return posts.map((post) => ({
        slug: post.slug,
        locale,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string, locale: string } }) {
    console.log('Rendering blog post:', params);

    try {
        const post = await getPost(params.slug, params.locale);
        
        if (!post) {
            return notFound();
        }

        const t = await getTranslations();
        const { blog: blogContent } = renderContent(t);

        return (
            <article className={styles.article}>
                <header>
                    <h1>{post.metadata.title}</h1>
                    {post.metadata.summary && (
                        <p className={styles.summary}>{post.metadata.summary}</p>
                    )}
                </header>
                <MDXRemote source={post.content} options={options} />
            </article>
        );
    } catch (error) {
        console.error('Error rendering blog post:', error);
        return notFound();
    }
}