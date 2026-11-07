import Copy from './Copy';
import type { PageRecord } from '@/lib/content/pages';

/**
 * The chrome a route renders above its content: heading, optional subheading,
 * optional intro. A content module rendered embedded (inside the home feed)
 * receives no page record, so it renders no header at all.
 */
export default function PageHeader({
  page,
  align = 'center',
}: {
  page: PageRecord;
  align?: 'center' | 'left';
}) {
  return (
    <header className="mb-12">
      <div className={align === 'center' ? 'text-center' : undefined}>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {page.heading}
        </h1>
        {page.subheading && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">{page.subheading}</p>
        )}
      </div>
      {page.intro && (
        <Copy
          paragraphs={page.intro}
          className="mt-4 space-y-3 text-left text-sm leading-relaxed text-gray-600 dark:text-gray-400"
        />
      )}
    </header>
  );
}
