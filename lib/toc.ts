export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Converts a string heading to a URL-safe DOM element ID.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

/**
 * Extracts h1, h2, h3, h4 headings from markdown text,
 * ignoring headings contained inside code blocks.
 */
export function extractHeadings(markdown: string): TocItem[] {
  if (!markdown) return [];

  const items: TocItem[] = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      let text = match[2].trim();

      // Strip markdown tags from heading text
      text = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`~]/g, '')
        .trim();

      if (text) {
        items.push({
          id: '',
          text,
          level,
        });
      }
    }
  }

  // Ensure unique IDs across duplicate heading texts
  const idCounts = new Map<string, number>();
  return items.map((item) => {
    let baseId = slugify(item.text);
    if (!baseId) {
      baseId = `heading-${Math.random().toString(36).substring(2, 7)}`;
    }

    const count = idCounts.get(baseId) || 0;
    idCounts.set(baseId, count + 1);
    const id = count > 0 ? `${baseId}-${count}` : baseId;

    return {
      ...item,
      id,
    };
  });
}
