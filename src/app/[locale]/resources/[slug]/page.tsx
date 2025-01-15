import { Flex, Heading, Text, SmartImage } from '@/once-ui/components';
import { getResource } from '@/app/utils/utils';
import { getTranslations } from 'next-intl/server';
import { renderContent } from '@/app/resources';
import styles from '../Resources.module.css';
import EmailForm from './EmailForm';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight]
  }
};

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function ResourcePage({ params: { locale, slug } }: PageProps) {
  const resource = await getResource(slug, locale);
  const t = await getTranslations();
  const { resources: resourcesContent } = renderContent(t);

  if (!resource) {
    return (
      <Flex direction="column" gap="xl" className={styles.container}>
        <Heading as="h1">Resource not found</Heading>
        <Text>The resource you're looking for doesn't exist.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="xl" className={styles.container}>
      <Flex direction="column" gap="m">
        <Heading as="h1">{resource.metadata.title}</Heading>
        <Text>{resource.metadata.summary}</Text>
        
        <Flex direction="row" gap="m" alignItems="center">
          <Text className={styles.type}>
            {resource.metadata.type?.toUpperCase() || 'RESOURCE'}
          </Text>
          {resource.metadata.tag && (
            <Text className={styles.tag}>{resource.metadata.tag}</Text>
          )}
        </Flex>
      </Flex>

      {resource.metadata.image && (
        <Flex
          className={styles.heroImage}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
          <SmartImage
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            style={{
              width: '100%',
              height: 'auto',
            }}
            src={resource.metadata.image}
            alt={resource.metadata.title}
          />
        </Flex>
      )}

      <article className={styles.content}>
        <MDXRemote source={resource.content} options={options} />
      </article>

      <EmailForm
        resource={{
          title: resource.metadata.title,
          url: resource.metadata.downloadUrl
        }}
      />
    </Flex>
  );
}