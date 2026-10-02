'use client';

import { useTranslations } from 'next-intl';
import { weddingCountdownPhrases } from '@/lib/config';
import { getDayIndex } from '@/lib/theme';

export default function DayPhrase() {
  const t = useTranslations('Phrases');

  const currentPhrase = weddingCountdownPhrases.find(
    (item) => item.day === getDayIndex().index
  );

  console.log('🎨 currentPhrase:', currentPhrase);

  return (
    <div className="max-w-md text-center mx-auto px-6 py-10">
      {currentPhrase && (
        <>
          <p className="text-3xl sm:text-4xl text-[var(--accent,#b3365b)] mb-3">
            {t(`${currentPhrase.key}.title`)}
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-[var(--accent,#b3365b)]/90">
            {t(`${currentPhrase.key}.phrase`)}
          </p>
        </>
      )}
    </div>
  );
}