import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import { weddingConfig } from '@/lib/config';

export default function InvitePage() {
  return (
    <AnimatedBackground>
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <div className="max-w-md">
          <p className="font-script text-4xl sm:text-5xl text-[var(--accent,#b3365b)] mb-6">
            {weddingConfig.coupleNames}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--accent,#b3365b)]/90">
            {weddingConfig.inviteMessage}
          </p>
        </div>

        <Link
          href="/details"
          className="mt-8 inline-block px-8 py-3 rounded-full border-2 border-[var(--accent,#b3365b)] text-[var(--accent,#b3365b)] uppercase tracking-widest text-xs sm:text-sm hover:bg-[var(--accent,#b3365b)] hover:text-white transition-colors"
        >
          Wedding Details
        </Link>
      </main>
    </AnimatedBackground>
  );
}