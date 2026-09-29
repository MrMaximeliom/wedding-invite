import { weddingConfig, THEME_WINDOW_DAYS,DEBUG_DAY } from './config';

// A palette of romantic gradient themes. One is picked per day so the whole
// site's mood subtly shifts every day during the 30 days before the wedding.
// (No external images needed — pure CSS gradients, so nothing to license or upload.)
export const THEMES = [
  // --- Original 10 ---
  { name: 'Blush Dawn', from: '#ffe4ec', via: '#ffd1dc', to: '#f7c8d0', accent: '#b3365b' },
  { name: 'Rose Gold', from: '#fbe3d4', via: '#f6cbb0', to: '#eab08c', accent: '#8a4b2f' },
  { name: 'Lavender Mist', from: '#ece3fb', via: '#dcd0f7', to: '#c9b8ec', accent: '#5b3a8a' },
  { name: 'Ivory Champagne', from: '#fdf6ec', via: '#f5e8ce', to: '#e9d7ab', accent: '#8a6d1f' },
  { name: 'Midnight Romance', from: '#2b1b3d', via: '#3d2352', to: '#552d6e', accent: '#f2c6de' },
  { name: 'Garden Bloom', from: '#eaf6e9', via: '#d6f0d4', to: '#bfe6bb', accent: '#2f6b3a' },
  { name: 'Sunset Vow', from: '#ffe3d1', via: '#ffc9a8', to: '#ff9f7a', accent: '#7a2e1f' },
  { name: 'Pearl Blue', from: '#e3f1fb', via: '#cfe6f7', to: '#b3d6f0', accent: '#1f4f7a' },
  { name: 'Peony Pink', from: '#fde2ee', via: '#fbc6de', to: '#f6a3c7', accent: '#7a1f4f' },
  { name: 'Golden Hour', from: '#fff3d6', via: '#ffe1a3', to: '#ffca6b', accent: '#7a5a1f' },

  // --- New 20 ---
  { name: 'Sage Whisper', from: '#eef3e6', via: '#dfe8d1', to: '#c8d7b3', accent: '#4a5d2e' },
  { name: 'Dusty Rose', from: '#f6e1e1', via: '#eccaca', to: '#dcaeae', accent: '#7d3b3b' },
  { name: 'Ocean Breeze', from: '#dff4f5', via: '#c5e9eb', to: '#a3d9dd', accent: '#1d5a61' },
  { name: 'Lilac Dream', from: '#f3e5f7', via: '#e6cdee', to: '#d3aee0', accent: '#6b2f80' },
  { name: 'Apricot Glow', from: '#ffeadb', via: '#ffd7bb', to: '#ffbe94', accent: '#8a4a1a' },
  { name: 'Mint Cream', from: '#e6f8f0', via: '#cfF0e0', to: '#b0e4cb', accent: '#1f6b4d' },
  { name: 'Royal Plum', from: '#3a1d3f', via: '#502759', to: '#6d3479', accent: '#f4d3ee' },
  { name: 'Coral Kiss', from: '#ffe2de', via: '#ffc7c0', to: '#ff a79c'.replace(' ', ''), accent: '#8a2a20' },
  { name: 'Moonlit Navy', from: '#1a2340', via: '#243157', to: '#33447a', accent: '#d9e2ff' },
  { name: 'Vanilla Cream', from: '#fffaf0', via: '#faefd6', to: '#f0e0b8', accent: '#7d6420' },
  { name: 'Cherry Blossom', from: '#fff0f5', via: '#fddbe7', to: '#fbc0d4', accent: '#a12a5a' },
  { name: 'Emerald Night', from: '#12332b', via: '#1b4a3e', to: '#266253', accent: '#c9f2e0' },
  { name: 'Honey Amber', from: '#fff0cc', via: '#ffdf99', to: '#f5c264', accent: '#6d4a0f' },
  { name: 'Powder Sky', from: '#eaf4ff', via: '#d5e8fc', to: '#bad6f7', accent: '#274f80' },
  { name: 'Mauve Twilight', from: '#efe0ea', via: '#deC4d6', to: '#c9a3bf', accent: '#65305a' },
  { name: 'Peach Sorbet', from: '#ffece0', via: '#ffd9c2', to: '#ffc1a0', accent: '#8f3f22' },
  { name: 'Silver Mist', from: '#f1f3f6', via: '#e0e4ea', to: '#c9d0da', accent: '#3d4757' },
  { name: 'Burgundy Velvet', from: '#3d1420', via: '#571d2d', to: '#742a3f', accent: '#f7d2da' },
  { name: 'Wisteria', from: '#e9e6fa', via: '#d6d1f3', to: '#bdb5e8', accent: '#48408a' },
  { name: 'Starlit Gold', from: '#2a2412', via: '#3e351a', to: '#574a25', accent: '#f6e2a0' },
];

function daysUntil(dateStr: string): number {
  const now = DEBUG_DAY || new Date();
 // const temp = new Date('2026-10-14');
  console.log(now)
  const target = new Date(dateStr);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getDaysRemaining(): number {
  return daysUntil(weddingConfig.weddingDateTime);
}

// A single day index (0..29) shared by the background theme and the daily song,
// so "day 7 of the countdown" always means the same thing to both.
// index 0 = 30+ days out ... index 29 = wedding day itself.
export function getDayIndex(): { index: number; daysRemaining: number } {
  const remaining = getDaysRemaining();
  const clamped = Math.max(0, Math.min(THEME_WINDOW_DAYS, remaining));
  const progress = 1 - clamped / THEME_WINDOW_DAYS;
  const index = Math.min(THEME_WINDOW_DAYS - 1, Math.floor(progress * THEME_WINDOW_DAYS));
  console.log('🎵 getDayIndex:', { index, daysRemaining: remaining });
  return { index, daysRemaining: remaining };
}

// Returns a theme that changes once per calendar day, cycling through THEMES,
// intensifying (getting closer to the final "wedding day" theme) as the day count shrinks.
export function getTodayTheme() {
  const { index, daysRemaining } = getDayIndex();
  const themeIndex = Math.min(THEMES.length - 1, Math.floor((index / THEME_WINDOW_DAYS) * THEMES.length));
  console.log('🎨 getTodayTheme:', { themeIndex, daysRemaining, theme: THEMES[themeIndex] });
  return { theme: THEMES[themeIndex], daysRemaining };
}

// Returns today's song — one of the 30 tracks in weddingConfig.musicTracks,
// picked by the same day index as the background theme (index 0 = 30+ days out,
// index 29 = wedding day). Falls back safely if fewer than 30 tracks are configured.
export function getTodaySong(): { src: string; dayNumber: number } {
  const { index } = getDayIndex();
  const tracks = weddingConfig.musicTracks;
  const trackIndex = tracks.length > 0 ? Math.min(tracks.length - 1, index) : 0;
  return { src: tracks[trackIndex], dayNumber: index + 1 };
}
