import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import Section from '@/components/Section';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/privacy']);

export default function PrivacyPage() {
  return (
    <Section page={PAGES['/privacy']} width="prose">
      <PrivacyContent />
    </Section>
  );
}
