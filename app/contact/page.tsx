import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import Section from '@/components/Section';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/contact']);

export default function ContactPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/contact'].schema ?? []} />
      <Section page={PAGES['/contact']} width="narrow">
        <Contact />
      </Section>
    </>
  );
}
