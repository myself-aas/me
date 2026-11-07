import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/privacy']);

export default function PrivacyPage() {
  return <PrivacyContent page={PAGES['/privacy']} />;
}
