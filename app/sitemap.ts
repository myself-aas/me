import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { PAGE_LIST } from '@/lib/content/pages';

// Static export: emitted as /me/sitemap.xml at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_LIST.map((page) => ({
    url: page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}/`,
    changeFrequency: page.path === '/' || page.path === '/feed' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : page.path === '/publications' || page.path === '/projects' ? 0.8 : 0.6,
  }));
}
