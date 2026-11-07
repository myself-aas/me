import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/contact']);

export default function ContactPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/contact'].schema ?? []} />
      <Contact page={PAGES['/contact']} />
    </>
  );
}
