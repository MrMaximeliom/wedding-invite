// Minimal session mechanism for the /admin area.
// Good enough for a small personal invitation site; if you want stronger
// security, swap this for NextAuth or Supabase Auth.

export const ADMIN_COOKIE = 'wedding_admin_session';

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'change-this-secret-in-.env.local';
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSessionToken(): Promise<string> {
  return sha256Hex(`admin-session:${getSecret()}`);
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  return token === expected;
}

export function checkCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || 'alooyti';
  const expectedPass = process.env.ADMIN_PASSWORD || 'alooyti';
  return username === expectedUser && password === expectedPass;
}
