import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Use these instead of next/link and next/navigation anywhere under app/[locale]/ —
// they automatically keep the current locale prefix in the URL when you navigate.
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
