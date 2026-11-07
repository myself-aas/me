import type { Metadata } from 'next';
import AccessibilityContent from './AccessibilityContent';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/accessibility']);

export default function AccessibilityPage() {
  return <AccessibilityContent page={PAGES['/accessibility']} />;
}
