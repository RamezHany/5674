import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en', 'id']
let defaultLocale = 'en'

function getLocale(request: NextRequest) {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    const locale = match(languages, locales, defaultLocale)
    return locale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    
    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        )
    }
}

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/((?!_next|api|favicon.ico|.*\\..*).*)',
        '/(en|id)/:path*'
    ]
}