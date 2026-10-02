'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedBackground from '@/components/AnimatedBackground';
import CountdownTimer from '@/components/CountdownTimer';
import DayPhrase from '@/components/DayPhrase';
import { useLocale } from 'next-intl';

export default function WishesPage() {
  const t = useTranslations('Wishes');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const locale = useLocale();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setName('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatedBackground>
      <main className="flex-1 flex flex-col items-center justify-between min-h-screen px-6 py-10 text-center">
        <p className={`text-4xl text-[var(--accent,#b3365b)] pt-4 ${locale === 'ar' ? 'font-arabic' : 'font-script'}`}>{t('title')}</p>

        <div className="w-full max-w-sm">
          {status === 'sent' ? (
            <p className="text-lg text-[var(--accent,#b3365b)]">{t('thankYou')}</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={t('namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="px-4 py-3 rounded-lg bg-white/70 backdrop-blur placeholder:text-[var(--accent,#b3365b)]/50 text-[var(--accent,#b3365b)] outline-none border border-[var(--accent,#b3365b)]/30 focus:border-[var(--accent,#b3365b)]"
              />
              <textarea
                placeholder={t('messagePlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={1000}
                rows={4}
                className="px-4 py-3 rounded-lg bg-white/70 backdrop-blur placeholder:text-[var(--accent,#b3365b)]/50 text-[var(--accent,#b3365b)] outline-none border border-[var(--accent,#b3365b)]/30 focus:border-[var(--accent,#b3365b)] resize-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 rounded-full bg-[var(--accent,#b3365b)] text-white uppercase tracking-widest text-xs sm:text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'sending' ? t('sending') : t('send')}
              </button>
              {status === 'error' && <p className="text-sm text-red-600">{t('error')}</p>}
            </form>
          )}
        </div>
      <DayPhrase />
        <div className="pb-4">
          <p className="uppercase tracking-widest text-xs text-[var(--accent,#b3365b)]/60 mb-3">
            {t('countdownLabel')}
          </p>
          <CountdownTimer />
        </div>
      </main>
    </AnimatedBackground>
  );
}
