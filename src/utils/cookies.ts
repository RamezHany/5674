type CookieOptions = {
    maxAge?: number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
    const {
        maxAge,
        path = '/',
        domain,
        secure = true,
        sameSite = 'strict'
    } = options

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (maxAge) cookie += `; Max-Age=${maxAge}`
    if (path) cookie += `; Path=${path}`
    if (domain) cookie += `; Domain=${domain}`
    if (secure) cookie += '; Secure'
    if (sameSite) cookie += `; SameSite=${sameSite}`

    document.cookie = cookie
}

export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim())
        if (cookieName === name) {
            return decodeURIComponent(cookieValue)
        }
    }
    return null
}

export function deleteCookie(name: string, path = '/') {
    document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
