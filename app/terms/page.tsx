import type { Metadata } from 'next';
import TermsContent from './TermsContent';
import Section from '@/components/Section';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/terms']);

export default function TermsPage() {
  return (
    <Section page={PAGES['/terms']} width="prose">
      <TermsContent />
    </Section>
  );
}
