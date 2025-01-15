import React from 'react';
import Link from 'next/link';
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, IconButton, Icon } from '@/once-ui/components';
import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { Projects } from '@/components/work/Projects';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';
import styles2 from './styles.module.css';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
    const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function Home(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations();
	const { home, person, newsletter, social } = renderContent(t);
	return (
		<main className={styles2.contentSection}>
			<div className={styles2.container}>
				<Flex
					maxWidth="m" fillWidth gap="xl"
					direction="column" alignItems="center"
					className={styles.mainContainer}
					style={{
						background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
						borderRadius: '24px',
						margin: '0 auto',
					}}>
					<script
						type="application/ld+json"
						suppressHydrationWarning
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'WebPage',
								name: home.title,
								description: home.description,
								url: `https://${baseURL}`,
								image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
								publisher: {
									'@type': 'Person',
									name: person.name,
									image: {
										'@type': 'ImageObject',
										url: `${baseURL}${person.avatar}`,
									},
								},
							}),
						}}
					/>
					<Flex
						fillWidth
						direction="column"
						paddingY="l" gap="xl">
							<Flex
								className={`${styles2.responsiveContainer} ${styles2.glowContainer}`}
								fillWidth
								direction="row"
								alignItems="flex-start"
								justifyContent="space-between"
								gap="xl"
								style={{
									position: 'relative',
								}}>
								<Flex
									direction="column"
									style={{
										flex: '1',
									}} gap="m">
									<RevealFx
										translateY="4">
										<Heading
											wrap="balance"
											variant="display-strong-l"
											className={styles.headline}
											style={{
												background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
												WebkitBackgroundClip: 'text',
												WebkitTextFillColor: 'transparent',
											}}>
											{home.headline}
										</Heading>
									</RevealFx>
									<RevealFx
										translateY="8" delay={0.2}>
										<Text
											wrap="balance"
											onBackground="neutral-weak"
											variant="heading-default-xl">
											{home.subline}
										</Text>
									</RevealFx>
									<RevealFx translateY="12" delay={0.4}>
										<Flex
											direction="column"
											gap="m"
											style={{
											}}>
											<Button
												id="schedule"
												data-border="rounded"
												href="https://cal.com/zaghloul"
												variant="secondary"
												size="m">
												<Flex
													gap="8"
													alignItems="center">
													Schedule a Call
													<Arrow trigger="#schedule" style={{ color: 'var(--static-black)' }}/>
												</Flex>
											</Button>
											<Flex gap="s" alignItems="center" className={styles.socialIcons}>
												{social.map((item: {
													name: string;
													icon: string;
													link: string;
												}, index: number) => (
													<IconButton
														key={index}
														variant="tertiary"
														size="m"
														href={item.link}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={item.name}
														icon={item.icon}
													/>
												))}
											</Flex>
										</Flex>
									</RevealFx>
								</Flex>
								<Avatar
									className={styles.mobileAvatar}
									size="xl"
									src={person.avatar}
									aria-label={person.name}
									style={{
										transform: 'scale(1.2)',
										border: '4px solid rgba(255,255,255,0.1)',
										boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
										width: '140px',
										height: '140px',
										flexShrink: 0,
										marginLeft: '2rem'
									}}
								/>
							</Flex>
						</Flex>
						<RevealFx translateY="16" delay={0.6}>
							<Posts range={[1, 3]} columns="3" locale={locale} thumbnail className={styles.blogPosts} />
						</RevealFx>
						{newsletter.display && (
							<Flex
								fillWidth
								direction="column"
								alignItems="right"
								gap="l"
								className={styles.mobileSection}>
								<Mailchimp newsletter={newsletter} />
							</Flex>
						)}
					</Flex>
				</div>
			</main>
	);
}
