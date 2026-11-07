import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HomeFeed from '@/components/HomeFeed';
import { readOrcidRecord } from '@/lib/orcid-record';
import { getAllThoughts } from '@/lib/thoughts';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/']);

export default async function Home() {
  const record = await readOrcidRecord();
  const thoughts = getAllThoughts();

  return (
    <div className="w-full">
      <Hero />
      <HomeFeed publications={record.works} thoughts={thoughts} />
    </div>
  );
}
