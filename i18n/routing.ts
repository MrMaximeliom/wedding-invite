import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
    localeDetection: true,
  // '/en/wishes' and '/ar/wishes' — always prefixed so the URL itself
  // tells you (and search engines) which language you're looking at.
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
