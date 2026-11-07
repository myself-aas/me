import type { Metadata } from 'next';
import CookieContent from './CookieContent';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/cookies']);

export default function CookiesPage() {
  return <CookieContent page={PAGES['/cookies']} />;
}
