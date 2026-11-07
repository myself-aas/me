import type { Metadata } from 'next';
import BlueskyFeed from '@/components/BlueskyFeed';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SCHEMA } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Research Feed',
  description:
    'Short research updates from Ashif Ahmed Shuvo on computer vision, remote sensing and sustainable agriculture, published through Bluesky.',
  path: '/feed',
});

export default function FeedPage() {
  return (
    <>
      <JsonLd nodes={PAGE_SCHEMA['/feed'] ?? []} />
      <BlueskyFeed />
    </>
  );
}
