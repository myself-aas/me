import type { Metadata } from 'next';
import AccessibilityContent from './AccessibilityContent';

export const metadata: Metadata = {
  title: 'Accessibility Statement | My App',
  description: 'Learn about my commitment to web accessibility and adherence to WCAG 2.1 standards.',
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
