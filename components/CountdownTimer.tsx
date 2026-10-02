

'use client';

import { useEffect, useState } from 'react';
import { weddingConfig, DEBUG_DAY } from '@/lib/config';
import { useLocale, useTranslations } from 'next-intl';

const DEBUG_START = DEBUG_DAY ? DEBUG_DAY.getTime() : null;
const DEBUG_BOOT = Date.now();

function getNow() {
  if (DEBUG_START !== null) {
    return DEBUG_START + (Date.now() - DEBUG_BOOT);
  }

  return Date.now();
}

function getTimeLeft() {
  const now = getNow();
  const diff = new Date(weddingConfig.weddingDateTime).getTime() - now;
  const clamped = Math.max(0, diff);

  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    done: diff <= 0,
  };
}

export default function CountdownTimer() {
  const t = useTranslations('Countdown');
  const locale = useLocale();

  // Stable initial value for server + client
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    // Calculate the real value only after hydration
    setTime(getTimeLeft());

    const id = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    [t('days'), time.days],
    [t('hours'), time.hours],
    [t('minutes'), time.minutes],
    [t('seconds'), time.seconds],
  ];

  if (time.done) {
    return (
      <p className={`font-script text-3xl text-[var(--accent,#b3365b)] ${locale === 'ar' ? 'font-arabic' : 'font-script'}`}>
        We&apos;re married! 💍
      </p>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-6">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-2xl sm:text-4xl font-semibold text-[var(--accent,#b3365b)] tabular-nums">
            {String(value).padStart(2, '0')}
          </span>

          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent,#b3365b)]/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}