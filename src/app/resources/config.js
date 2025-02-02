const baseURL = 'zaghloul.me'

// Enable localization
const i18n = false;

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['en'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'en'         // Locale used by default and as a fallback
}

const routes = {
    '/':          true,
    '/about':     false,
    '/work':      false,
    '/blog':      true,
    '/gallery':   false,
    '/resources': true,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true
}

const effects = {
    mask: 'cursor',             // none | cursor | topLeft | topRight | bottomLeft | bottomRight
    gradient: {
        display: true,
        opacity: 0.2            // 0 - 1
    },
    dots: {
        display: true,
        opacity: 0.4,
        size: '16'          // 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 634
    },
    lines: {
        display: false,
    },
}

const style = {
    theme:       'dark',         // dark | light
    neutral:     'gray',         // sand | gray | slate
    brand:       'blue',      // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'blue',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',     // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'conservative',      // rounded | playful | conservative
    surface:     'filled',  // filled | translucent
    transition:  'all'           // all | micro | macro
}

const display = {
    location: false,
    time:     false
}

const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        mask: 'cursor',           // none | cursor | topLeft | topRight | bottomLeft | bottomRight
        gradient: {
            display: false,
            opacity: 0.2            // 0 - 1
        },
        dots: {
            display: false,
            color: 'accent-on-background-medium',
            opacity: 0.2,
            size: '16'
        },
        lines: {
            display: false,
        },
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions };