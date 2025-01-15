'use client';

import { useState } from 'react';
import { Flex, Heading, Text, Button, Icon } from '@/once-ui/components';
import styles from '../Resources.module.css';
import EmailWallModal from '../EmailWallModal';

interface EmailWallWrapperProps {
  resource: {
    title: string;
    url: string;
  };
}

export default function EmailWallWrapper({ resource }: EmailWallWrapperProps) {
  const [showEmailWall, setShowEmailWall] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  if (hasAccess) {
    return (
      <Flex direction="column" gap="m" className={styles.accessPrompt}>
        <Button
          onClick={() => window.open(resource.url, '_blank')}
          prefixIcon="folder"
        >
          Download Resource
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column" gap="m" className={styles.accessPrompt}>
        <Icon name="folder" size="xl" />
        <Heading as="h2">Get Access to This Free Resource</Heading>
        <Text>Enter your email to get immediate access to this resource.</Text>
        <Button onClick={() => setShowEmailWall(true)}>
          Get Access
        </Button>
      </Flex>
      {showEmailWall && (
        <EmailWallModal
          onClose={() => setShowEmailWall(false)}
          onSuccess={() => setHasAccess(true)}
          resource={resource}
        />
      )}
    </>
  );
}