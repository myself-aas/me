import Copy from './Copy';
import type { PageRecord } from '@/lib/content/pages';

/**
 * What a route states before its content: the heading, an optional line of
 * provenance, an optional intro. Set for reading: serif heading, sans labels,
 * a measure that stops at 66 characters.
 */
export default function PageHeader({ page }: { page: PageRecord }) {
  return (
    <header className="mb-10 border-b border-rule pb-8">
      <h1 className="text-[clamp(2.1rem,4vw,2.9rem)] text-ink">{page.heading}</h1>
      {page.subheading && <p className="datum mt-3">{page.subheading}</p>}
      {page.intro && (
        <Copy
          paragraphs={page.intro}
          className="measure mt-5 space-y-3 text-[1.0625rem] leading-[1.62] text-ink-soft"
        />
      )}
    </header>
  );
}
