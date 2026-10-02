'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Stamp from '@/components/Stamp';
import { weddingConfig } from '@/lib/config';

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations('Landing');

  return (
    <AnimatedBackground>
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-xs sm:text-sm text-[var(--accent,#b3365b)]/70 mb-6">
          {t('invited')}
        </p>
        <Stamp onClick={() => router.push('/invite')} />
        <p className="mt-8 font-script text-2xl sm:text-3xl text-[var(--accent,#b3365b)]">
          {weddingConfig.coupleNames}
        </p>
      </main>
    </AnimatedBackground>
  );
}
