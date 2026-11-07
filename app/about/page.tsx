import type { Metadata } from 'next';
import About from '@/components/About';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/about']);

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/about'].schema ?? []} />
      <About page={PAGES['/about']} />
    </>
  );
}
