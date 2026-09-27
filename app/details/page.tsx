'use client';

import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import { weddingConfig } from '@/lib/config';

export default function DetailsPage() {
  const date = new Date(weddingConfig.weddingDateTime);
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <AnimatedBackground>
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-8">
        <p className="font-script text-4xl text-[var(--accent,#b3365b)]">Wedding Details</p>

        <div className="space-y-6 max-w-sm">
          <div>
            <p className="uppercase tracking-widest text-xs text-[var(--accent,#b3365b)]/60">Date</p>
            <p className="text-lg sm:text-xl text-[var(--accent,#b3365b)]">{dateLabel}</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs text-[var(--accent,#b3365b)]/60">Time</p>
            <p className="text-lg sm:text-xl text-[var(--accent,#b3365b)]">{timeLabel}</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs text-[var(--accent,#b3365b)]/60">Venue</p>
            <p className="text-lg sm:text-xl text-[var(--accent,#b3365b)]">{weddingConfig.venueName}</p>
            <p className="text-sm text-[var(--accent,#b3365b)]/80">{weddingConfig.venueAddress}</p>
          </div>

          <a
            href={weddingConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--accent,#b3365b)] text-white text-sm hover:opacity-90 transition-opacity"
          >
            Open in Google Maps
          </a>
        </div>

        <Link
          href="/wishes"
          className="mt-4 inline-block px-8 py-3 rounded-full border-2 border-[var(--accent,#b3365b)] text-[var(--accent,#b3365b)] uppercase tracking-widest text-xs sm:text-sm hover:bg-[var(--accent,#b3365b)] hover:text-white transition-colors"
        >
          Send Your Wishes
        </Link>
      </main>
    </AnimatedBackground>
  );
}
