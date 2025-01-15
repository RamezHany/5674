'use client';

import React from 'react';
import Image from 'next/image';
import { Flex, Text, SmartLink, SmartImage, Heading } from '@/once-ui/components';
import { FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import styles from './Resources.module.css';

interface Resource {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    type: 'pdf' | 'video' | 'link';
    image?: string;
    downloadUrl: string;
    publishedAt: string;
    tag?: string;
    socialShare?: {
      twitter?: string;
      linkedin?: string;
    };
  };
  content?: string;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const isExternalLink = resource.metadata.type === 'link';
  const isPDF = resource.metadata.type === 'pdf';

  return (
    <SmartLink
      href={isExternalLink ? resource.metadata.downloadUrl : `/resources/${resource.slug}`}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      className={styles.hover}
      style={{
        textDecoration: 'none',
        margin: '0',
        height: '100%',
        display: 'block',
        width: '100%',
      }}>
      <Flex
        position="relative"
        direction="column"
        fillWidth
        className={styles.card}
        style={{
          height: '100%'
        }}
        gap="l">
        {resource.metadata.image && (
          <Flex
            className={styles.thumbnailContainer}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
            <SmartImage
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={resource.metadata.image}
              alt={resource.metadata.title}
              className={styles.thumbnail}
            />
          </Flex>
        )}
        <Flex direction="column" gap="s">
          <Flex direction="row" alignItems="center" justifyContent="space-between" gap="m">
            <Heading as="h3">{resource.metadata.title}</Heading>
            {isExternalLink && <FaExternalLinkAlt size={16} />}
            {isPDF && <FaDownload size={16} />}
          </Flex>
          <Text>{resource.metadata.summary}</Text>
          <Flex direction="row" alignItems="center" gap="m" wrap>
            <Text className={styles.type}>
              {resource.metadata.type?.toUpperCase() || 'RESOURCE'}
            </Text>
            {resource.metadata.tag && (
              <Text className={styles.tag}>{resource.metadata.tag}</Text>
            )}
            <Text className={styles.date}>
              {new Date(resource.metadata.publishedAt).toLocaleDateString()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </SmartLink>
  );
}
