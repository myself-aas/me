import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static export: emitted as /me/robots.txt at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: 'https://myself-aas.github.io',
  };
}
