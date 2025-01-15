'use client';

import { useState } from 'react';
import { Flex, Text, Button, Input, Icon } from '@/once-ui/components';
import styles from '../Resources.module.css';

interface EmailFormProps {
  resource: {
    title: string;
    url: string;
  };
}

export default function EmailForm({ resource }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/resources/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resourceUrl: resource.url }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Flex direction="column" gap="l" className={styles.emailFormContainer}>
        <Flex direction="column" gap="m" alignItems="center" className={styles.formHeader}>
          <Icon name="check" size="xl" onBackground="success-strong" className={styles.formIcon} />
          <Text size="xl" weight="strong" align="center" className={styles.formTitle}>
            Thank you!
          </Text>
          <Text align="center" color="secondary" size="m" className={styles.formSubtitle}>
            Click the button below to download your resource.
          </Text>
        </Flex>
        <Button
          onClick={() => window.open(resource.url, '_blank')}
          prefixIcon="folder"
          size="l"
          className={styles.submitButton}
        >
          Download Resource
        </Button>
      </Flex>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <Flex direction="column" gap="l" className={styles.emailFormContainer}>
        <Flex direction="column" gap="m" alignItems="center" className={styles.formHeader}>
          <Icon name="folder" size="xl" className={styles.formIcon} />
          <Text size="xl" weight="strong" align="center" className={styles.formTitle}>
            Get Access to This Free Resource
          </Text>
          <Text align="center" color="secondary" size="m" className={styles.formSubtitle}>
            Enter your email to get immediate access to this resource.
          </Text>
        </Flex>
        <Flex direction="column" gap="m" className={styles.formInputContainer}>
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
            required
            disabled={isSubmitting}
            size={1}
            className={styles.emailInput}
          />
          <Button 
            type="submit" 
            loading={isSubmitting}
            size="l"
            className={styles.submitButton}
          >
            Get Access Now
          </Button>
          {error && (
            <Text color="error" size="s" align="center" className={styles.errorText}>
              {error}
            </Text>
          )}
        </Flex>
      </Flex>
    </form>
  );
}
