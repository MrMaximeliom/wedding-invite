'use client';

import { useLocale } from '@/hooks/useLocale';
import { weddingCountdownPhrases } from '@/lib/config';
import { getDayIndex } from '@/lib/theme';
export default function DayPhrase() {
    const currentPhrase = weddingCountdownPhrases.find(
  (item) => item.day === getDayIndex().index
);
  const locale = useLocale();
  const isArabicLocale = locale === "ar";
console.log('🎨 currentPhrase:', currentPhrase);

  return (
          <div className="max-w-md text-center mx-auto px-6 py-10">
  {currentPhrase && (
    <>
      <p className="font-script text-3xl sm:text-4xl text-[var(--accent,#b3365b)] mb-3">
        {currentPhrase.title[isArabicLocale ? 'ar' : 'en']}
      </p>

      <p className="text-lg sm:text-xl leading-relaxed text-[var(--accent,#b3365b)]/90">
        {currentPhrase.phrase[isArabicLocale ? 'ar' : 'en']}
      </p>
    </>
  )}
</div>
  );
}