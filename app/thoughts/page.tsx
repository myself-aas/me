import type { Metadata } from 'next';
import Section from '@/components/Section';
import ThoughtsSection from '@/components/ThoughtsSection';
import { getAllThoughts } from '@/lib/thoughts';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/thoughts']);

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <Section page={PAGES['/thoughts']} width="medium">
      <ThoughtsSection initialThoughts={thoughts} />
    </Section>
  );
}
