// No 'use client' needed — this is now a plain presentational wrapper.
// The actual theme colors come from CSS custom properties set on <html>
// by the inline script in app/layout.tsx, before first paint.
export default function AnimatedBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-animated">
      {children}
    </div>
  );
}