// Everything here can be overridden with environment variables (see .env.local.example).
// Sensible defaults are in place so the app runs immediately; edit .env.local for the real event.

export const weddingConfig = {
  // Couple initials shown on the stamp, e.g. "M" and "A"
  initialA: process.env.NEXT_PUBLIC_INITIAL_A || 'M',
  initialB: process.env.NEXT_PUBLIC_INITIAL_B || 'A',

  coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES || 'Moayed & Alaa',

  // ISO date-time string, e.g. "2026-12-12T18:00:00+04:00"
  weddingDateTime: process.env.NEXT_PUBLIC_WEDDING_DATETIME || '2026-10-30T18:00:00+04:00',

  venueName: process.env.NEXT_PUBLIC_VENUE_NAME || 'The Grand Ballroom',
  venueAddress: process.env.NEXT_PUBLIC_VENUE_ADDRESS || 'Abu Dhabi, United Arab Emirates',

  // Full Google Maps share link to the venue
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    'https://maps.google.com/?q=Abu+Dhabi',

  // Invitation text shown on the /invite page
  inviteMessage:
    process.env.NEXT_PUBLIC_INVITE_MESSAGE ||
    'Together with our families, we joyfully invite you to celebrate the beginning of our forever. Your presence would mean the world to us as we say "I do".',

  // 30 songs, one per day of the countdown. Defaults to /audio/day-01.mp3 .. day-30.mp3.
  // Override with a comma-separated list of 30 paths via NEXT_PUBLIC_MUSIC_TRACKS if you'd
  // rather name your files differently, e.g. "/audio/a.mp3,/audio/b.mp3,...".
  musicTracks: (process.env.NEXT_PUBLIC_MUSIC_TRACKS
    ? process.env.NEXT_PUBLIC_MUSIC_TRACKS.split(',').map((s) => s.trim())
    : Array.from({ length: 30 }, (_, i) => `/audio/${String(i + 1)}.mp3`)),

};

// Number of days before the wedding that the countdown/background theme/song starts rotating
export const THEME_WINDOW_DAYS = 30;

export const DEBUG_DAY = new Date('2026-10-01'); // for testing, pretend today is 30 days before the wedding