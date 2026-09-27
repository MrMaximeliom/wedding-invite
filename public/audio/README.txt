Add 30 songs here, one per day of the countdown, named:

  day-01.mp3   (played on the day furthest out, 30 days before the wedding)
  day-02.mp3
  ...
  day-30.mp3   (played on the wedding day itself)

Whichever page has the music button (currently /invite) will automatically
load and start playing whichever file matches today's position in the
30-day countdown, and switch to the next file the following day.

Prefer different filenames or fewer than 30 tracks? Set
NEXT_PUBLIC_MUSIC_TRACKS in .env.local to a comma-separated list of paths,
e.g. NEXT_PUBLIC_MUSIC_TRACKS=/audio/song1.mp3,/audio/song2.mp3,...
(if you give fewer than 30, the last one repeats for the remaining days).

I couldn't include actual song files since music is copyrighted -- use
tracks you have the rights to (royalty-free library, or your own recording).
