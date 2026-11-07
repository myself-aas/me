import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import Section from '@/components/Section';
import JsonLd from '@/components/JsonLd';
import { readOrcidRecord } from '@/lib/orcid-record';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/publications']);

export default async function PublicationsPage() {
  const record = await readOrcidRecord();

  return (
    <>
      <JsonLd nodes={PAGES['/publications'].schema ?? []} />
      <Section page={PAGES['/publications']} width="medium" className="bg-band min-h-screen">
        <Publications works={record.works} readAt={record.readAt} />
      </Section>
    </>
  );
}
