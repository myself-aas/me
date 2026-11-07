import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import Section from '@/components/Section';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/publications']);

export default function PublicationsPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/publications'].schema ?? []} />
      <Section page={PAGES['/publications']} width="medium" className="bg-band min-h-screen">
        <Publications />
      </Section>
    </>
  );
}
