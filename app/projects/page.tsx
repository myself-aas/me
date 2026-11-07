import type { Metadata } from 'next';
import GitHubProjects from '@/components/GitHubProjects';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SCHEMA } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Projects & Open Source Code',
  description:
    'Open-source projects and research code by Ashif Ahmed Shuvo, loaded live from GitHub with languages, topics, stars and repository links.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd nodes={PAGE_SCHEMA['/projects'] ?? []} />
      <GitHubProjects />
    </>
  );
}
