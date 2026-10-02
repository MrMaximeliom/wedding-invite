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
export const weddingCountdownPhrases = [
  { day: 29, key: 'today' },
  { day: 28, key: 'gratitude' },
  { day: 27, key: 'theMoment' },
  { day: 26, key: 'presence' },
  { day: 25, key: 'dreams' },
  { day: 24, key: 'blessing' },
  { day: 23, key: 'oneWeek' },
  { day: 22, key: 'theJourney' },
  { day: 21, key: 'love' },
  { day: 20, key: 'tomorrow' },
  { day: 19, key: 'comfort' },
  { day: 18, key: 'joy' },
  { day: 17, key: 'goodCompany' },
  { day: 16, key: 'memories' },
  { day: 15, key: 'aLifetime' },
  { day: 14, key: 'differences' },
  { day: 13, key: 'affection' },
  { day: 12, key: 'theFuture' },
  { day: 11, key: 'thoseAroundUs' },
  { day: 10, key: 'gratitudeAt10' },
  { day: 9, key: 'family' },
  { day: 8, key: 'togetherness' },
  { day: 7, key: 'serenity' },
  { day: 6, key: 'laughter' },
  { day: 5, key: 'theLittleThings' },
  { day: 4, key: 'prayers' },
  { day: 3, key: 'familyAt3' },
  { day: 2, key: 'home' },
  { day: 1, key: 'companionship' },
  { day: 0, key: 'beginnings' },
] as const;

// Number of days before the wedding that the countdown/background theme/song starts rotating
export const THEME_WINDOW_DAYS = 30;

export const DEBUG_DAY = new Date(); // for testing, pretend today is 30 days before the wedding