'use client'

import { useEffect, useState } from 'react'
import { useCookieConsent } from '@/context/CookieConsent'
import { Flex, Button, Text } from '@/once-ui/components'

const containerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 -4px 6px -1px rgb(0 0 0 / 0.1)',
} as const

const contentStyle = {
    background: 'var(--surface-background)',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
} as const

const textContainerStyle = {
    maxWidth: '720px',
} as const

export function CookieBanner() {
    const [isClient, setIsClient] = useState(false)
    const { consent, updateConsent, hasInteracted } = useCookieConsent()

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Don't render anything on server side or if user has already made a choice
    if (!isClient || hasInteracted) {
        return null
    }

    return (
        <div style={containerStyle}>
            <Flex
                direction="column"
                gap="m"
                padding="m"
                style={contentStyle}
                className="cookie-banner-content"
            >
                <Text 
                    variant="body-default-s"
                    style={textContainerStyle}
                    className="cookie-banner-text"
                >
                    This website uses cookies to enhance your experience. We use necessary cookies for essential functions 
                    and analytics cookies to understand how you interact with our website.
                </Text>
                <Flex 
                    direction="column"
                    gap="s"
                    className="cookie-banner-buttons"
                >
                    <Button
                        variant="secondary"
                        className="cookie-banner-button"
                        onClick={() => {
                            updateConsent({ analytics: false });
                            window.gtag?.('consent', 'update', {
                                analytics_storage: 'denied'
                            });
                        }}
                    >
                        Essential Only
                    </Button>
                    <Button
                        variant="primary"
                        className="cookie-banner-button"
                        onClick={() => {
                            updateConsent({ analytics: true });
                            window.gtag?.('consent', 'update', {
                                analytics_storage: 'granted'
                            });
                        }}
                    >
                        Accept All
                    </Button>
                </Flex>
            </Flex>
            <style jsx global>{`
                @media (min-width: 768px) {
                    .cookie-banner-content {
                        flex-direction: row !important;
                        gap: var(--spacing-l) !important;
                        padding: var(--spacing-l) !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                    }
                    
                    .cookie-banner-text {
                        font-size: var(--font-size-l) !important;
                    }
                }
                
                @media (min-width: 640px) {
                    .cookie-banner-buttons {
                        flex-direction: row !important;
                        width: auto !important;
                    }
                    
                    .cookie-banner-text {
                        font-size: var(--font-size-m) !important;
                    }
                    
                    .cookie-banner-button {
                        width: auto !important;
                    }
                }
                
                .cookie-banner-buttons {
                    width: 100%;
                }
                
                .cookie-banner-button {
                    width: 100%;
                }
            `}</style>
        </div>
    )
}
