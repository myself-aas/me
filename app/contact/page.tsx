import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SCHEMA } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Ashif Ahmed Shuvo | Contact',
  description:
    'Contact Ashif Ahmed Shuvo about research collaborations, PhD opportunities, speaking or data work. Send a message with the contact form.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd nodes={PAGE_SCHEMA['/contact'] ?? []} />
      <Contact />
    </>
  );
}
