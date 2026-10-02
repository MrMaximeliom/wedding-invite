import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import AnimatedBackground from '@/components/AnimatedBackground';

export default async function InvitePage() {
  const t = await getTranslations('Message');
 const invite = await getTranslations('Invite');
 const  names = await getTranslations('Names');
  return (
    <AnimatedBackground>
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <div className="max-w-md">
          <p className="  text-4xl sm:text-5xl text-[var(--accent,#b3365b)] mb-6">
               {names('coupleNames')}
          </p>
          <p className=" text-base sm:text-lg leading-loose text-[var(--accent,#b3365b)]/90">
    {t('intro')}
  </p>

  <p className="text-base sm:text-lg leading-loose text-[var(--accent,#b3365b)]/90 mt-5">
    {t('invitation')}
  </p>

  <p className="text-base sm:text-lg leading-loose text-[var(--accent,#b3365b)]/90 mt-5">
    {t('presence')}
  </p>

  <p className="text-base sm:text-lg leading-loose text-[var(--accent,#b3365b)]/90 mt-5">
    {t('closing')}
  </p>
        </div>

        <Link
          href="/details"
          className="mt-8 inline-block px-8 py-3 rounded-full border-2 border-[var(--accent,#b3365b)] text-[var(--accent,#b3365b)] uppercase tracking-widest text-xs sm:text-sm hover:bg-[var(--accent,#b3365b)] hover:text-white transition-colors"
        >
          {invite('detailsButton')}
        </Link>
      </main>
    </AnimatedBackground>
  );
}
