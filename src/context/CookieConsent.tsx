'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from '../utils/cookies'

type CookieConsent = {
    analytics: boolean
    necessary: boolean
}

type CookieConsentContextType = {
    consent: CookieConsent
    updateConsent: (newConsent: Partial<CookieConsent>) => void
    hasInteracted: boolean
}

const CookieConsentContext = createContext<CookieConsentContextType>({
    consent: { analytics: false, necessary: true },
    updateConsent: () => {},
    hasInteracted: false,
})

export const useCookieConsent = () => useContext(CookieConsentContext)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<CookieConsent>({ analytics: false, necessary: true })
    const [hasInteracted, setHasInteracted] = useState(false)

    useEffect(() => {
        // Only run on client side
        const savedConsent = getCookie('cookie-consent')
        if (savedConsent) {
            try {
                const parsed = JSON.parse(savedConsent)
                setConsent(parsed)
                setHasInteracted(true)
                
                // Update GA consent state
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('consent', 'update', {
                        analytics_storage: parsed.analytics ? 'granted' : 'denied'
                    })
                }
            } catch (e) {
                console.error('Error parsing cookie consent:', e)
            }
        }
    }, [])

    const updateConsent = (newConsent: Partial<CookieConsent>) => {
        const updatedConsent = { ...consent, ...newConsent }
        setConsent(updatedConsent)
        setHasInteracted(true)
        
        setCookie('cookie-consent', JSON.stringify(updatedConsent), {
            maxAge: 365 * 24 * 60 * 60, // 1 year
            path: '/',
            secure: true,
            sameSite: 'strict'
        })

        // If analytics consent is revoked, delete GA cookies
        if (!updatedConsent.analytics) {
            document.cookie = '_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            document.cookie = '_ga_9YNTTKKL0T=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            document.cookie = '_gat=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            document.cookie = '_gid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
    }

    return (
        <CookieConsentContext.Provider value={{ consent, updateConsent, hasInteracted }}>
            {children}
        </CookieConsentContext.Provider>
    )
}
