import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Domains can be configured to support different locales
  localePrefix: 'always'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};