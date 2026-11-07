import type { Metadata } from 'next';
import Experience from '@/components/Experience';
import Section from '@/components/Section';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/experience']);

export default function ExperiencePage() {
  return (
    <Section page={PAGES['/experience']} width="medium">
      <Experience />
    </Section>
  );
}
