'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import WishCard from '@/components/WishCard';
import type { Wish } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportingAll, setExportingAll] = useState(false);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/wishes');
    if (res.status === 401) {
      router.push('/admin');
      return;
    }
    const data = await res.json();
    setWishes(data.wishes || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  };

  const exportCardAsPdf = async (wish: Wish) => {
    const node = cardRefs.current[wish.id];
    if (!node) return;
    const canvas = await html2canvas(node, { scale: 3 });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`wish-${wish.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  const exportAllAsPdf = async () => {
    setExportingAll(true);
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [340 * 3, 220 * 3] });
    for (let i = 0; i < wishes.length; i++) {
      const node = cardRefs.current[wishes[i].id];
      if (!node) continue;
      const canvas = await html2canvas(node, { scale: 3 });
      const img = canvas.toDataURL('image/png');
      if (i > 0) pdf.addPage([canvas.width, canvas.height], 'landscape');
      pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
    }
    pdf.save('all-wedding-wishes.pdf');
    setExportingAll(false);
  };

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">
            Wishes ({wishes.length})
          </h1>
          <div className="flex gap-3">
            <button
              onClick={exportAllAsPdf}
              disabled={exportingAll || wishes.length === 0}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-white text-sm hover:bg-neutral-700 disabled:opacity-50"
            >
              {exportingAll ? 'Exporting…' : 'Export All as PDF'}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg border border-neutral-400 text-neutral-700 text-sm hover:bg-neutral-200"
            >
              Log Out
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-neutral-500">Loading wishes…</p>
        ) : wishes.length === 0 ? (
          <p className="text-neutral-500">No wishes received yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishes.map((wish) => (
              <div key={wish.id} className="flex flex-col items-center gap-3">
                <div ref={(el) => { cardRefs.current[wish.id] = el; }}>
                  <WishCard wish={wish} />
                </div>
                <button
                  onClick={() => exportCardAsPdf(wish)}
                  className="text-sm px-4 py-1.5 rounded-full border border-neutral-400 text-neutral-700 hover:bg-neutral-200"
                >
                  Save as Card (PDF)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
