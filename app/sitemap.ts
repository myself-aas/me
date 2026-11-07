import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from '@/lib/seo';

// Static export: emitted as /me/sitemap.xml at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}/`,
    changeFrequency: page.path === '/' || page.path === '/feed' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : page.path === '/publications' || page.path === '/projects' ? 0.8 : 0.6,
  }));
}
