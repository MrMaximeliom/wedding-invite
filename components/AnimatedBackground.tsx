'use client';

import { useEffect, useState } from 'react';
import { getTodayTheme, THEMES } from '@/lib/theme';

export default function AnimatedBackground({ children }: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState(THEMES[0]);

  useEffect(() => {
    setTheme(getTodayTheme().theme);
  }, []);

  return (
    <div
      className="min-h-screen w-full transition-colors duration-[3000ms] ease-in-out bg-animated"
      style={{
        // Custom properties consumed by the .bg-animated keyframes in globals.css
        // and by any child that wants to theme itself (e.g. accent color).
        // @ts-expect-error custom CSS vars
        '--from': theme.from,
        '--via': theme.via,
        '--to': theme.to,
        '--accent': theme.accent,
      }}
    >
      {children}
    </div>
  );
}
