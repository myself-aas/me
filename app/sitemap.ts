import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { PAGE_LIST } from '@/lib/content/pages';
import { getAllThoughts } from '@/lib/thoughts';

// Static export: emitted as /me/sitemap.xml at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGE_LIST.map((page) => ({
    url: page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}/`,
    changeFrequency: (page.path === '/' || page.path === '/feed' ? 'weekly' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: page.path === '/' ? 1 : page.path === '/publications' || page.path === '/projects' ? 0.8 : 0.6,
  }));

  const thoughts = getAllThoughts().map((thought) => ({
    url: `${SITE_URL}/thoughts/${thought.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...thoughts];
}
