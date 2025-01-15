import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';
import styles from './Posts.module.css';
import path from 'path';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    locale: string;
    thumbnail?: boolean;
    className?: string;
}

export function Posts({
    range,
    columns = '1',
    locale = 'en',
    thumbnail = false,
    className
}: PostsProps) {
    let allBlogs = [];
    try {
        allBlogs = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale].filter(Boolean));
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return null;
    }

    if (!allBlogs || allBlogs.length === 0) {
        return null;
    }

    const sortedBlogs = allBlogs.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid
                    className={`${styles.gridContainer} ${className}`}
                    columns={`repeat(${columns}, 1fr)`}
                    mobileColumns="1col"
                    fillWidth
                    gap="l"
                >
                    {displayedBlogs.map((post) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}