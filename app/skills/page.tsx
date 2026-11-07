import type { Metadata } from 'next';
import Skills from '@/components/Skills';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/skills']);

export default function SkillsPage() {
  return <Skills page={PAGES['/skills']} />;
}
