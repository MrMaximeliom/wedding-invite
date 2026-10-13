'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Stamp({ onClick }: { onClick: () => void }) {
  const t = useTranslations('Landing');

  return (
    <button
      onClick={onClick}
      aria-label={t('openInvitation')}
      className="stamp stamp-pulse float w-56 h-64 sm:w-64 sm:h-72 flex flex-col items-center justify-center bg-transparent border-4 border-dashed border-[var(--accent,#b3365b)] rounded-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <div className="flex items-end justify-center gap-2 bg-transparent">
        <Image
          alt=""
          src="/images/stamp.svg"
          width={250}
          height={250}
          priority
          className="block bg-transparent"
        />
      </div>

      <p className="mt-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[var(--accent,#b3365b)]/80">
        {t('tapToOpen')}
      </p>
    </button>
  );
}