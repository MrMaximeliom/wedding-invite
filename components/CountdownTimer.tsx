'use client';

import { useEffect, useState } from 'react';
import { weddingConfig } from '@/lib/config';

function getTimeLeft() {
  const diff = new Date(weddingConfig.weddingDateTime).getTime() - Date.now();
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
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Minutes', time.minutes],
    ['Seconds', time.seconds],
  ];

  if (time.done) {
    return (
      <p className="font-script text-3xl text-[var(--accent,#b3365b)]">We&apos;re married! 💍</p>
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
