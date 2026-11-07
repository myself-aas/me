import type { Metadata } from 'next';
import Experience from '@/components/Experience';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Experience & Education',
  description:
    'Professional experience and education of Ashif Ahmed Shuvo, covering research assistantships, industry programmes and certificates of completion.',
  path: '/experience',
});

export default function ExperiencePage() {
  return <Experience />;
}
