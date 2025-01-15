"use client";

import { Flex, Heading, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
    return (
        <SmartLink
            className={styles.hover}
            style={{
                textDecoration: 'none',
                margin: '0',
                height: '100%',
                display: 'block',
                width: '100%',
            }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                direction="row"
                alignItems="flex-start"
                fillWidth
                className={styles.postCard}
                style={{
                    height: '100%'
                }}
                gap="l">
                {post.metadata.image && thumbnail && (
                    <Flex
                        className={styles.thumbnailContainer}
                        style={{
                            width: '200px',
                            minWidth: '200px',
                            flexShrink: 0,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                        <SmartImage
                            priority
                            sizes="200px"
                            className={styles.imageHover}
                            src={post.metadata.image}
                            alt={'Thumbnail of ' + post.metadata.title}
                            aspectRatio="16 / 9"
                        />
                    </Flex>
                )}
                <Flex
                    position="relative"
                    fillWidth gap="s"
                    direction="column"
                    style={{
                        minHeight: thumbnail ? '150px' : 'auto',
                        justifyContent: 'space-between',
                    }}>
                    <Flex direction="column" gap="s">
                        <Heading
                            as="h2"
                            variant="heading-strong-l"
                            wrap="balance"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                            {post.metadata.title}
                        </Heading>
                        <Text
                            variant="label-default-s"
                            onBackground="neutral-weak"
                            style={{
                                opacity: 0.8,
                            }}>
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                    </Flex>
                    { post.metadata.tag &&
                        <Tag
                            label={post.metadata.tag}
                            variant="neutral"
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '4px 12px',
                            }} />
                    }
                </Flex>
            </Flex>
        </SmartLink>
    );
}