/**
 * Enforces the invariants a page record has to satisfy.
 *
 * Runs before the build (`npm run prebuild`) through Node's type stripping, so
 * a bad record fails in a second rather than in a search console three weeks
 * after deploy. The bounds come from the SEO audit that shaped the records:
 * titles 30-60 characters with the owner's name in front, descriptions
 * 120-160 characters, both unique per route.
 */
import { PAGE_LIST } from '../lib/content/pages.ts';

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 160;
const BRAND = 'Ashif Ahmed Shuvo';

const problems: string[] = [];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

for (const page of PAGE_LIST) {
  const at = `page record ${page.path}`;

  if (!page.path.startsWith('/')) problems.push(`${at}: path must start with "/"`);
  if (!page.heading.trim()) problems.push(`${at}: missing heading`);

  if (page.title.length < TITLE_MIN || page.title.length > TITLE_MAX) {
    problems.push(`${at}: title is ${page.title.length} chars, expected ${TITLE_MIN}-${TITLE_MAX}`);
  }
  if (!page.title.startsWith(BRAND)) {
    problems.push(`${at}: title must start with "${BRAND}"`);
  }
  if (page.description.length < DESCRIPTION_MIN || page.description.length > DESCRIPTION_MAX) {
    problems.push(
      `${at}: description is ${page.description.length} chars, expected ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`,
    );
  }

  const seenTitle = titles.get(page.title);
  if (seenTitle) problems.push(`${at}: title duplicates ${seenTitle}`);
  else titles.set(page.title, page.path);

  const seenDescription = descriptions.get(page.description);
  if (seenDescription) problems.push(`${at}: description duplicates ${seenDescription}`);
  else descriptions.set(page.description, page.path);

  // An intro link that points off-site or at a route with no record is a typo
  // the build would otherwise ship as a 404.
  for (const paragraph of page.intro ?? []) {
    if (typeof paragraph === 'string') continue;
    for (const segment of paragraph) {
      if (typeof segment === 'string') continue;
      if (!segment.href.startsWith('/')) {
        problems.push(`${at}: intro link "${segment.label}" must be an internal route`);
      } else if (!PAGE_LIST.some((other) => other.path === segment.href)) {
        problems.push(`${at}: intro link "${segment.label}" points at ${segment.href}, which has no record`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`✗ ${problems.length} page record problem(s):\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}

console.log(`✓ ${PAGE_LIST.length} page records valid`);
