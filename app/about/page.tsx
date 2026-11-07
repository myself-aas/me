import type { Metadata } from 'next';
import About from '@/components/About';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SCHEMA, personSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | About Me & My Research',
  description:
    'About Ashif Ahmed Shuvo: a food engineer turned AI researcher, pursuing an M.Sc. in AgroMeteorology at Bangladesh Agricultural University.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={[...(PAGE_SCHEMA['/about'] ?? []), personSchema]} />
      <About />
    </>
  );
}
