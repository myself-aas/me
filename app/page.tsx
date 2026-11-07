import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HomeFeed from '@/components/HomeFeed';
import { pageMetadata } from '@/lib/seo';
import { PAGES } from '@/lib/content/pages';

export const metadata: Metadata = pageMetadata(PAGES['/']);

export default function Home() {
  return (
    <div className="w-full">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 hidden md:block">
        <h2 className="text-xl font-bold tracking-tight">{PAGES['/'].heading}</h2>
      </div>
      <Hero />
      <HomeFeed />
    </div>
  );
}
