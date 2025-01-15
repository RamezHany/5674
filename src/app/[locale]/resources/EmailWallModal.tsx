'use client';

import { useState } from 'react';
import { Flex, Heading, Text, Button, Input } from '@/once-ui/components';
import styles from './EmailWallModal.module.css';

interface EmailWallModalProps {
  resource: {
    title: string;
    url: string;
  };
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EmailWallModal({ resource, onClose, onSuccess }: EmailWallModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

      setIsSubmitted(true);
      onSuccess?.();
      if (resource.url) {
        window.open(resource.url, '_blank');
      }
    } catch (err) {
      setError('Failed to submit email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <Flex 
        className={styles.modal}
        direction="column"
        gap="l"
        onClick={e => e.stopPropagation()}
      >
        {isSubmitted ? (
          <>
            <Heading variant="heading-strong-l">Thank you!</Heading>
            <Text>You now have access to the resource.</Text>
            <Button
              onClick={() => {
                if (resource.url) {
                  window.open(resource.url, '_blank');
                }
              }}>
              Download Resource
            </Button>
          </>
        ) : (
          <>
            <Heading as="h2" variant="heading-strong-l">Access {resource.title}</Heading>
            <Text>Enter your email to access this resource.</Text>

            <form onSubmit={handleSubmit} className={styles.form}>
              <Flex direction="column" gap="m">
                <Input
                  id="email-input"
                  label="Email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <Text color="error">{error}</Text>}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get Resource'}
                </Button>
              </Flex>
            </form>
          </>
        )}
      </Flex>
    </div>
  );
}