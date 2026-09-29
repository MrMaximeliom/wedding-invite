"use client";

import { useState, useTransition, useRef } from "react";
import { Wish } from "@/types/Wish";
import { deleteWish, updateWish } from "../actions/wishes";
import {weddingConfig} from "@/lib/config";
// ── change these to match the couple ──────────────────────────────────────────
const COUPLE_NAMES = weddingConfig.coupleNames;
const APP_URL = "https://wedding-timer-five.vercel.app/";
// ─────────────────────────────────────────────────────────────────────────────

export const AdminWishes = ({ wishes }: { wishes: Wish[] }) => {
  // existing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState(wishes);
  const [isPending, startTransition] = useTransition();

  // sharing state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [shareTab, setShareTab] = useState<"manage" | "share">("manage");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedWish = list.find((w) => w.id === selectedId) ?? null;

  // ── existing handlers ──────────────────────────────────────────────────────
  const handleEdit = (wish: Wish) => {
    setEditingId(wish.id);
    setName(wish.name);
    setMessage(wish.message);
  };

  const handleDelete = (id: string) => {
    deleteWish(id)
      .then(() => setList((prev) => prev.filter((w) => w.id !== id)))
      .catch((e) => console.error("delete error", e));
  };

  const handleSave = (id: string) => {
    updateWish(id, name, message)
      .then((updated) => {
        setList((prev) => prev.map((w) => (w.id === id ? updated : w)));
        setEditingId(null);
      })
      .catch((e) => console.error("save error", e));
  };

  // ── card generation ────────────────────────────────────────────────────────
  function generateCard(wish: Wish) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 1080,
      H = 1080;
    canvas.width = W;
    canvas.height = H;

    // background
    ctx.fillStyle = "#fdf8f3";
    ctx.fillRect(0, 0, W, H);

    // outer border
    ctx.strokeStyle = "#c8a87a";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.strokeStyle = "#e8d5b8";
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, W - 110, H - 110);

    // corner florals
    (
      [
        [90, 90, 0],
        [W - 90, 90, Math.PI / 2],
        [W - 90, H - 90, Math.PI],
        [90, H - 90, -Math.PI / 2],
      ] as [number, number, number][]
    ).forEach(([x, y, r]) => drawFloral(ctx, x, y, r));

    // label
    ctx.fillStyle = "#c8a87a";
    ctx.font = "500 32px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  A Wish for  ✦", W / 2, 160);

    // couple name
    ctx.fillStyle = "#3a2e22";
    ctx.font = "italic 300 72px Georgia, serif";
    ctx.fillText(COUPLE_NAMES, W / 2, 240);

    // divider
    ctx.strokeStyle = "#c8a87a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 270);
    ctx.lineTo(W - 200, 270);
    ctx.stroke();

    // message
    ctx.fillStyle = "#3a2e22";
    ctx.font = "italic 38px Georgia, serif";
    ctx.textAlign = "center";
    const lines = wrapText(ctx, `"${wish.message}"`, W - 200);
    const startY = H / 2 - (lines.length * 54) / 2;
    lines.forEach((line, i) => ctx.fillText(line, W / 2, startY + i * 54));

    // sender
    ctx.fillStyle = "#c8a87a";
    ctx.font = "500 30px Georgia, serif";
    ctx.fillText(`— ${wish.name}`, W / 2, H - 200);

    // ornament
    ctx.fillStyle = "#c8a87a";
    ctx.font = "28px serif";
    ctx.fillText("✿  ✦  ✿", W / 2, H - 140);

    ctx.fillStyle = "#b09880";
    ctx.font = "22px Georgia, serif";
    ctx.fillText("with love", W / 2, H - 100);

    setCardPreview(canvas.toDataURL("image/png"));
  }

  function drawFloral(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rot: number,
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = "#c8a87a";
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 18, Math.sin(a) * 18, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#fdf8f3";
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c8a87a";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
  ): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    words.forEach((word) => {
      const test = current ? current + " " + word : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  function downloadCard() {
    if (!cardPreview) return;
    const a = document.createElement("a");
    a.download = "wedding-wish.png";
    a.href = cardPreview;
    a.click();
  }

  // ── PDF guestbook ──────────────────────────────────────────────────────────
  function downloadPDF() {
    const rows = list
      .map(
        (w) => `
      <div style="page-break-inside:avoid;margin-bottom:2rem;padding:1.5rem;
        border:1px solid #e0cdb8;border-radius:10px;background:#fff9f4;">
        <div style="font-size:13px;color:#c8a87a;letter-spacing:0.08em;
          text-transform:uppercase;margin-bottom:0.5rem;">${w.name}</div>
        <div style="font-size:17px;color:#3a2e22;line-height:1.7;
          font-style:italic;">"${w.message}"</div>
      </div>`,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Happy Wishes For Us</title>
    <style>
      @page{margin:2.5cm}
      body{font-family:Georgia,serif;background:#fdf8f3;color:#3a2e22}
      .cover{text-align:center;padding:4rem 2rem;page-break-after:always}
      .cover h1{font-size:3rem;font-weight:300;letter-spacing:.05em}
      .cover .sub{color:#8a7060;font-style:italic;margin-top:.5rem}
      .cover .div{color:#c8a87a;font-size:1.5rem;margin:1.5rem 0;letter-spacing:.3em}
      h2{font-size:1.5rem;font-weight:300;color:#8a7060;margin-bottom:2rem;
        font-style:italic;text-align:center}
    </style></head><body>
    <div class="cover">
      <div class="div">✿ ✦ ✿</div>
      <h1>A Guestbook of Love</h1>
      <p class="sub">Wishes for ${COUPLE_NAMES}</p>
      <div class="div">✦</div>
      <p style="font-size:.9rem;color:#b09880">${list.length} heartfelt messages</p>
    </div>
    <h2>With love, from your guests</h2>
    ${rows}
    </body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) setTimeout(() => win.print(), 1200);
  }

  // ── WhatsApp share ─────────────────────────────────────────────────────────
  function shareWhatsApp() {
    const preview = selectedWish
      ? `\n\n💌 ${selectedWish.name} wrote:\n"${selectedWish.message.substring(0, 200)}${selectedWish.message.length > 200 ? "..." : ""}"`
      : "";
    const text = encodeURIComponent(
      `🌸 We've been overwhelmed by the beautiful wishes from our guests — thank you all from the bottom of our hearts! 💛${preview}\n\nSend your wishes: ${APP_URL}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  // ── render ─────────────────────────────────────────────────────────────────


  
  return (
  <div className="flex flex-col items-center gap-6 w-full">
    {/* Tab switcher */}
    <div className="flex gap-1 bg-white/70 backdrop-blur rounded-2xl p-1 w-fit shadow-sm">
      {(["manage", "share"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setShareTab(tab);
            setCardPreview(null);
          }}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            shareTab === tab
              ? "bg-amber-500 text-white shadow"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          {tab === "manage" ? "💌 Manage Wishes" : "✨ Share Wishes"}
        </button>
      ))}
    </div>

    {/* ── MANAGE TAB ── */}
    {shareTab === "manage" && (
      <>
        <p className="text-sm text-[var(--accent)]">{list.length} wishes total.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {list.map((wish) => (
            <div
              key={wish.id}
              className="min-h-[200px] rounded-2xl p-5 flex flex-col justify-between gap-3
                bg-white/70 backdrop-blur border border-black/5 shadow-lg"
            >
              <div>
                <p className="text-amber-700 font-semibold mb-2">{wish.name}</p>

                {editingId === wish.id ? (
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl px-3 py-2 bg-white text-neutral-900
                      outline-none border border-neutral-300 focus:border-amber-500
                      resize-none text-sm"
                  />
                ) : (
                  <p className="text-neutral-800 text-sm leading-relaxed">
                    {wish.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {editingId === wish.id ? (
                  <>
                    <button
                      onClick={() => handleSave(wish.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(wish)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(wish.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    )}

    {/* ── SHARE TAB ── */}
    {shareTab === "share" && (
      <div className="flex flex-col gap-5 w-full max-w-2xl">
        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: "🌸",
              label: "Wish Card",
              sub: "selected wish as image",
              action: () => {
                if (!selectedWish) {
                  alert("Select a wish below first");
                  return;
                }
                generateCard(selectedWish);
              },
            },
            { icon: "📖", label: "PDF Guestbook", sub: "all wishes as keepsake", action: downloadPDF },
            { icon: "💬", label: "WhatsApp", sub: "share with message", action: shareWhatsApp },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl
                bg-white/70 backdrop-blur border border-black/5 shadow-sm
                hover:border-amber-400 hover:bg-white transition-all text-center"
            >
              <span className="text-2xl">{btn.icon}</span>
              <span className="text-sm text-neutral-900 font-medium">{btn.label}</span>
              <span className="text-xs text-neutral-500">{btn.sub}</span>
            </button>
          ))}
        </div>

        {/* Card preview */}
        {cardPreview && (
          <div className="flex flex-col gap-3">
            <p className="text-xs italic text-[var(--accent)]">
              Preview — download and share anywhere ✨
            </p>
            <img
              src={cardPreview}
              alt="Wish card preview"
              className="w-full rounded-2xl border border-black/10 shadow-lg"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCardPreview(null)}
                className="flex-1 py-2 rounded-xl bg-white/80 text-neutral-800 text-sm hover:bg-white transition"
              >
                ← Back
              </button>
              <button
                onClick={downloadCard}
                className="flex-1 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition"
              >
                Download Image
              </button>
            </div>
          </div>
        )}

        {/* Wish selector */}
        {!cardPreview && (
          <>
            <div className="flex items-center gap-3 text-[var(--accent)]">
              <div className="h-px flex-1 bg-current opacity-30" />
              <p className="text-xs opacity-80">select a wish to feature on the card</p>
              <div className="h-px flex-1 bg-current opacity-30" />
            </div>

            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
              {list.map((wish) => (
                <button
                  key={wish.id}
                  onClick={() => setSelectedId(selectedId === wish.id ? null : wish.id)}
                  className={`text-left p-4 rounded-2xl border transition-all backdrop-blur ${
                    selectedId === wish.id
                      ? "bg-amber-50 border-amber-500 shadow"
                      : "bg-white/70 border-black/5 hover:border-amber-300"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-1 uppercase tracking-wider ${
                      selectedId === wish.id ? "text-amber-700" : "text-neutral-500"
                    }`}
                  >
                    {wish.name}
                  </p>
                  <p className="text-neutral-800 text-sm leading-relaxed">{wish.message}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )}

    {/* Hidden canvas */}
    <canvas ref={canvasRef} className="hidden" />
  </div>
);
};
