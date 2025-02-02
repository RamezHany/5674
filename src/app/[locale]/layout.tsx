import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import "@/app/styles/fonts.css";
import "@/app/styles/trademark.css";

import classNames from 'classnames';

import { Footer, Header, RouteGuard } from "@/components";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieBanner } from "@/components/CookieBanner";
import { CookieConsentProvider } from "@/context/CookieConsent";
import { baseURL, effects, style } from '@/app/resources'
import { renderContent } from "@/app/resources";
import { routing } from "@/i18n/routing";

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Background, Flex } from "@/once-ui/components";

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const code = Source_Code_Pro({
    variable: '--font-code',
    subsets: ['latin'],
    display: 'swap',
});

interface RootLayoutProps {
    children: React.ReactNode;
    params: {locale: string};
}

export function generateStaticParams() {
    return routing.locales.map((locale: string) => ({locale}));
}

export async function generateMetadata(
    { params: { locale }}: { params: { locale: string }}
) {
    const t = await getTranslations();
    const { person, home } = renderContent(t);

    return {
        metadataBase: new URL(`https://${baseURL}/${locale}`),
        title: home.title,
        description: home.description,
        openGraph: {
            title: `${person.firstName}'s Portfolio`,
            description: 'Portfolio website showcasing my work.',
            url: baseURL,
            siteName: `${person.firstName}'s Portfolio`,
            locale: 'en_US',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
};

type FontConfig = {
    variable: string;
};

const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

export default async function RootLayout({
    children,
    params: {locale}
} : RootLayoutProps) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={messages}>
            <CookieConsentProvider>
                <Flex
                    as="html" lang="en"
                    background="page"
                    data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
                    data-solid={style.solid} data-solid-style={style.solidStyle}
                    data-theme={style.theme}
                    data-border={style.border}
                    data-surface={style.surface}
                    data-transition={style.transition}
                    className={classNames(
                        inter.variable,
                        secondary ? secondary.variable : '',
                        tertiary ? tertiary.variable : '',
                        code.variable)}>

                    <Flex style={{minHeight: '100vh'}}
                        as="body"
                        fillWidth margin="0" padding="0"
                        direction="column">
                        <GoogleAnalytics />
                        <Background
                            mask={effects.mask as any}
                            gradient={effects.gradient as any}
                            dots={effects.dots as any}
                            lines={effects.lines as any}/>

                        <Flex
                            fillWidth
                            minHeight="16">
                        </Flex>

                        <Header/>

                        <Flex
                            zIndex={0}
                            fillWidth paddingY="l" paddingX="l"
                            justifyContent="center" flex={1}>
                            <Flex
                                justifyContent="center"
                                fillWidth minHeight="0">
                                <RouteGuard>
                                    {children}
                                </RouteGuard>
                            </Flex>
                        </Flex>

                        <Footer/>
                        <CookieBanner />
                    </Flex>
                </Flex>
            </CookieConsentProvider>
        </NextIntlClientProvider>
    );
}