import type { Metadata } from 'next';
import AdsInfoContent from './AdsInfoContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Advertising Policy',
  description:
    'Advertising and sponsorship policy for this portfolio: whether ads are served, how sponsored content is labelled, and how it affects editorial choices.',
  path: '/ads-info',
});

export default function AdsInfoPage() {
  return <AdsInfoContent />;
}
