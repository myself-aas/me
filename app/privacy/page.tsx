import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Privacy Policy',
  description:
    'How this portfolio handles personal data: what the contact form collects, how third-party embeds behave, and how to request access or deletion.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
