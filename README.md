# M & A — Wedding Invitation

Next.js (App Router) + TypeScript + Tailwind + Supabase.

## Flow
1. `/` — animated background + a clickable postage stamp with your initials and a heart
2. `/invite` — music toggle (autoplays where the browser allows) + your invitation text
3. `/details` — date, time, venue, and a Google Maps link
4. `/wishes` — a small form (name + wish) that saves to Supabase, with a live countdown at the bottom
5. `/admin` — login (default `alooyti` / `alooyti` — **change this**)
6. `/admin/dashboard` — every wish, each renderable as its own lovely card, exportable individually or all together as a PDF

The background gradient (and, indirectly, the whole mood of the site) shifts once per day for the 30 days leading up to the wedding, landing on its final look on the big day.

## 1. Set up Supabase
1. Create a project at supabase.com.
2. Open the SQL editor and run everything in `supabase.sql` (creates the `wishes` table with row-level security so the public site can only insert, never read).
3. Grab your Project URL, `anon` public key, and `service_role` key from Project Settings -> API.

## 2. Configure environment variables
```bash
cp .env.local.example .env.local
```
Fill in your Supabase keys, a real `ADMIN_SESSION_SECRET` (any long random string), and change `ADMIN_USERNAME` / `ADMIN_PASSWORD` from the defaults -- they're placeholders and should not be used in production.

Then fill in your real wedding details (names, date/time, venue, Google Maps link, invite message).

## 3. Add your assets
- Music: drop 30 MP3s you have the rights to at `public/audio/day-01.mp3` through `day-30.mp3` (see `public/audio/README.txt`) -- one plays per day of the countdown, automatically starting when the invite page loads, and it advances to the next track the following day. No files are bundled since music is copyrighted. Fewer than 30 tracks, or different filenames? Set `NEXT_PUBLIC_MUSIC_TRACKS` in `.env.local`.
- The 10 background themes are pure CSS gradients (`lib/theme.ts`) -- no images to source or license. Feel free to swap in your own colors, or replace with photos if you'd rather.

## 4. Run it
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## 5. Deploy
Any Next.js host works (Vercel is the easiest). Set the same environment variables in your host's dashboard. Remember `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_SESSION_SECRET` must stay server-only secrets -- never prefix them with `NEXT_PUBLIC_`.

## Notes on the admin login
This uses a lightweight cookie-based session (see `lib/adminAuth.ts`) -- good enough for a small personal invitation site guarded by a shared secret, but it is **not** hardened for high-security use (no rate limiting, no hashed password storage, single shared account). If this ever needs to protect more than "keep random guests out of the wishes list," swap it for Supabase Auth or NextAuth.

## Project structure
```
app/
  page.tsx                    -> stamp landing page
  invite/page.tsx             -> music + invitation text
  details/page.tsx            -> date/time/venue + maps link
  wishes/page.tsx             -> wish form + countdown
  admin/page.tsx              -> admin login
  admin/dashboard/page.tsx    -> wishes list + PDF export
  api/wishes/route.ts         -> POST a new wish
  api/admin/login/route.ts    -> admin session cookie
  api/admin/wishes/route.ts   -> GET all wishes (auth required)
components/
  AnimatedBackground.tsx, Stamp.tsx, MusicPlayer.tsx,
  CountdownTimer.tsx, WishCard.tsx
lib/
  config.ts (all editable content), theme.ts (30-day rotation),
  supabase.ts, adminAuth.ts
supabase.sql                  -> run once in Supabase SQL editor
.env.local.example
```
