import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/publications']);

export default function PublicationsPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/publications'].schema ?? []} />
      <Publications page={PAGES['/publications']} />
    </>
  );
}
