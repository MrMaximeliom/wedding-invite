import type { Metadata } from 'next';
import './globals.css';
import { weddingConfig } from '@/lib/config';
import MusicProvider from '@/components/MusicProvider';
import { THEMES } from '@/lib/theme';

// Runs before first paint, so there is no flash.
// Keep the index logic identical to getTodayTheme().
const themeScript = `
(function () {
  try {
    var T = ${JSON.stringify(THEMES)};
    var t = T[(new Date().getDate() - 1) % T.length];
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