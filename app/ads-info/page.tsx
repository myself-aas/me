import type { Metadata } from 'next';
import AdsInfoContent from './AdsInfoContent';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/ads-info']);

export default function AdsInfoPage() {
  return <AdsInfoContent page={PAGES['/ads-info']} />;
}
