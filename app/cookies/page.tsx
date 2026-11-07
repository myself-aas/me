import type { Metadata } from 'next';
import CookieContent from './CookieContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Cookie Policy',
  description:
    'Which cookies and local storage this portfolio uses, what each one stores, how long it lasts, and how to clear or block them in your browser.',
  path: '/cookies',
});

export default function CookiesPage() {
  return <CookieContent />;
}
