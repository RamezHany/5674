import { Flex, Heading, Text } from '@/once-ui/components';
import styles from './Resources.module.css';
import { renderContent } from '@/app/resources';
import { getTranslations } from 'next-intl/server';
import { getResources } from '@/app/utils/utils';
import { ResourceCard } from './ResourceCard';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function ResourcesPage({ params: { locale } }: PageProps) {
  const resources = await getResources(locale);
  const t = await getTranslations();
  const { resources: resourcesContent } = renderContent(t);

  return (
    <Flex direction="column" gap="xl" className={styles.container}>
      <Flex direction="column" gap="m">
        <Heading as="h1">{resourcesContent.title}</Heading>
        <Text>{resourcesContent.description}</Text>
      </Flex>

      <Flex direction="row" gap="l" wrap className={styles.resourcesGrid}>
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </Flex>
    </Flex>
  );
}