import { weddingConfig } from '@/lib/config';
import type { Wish } from '@/lib/supabase';

export default function WishCard({ wish }: { wish: Wish }) {
  const date = new Date(wish.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="w-[340px] h-[220px] rounded-2xl p-6 flex flex-col justify-between shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #fbe3d4, #f6cbb0)',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div>
        <p
          className="text-xl mb-2"
          style={{ fontFamily: "'Great Vibes', cursive", color: '#8a4b2f' }}
        >
          {weddingConfig.initialA} &amp; {weddingConfig.initialB}
        </p>
        <p className="text-sm leading-snug text-[#5a3a24] line-clamp-4">&ldquo;{wish.message}&rdquo;</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm font-semibold text-[#8a4b2f]">— {wish.name}</p>
        <p className="text-[10px] text-[#8a4b2f]/60">{date}</p>
      </div>
    </div>
  );
}
