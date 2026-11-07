import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SCHEMA } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Publications',
  description:
    'Publications and writings by Ashif Ahmed Shuvo on precision agriculture, NIR spectroscopy and applied machine learning, with abstracts and impact factors.',
  path: '/publications',
});

export default function PublicationsPage() {
  return (
    <>
      <JsonLd nodes={PAGE_SCHEMA['/publications'] ?? []} />
      <Publications />
    </>
  );
}
