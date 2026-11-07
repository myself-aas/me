import type { Metadata } from 'next';
import Experience from '@/components/Experience';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/experience']);

export default function ExperiencePage() {
  return <Experience page={PAGES['/experience']} />;
}
