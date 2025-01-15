import { notFound } from 'next/navigation';
import { getRequestConfig, setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (locale !== 'en') {
    notFound();
  }

  setRequestLocale(locale);

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale
  };
});