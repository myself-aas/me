import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HomeFeed from '@/components/HomeFeed';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/']);

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <HomeFeed />
    </div>
  );
}
