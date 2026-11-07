import type { Metadata } from 'next';
import BlueskyFeed from '@/components/BlueskyFeed';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/feed']);

export default function FeedPage() {
  return (
    <>
      <JsonLd nodes={PAGES['/feed'].schema ?? []} />
      <BlueskyFeed page={PAGES['/feed']} />
    </>
  );
}
