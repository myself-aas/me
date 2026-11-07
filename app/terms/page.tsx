import type { Metadata } from 'next';
import TermsContent from './TermsContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Terms of Service',
  description:
    'Terms of service for using the research portfolio of Ashif Ahmed Shuvo, including acceptable use, content licensing and liability limits.',
  path: '/terms',
});

export default function TermsPage() {
  return <TermsContent />;
}
