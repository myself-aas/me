'use client';
import Hero from '@/components/Hero';
import HomeFeed from '@/components/HomeFeed';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 hidden md:block">
        <h2 className="text-xl font-bold tracking-tight">Ashif Ahmed Shuvo</h2>
      </div>
      <Hero />
      <HomeFeed />
    </div>
  );
}
