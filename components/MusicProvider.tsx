'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { getTodaySong } from '@/lib/theme';

type MusicContextValue = { playing: boolean; toggle: () => void };
const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within <MusicProvider>');
  return ctx;
}

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Music');
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  // null on the server and during hydration, so no stale src is baked into the HTML.
  const [song, setSong] = useState<{ src: string; dayNumber: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Pick the song on the client only, using the real current date.
  useEffect(() => {
    setSong(getTodaySong());
  }, []);

  // Start playback the first time the visitor leaves the "/" landing page.
  useEffect(() => {
    if (!song?.src || startedRef.current || pathname === '/') return;
    startedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        setPlaying(false);
        setBlocked(true);
      });
  }, [pathname, song]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !song?.src) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => setBlocked(true));
    }
  };

  const showButton = pathname !== '/';

  return (
    <MusicContext.Provider value={{ playing, toggle }}>
      <audio ref={audioRef} src={song?.src || undefined} loop preload="auto" />
      {children}
      {showButton && (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-1">
          <button
            onClick={toggle}
            aria-label={playing ? 'Pause music' : 'Play music'}
            className="w-14 h-14 rounded-full bg-white/70 backdrop-blur shadow-lg flex items-center justify-center text-[var(--accent,#b3365b)] hover:scale-105 active:scale-95 transition-transform"
          >
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          {blocked && (
            <span className="text-[10px] uppercase tracking-wide text-[var(--accent,#b3365b)]/70 bg-white/70 px-2 py-0.5 rounded-full whitespace-nowrap">
              {t('tapForSound')}
            </span>
          )}
        </div>
      )}
    </MusicContext.Provider>
  );
}