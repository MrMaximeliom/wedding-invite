import type { Metadata } from 'next';
import './globals.css';
import { weddingConfig } from '@/lib/config';
import MusicProvider from '@/components/MusicProvider';

export const metadata: Metadata = {
  title: `${weddingConfig.coupleNames} — Wedding Invitation`,
  description: weddingConfig.inviteMessage,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}