import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Thought = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime?: string;
  content: string;
};

const THOUGHTS_DIR = path.join(process.cwd(), 'thoughts');

export function getAllThoughts(): Thought[] {
  if (!fs.existsSync(THOUGHTS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(THOUGHTS_DIR);
  const thoughts: Thought[] = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(THOUGHTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date ? String(data.date) : '',
        summary: data.summary || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: data.readingTime || '4 min read',
        content,
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));

  return thoughts;
}

export function getThoughtBySlug(slug: string): Thought | null {
  const fullPath = path.join(THOUGHTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date ? String(data.date) : '',
    summary: data.summary || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime || '4 min read',
    content,
  };
}

export function getRelatedThoughts(currentSlug: string, limit = 3): Thought[] {
  const currentThought = getThoughtBySlug(currentSlug);
  const allOtherThoughts = getAllThoughts().filter((t) => t.slug !== currentSlug);

  if (!currentThought || !currentThought.tags || currentThought.tags.length === 0) {
    return allOtherThoughts.slice(0, limit);
  }

  const currentTagsLower = currentThought.tags.map((t) => t.toLowerCase());

  // Score thoughts by number of matching tags
  const scored = allOtherThoughts.map((thought) => {
    const thoughtTagsLower = (thought.tags || []).map((t) => t.toLowerCase());
    const matchCount = thoughtTagsLower.filter((tag) => currentTagsLower.includes(tag)).length;
    return { thought, matchCount };
  });

  // Sort by match count desc, then date desc
  scored.sort((a, b) => {
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }
    return (new Date(b.thought.date).getTime() || 0) - (new Date(a.thought.date).getTime() || 0);
  });

  return scored.map((item) => item.thought).slice(0, limit);
}
