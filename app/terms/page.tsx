import type { Metadata } from 'next';
import TermsContent from './TermsContent';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/terms']);

export default function TermsPage() {
  return <TermsContent page={PAGES['/terms']} />;
}
