'use client';

import { useTranslations } from 'next-intl';
import { weddingConfig } from '@/lib/config';

export default function Stamp({ onClick }: { onClick: () => void }) {
  const t = useTranslations('Landing');

  return (
    <button
      onClick={onClick}
      aria-label={t('openInvitation')}
      className="stamp stamp-pulse float w-56 h-64 sm:w-64 sm:h-72 flex flex-col items-center justify-center border-4 border-dashed border-[var(--accent,#b3365b)] rounded-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <div className="flex items-end gap-2 text-[var(--accent,#b3365b)]">
        <span className="font-script text-6xl sm:text-7xl leading-none">{weddingConfig.initialA}</span>
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-2 opacity-90"
        >
          <path d="M12 21s-6.716-4.35-9.428-8.06C0.86 10.44 1.2 6.9 4.1 5.2 6.4 3.86 9.1 4.6 12 8c2.9-3.4 5.6-4.14 7.9-2.8 2.9 1.7 3.24 5.24 1.53 7.74C18.72 16.65 12 21 12 21z" />
        </svg>
        <span className="font-script text-6xl sm:text-7xl leading-none">{weddingConfig.initialB}</span>
      </div>
      <p className="mt-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[var(--accent,#b3365b)]/80">
        {t('tapToOpen')}
      </p>
    </button>
  );
}
