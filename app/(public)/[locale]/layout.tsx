import type { Metadata } from 'next';
import '@/app/globals.css';
import { weddingConfig, THEME_WINDOW_DAYS , DEBUG_DAY  } from '@/lib/config';
import { THEMES } from '@/lib/theme';
import MusicProvider from '@/components/MusicProvider';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import '@/app/globals.css';
import { routing } from '@/i18n/routing';
import {
  Amiri,
  Aref_Ruqaa,
  Cairo,
  Tajawal,
} from 'next/font/google';
// Runs before first paint, so there is no flash. Mirrors getTodayTheme()
// in lib/theme.ts exactly — keep these in sync if that logic ever changes.
const themeScript = `
(function () {
  try {
    var THEMES = ${JSON.stringify(THEMES)};
    var WINDOW_DAYS = ${THEME_WINDOW_DAYS};
    var target = new Date(${JSON.stringify(weddingConfig.weddingDateTime)});
    
var debugDay = ${JSON.stringify(DEBUG_DAY || null)};
var now = debugDay ? new Date(debugDay) : new Date();

    var diffMs = target.getTime() - now.getTime();
    var remaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    var clamped = Math.max(0, Math.min(WINDOW_DAYS, remaining));
    var progress = 1 - clamped / WINDOW_DAYS;
    var dayIndex = Math.min(WINDOW_DAYS - 1, Math.floor(progress * WINDOW_DAYS));
    var themeIndex = Math.min(THEMES.length - 1, Math.floor((dayIndex / WINDOW_DAYS) * THEMES.length));
    var t = THEMES[themeIndex];
    console.log('🎨 themeScript: dayIndex', dayIndex, 'themeIndex', themeIndex, 'theme', t);
    var s = document.documentElement.style;
    s.setProperty('--from', t.from);
    s.setProperty('--via', t.via);
    s.setProperty('--to', t.to);
    s.setProperty('--accent', t.accent);
  } catch (e) {}
})();
`;

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-aref-ruqaa',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const title = isArabic
    ? `دعوة زفاف ${weddingConfig.coupleNames}`
    : `${weddingConfig.coupleNames} — Wedding Invitation`;

  const description = isArabic
    ? "يسعدنا دعوتكم لمشاركتنا فرحة زفافنا."
    : "Together with our families, we invite you to celebrate our wedding.";

  const alt = isArabic ? "دعوة زفافنا" : "Our Wedding Invitation";

  return {
    title,
    description,

    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },

    // Apple: stops Safari from turning dates/numbers into phone links
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
    },

    // Apple: home-screen icon + "Add to Home Screen" title
    icons: {
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: {
      capable: true,
      title: isArabic ? "دعوة الزفاف" : "Wedding Invitation",
      statusBarStyle: "default",
    },

    // iMessage, WhatsApp, Facebook read Open Graph
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "Our Wedding Invitation",
      url: `/${locale}`,
      locale: isArabic ? "ar_AE" : "en_US",
      images: [
        {
          url: "/images/share-updated.jpg",
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },

    // Twitter/X keeps the original "Scan to view" image
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/share-updated.jpg"],
    },
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isArabic = locale === 'ar';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body  className={`
      min-h-full flex flex-col
    ${amiri.variable}
    ${arefRuqaa.variable}
    ${cairo.variable}
        ${isArabic ? 'font-arabic' : 'font-english'}
  `} >
        <NextIntlClientProvider>
          <MusicProvider>{children}</MusicProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
