import type { Metadata } from 'next';
import GitHubProjects from '@/components/GitHubProjects';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/projects']);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/projects'].schema ?? []} />
      <GitHubProjects page={PAGES['/projects']} />
    </>
  );
}
