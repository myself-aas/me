import type { Metadata } from 'next';
import AccessibilityContent from './AccessibilityContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Accessibility',
  description:
    'Accessibility commitments behind this portfolio: WCAG 2.1 AA targets, keyboard and screen reader support, and how to report a barrier you hit.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
