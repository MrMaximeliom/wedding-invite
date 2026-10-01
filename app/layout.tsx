import type { Metadata } from 'next';
import './globals.css';
import { weddingConfig, THEME_WINDOW_DAYS , DEBUG_DAY  } from '@/lib/config';
import { THEMES } from '@/lib/theme';
import MusicProvider from '@/components/MusicProvider';

// Runs before first paint, so there is no flash. Mirrors getTodayTheme()
// in lib/theme.ts exactly — keep these in sync if that logic ever changes.
const themeScript = `
(function () {
  try {
    var THEMES = ${JSON.stringify(THEMES)};
    var WINDOW_DAYS = ${THEME_WINDOW_DAYS};
    var target = new Date(${JSON.stringify(weddingConfig.weddingDateTime)});
    const now = new Date(${JSON.stringify(DEBUG_DAY)}) || new Date();
    console.log('🎨 themeScript:', { now, target });
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

export const metadata: Metadata = {
  title: `${weddingConfig.coupleNames} — Wedding Invitation`,
  description: weddingConfig.inviteMessage,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}