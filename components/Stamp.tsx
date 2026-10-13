'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Stamp({ onClick }: { onClick: () => void }) {
  const t = useTranslations('Landing');

  return (
    // <button
    //   onClick={onClick}
    //   aria-label={t('openInvitation')}
    //   className="stamp stamp-pulse float w-56 h-64 sm:w-64 sm:h-72 flex flex-col items-center justify-center bg-transparent border-4 border-dashed border-[var(--accent,#b3365b)] rounded-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
    // >
    //   <div className="flex items-end justify-center gap-2 bg-transparent">
    //     <Image
    //       alt=""
    //       src="/images/stamp.svg"
    //       width={250}
    //       height={250}
    //       priority
    //       className="block bg-transparent"
    //     />
    //   </div>

    //   <p className="mt-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[var(--accent,#b3365b)]/80">
    //     {t('tapToOpen')}
    //   </p>
    // </button>


<button
  onClick={onClick}
  aria-label={t("openInvitation")}
  className="stamp stamp-pulse float flex h-64 w-56 flex-col items-center justify-center rounded-sm border-4 border-dashed border-[var(--accent,#b3365b)] bg-transparent transition-transform hover:scale-105 active:scale-95 sm:h-72 sm:w-64"
>
  <div
    aria-hidden="true"
    className="h-32 w-32 bg-[var(--stamp-color,var(--accent,#b3365b))] [mask-image:url('/images/stamp.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-image:url('/images/stamp.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain] sm:h-40 sm:w-40"
  />

  <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--accent,#b3365b)]/80 sm:text-sm">
    {t("tapToOpen")}
  </p>
</button>
  );
}