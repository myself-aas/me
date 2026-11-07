import type { Metadata } from 'next';
import Skills from '@/components/Skills';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Skills & Tech Stack',
  description:
    'Technical skills of Ashif Ahmed Shuvo: Python and PyTorch, computer vision architectures, statistical analysis, cloud ML and precision agriculture tooling.',
  path: '/skills',
});

export default function SkillsPage() {
  return <Skills />;
}
