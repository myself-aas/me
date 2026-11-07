import type { Metadata } from 'next';
import CookieContent from './CookieContent';
import Section from '@/components/Section';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/cookies']);

export default function CookiesPage() {
  return (
    <Section page={PAGES['/cookies']} width="prose">
      <CookieContent />
    </Section>
  );
}
