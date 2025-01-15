'use client'

import Script from 'next/script'
import { useCookieConsent } from '@/context/CookieConsent'
import { GA_TRACKING_ID } from '@/app/resources/analytics'

export function GoogleAnalytics() {
    const { consent } = useCookieConsent()

    if (!consent.analytics) {
        return (
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied'
                    });
                `}
            </Script>
        )
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        cookie_flags: 'secure;samesite=strict'
                    });
                `}
            </Script>
        </>
    )
}
