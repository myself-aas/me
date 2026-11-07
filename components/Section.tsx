import type { ReactNode } from 'react';
import Link from 'next/link';
import PageHeader from './PageHeader';
import type { PageRecord } from '@/lib/content/pages';

/**
 * The chrome a piece of content is placed inside.
 *
 * A route renders one page Section: heading, intro, outer frame and column
 * width. The home feed renders many feed Sections: a title, the records it
 * holds, and the link onwards. Content modules below this never learn which of
 * the two is around them.
 */

const WIDTHS = {
  narrow: 'max-w-3xl',
  prose: 'max-w-4xl',
  medium: 'max-w-5xl',
  wide: 'max-w-6xl',
} as const;

export type SectionWidth = keyof typeof WIDTHS;

export type FeedHeading = {
  /** Anchor on the home feed, e.g. `about`. */
  id?: string;
  title: string;
  /** The deeper page that holds the rest of this content. */
  viewMore?: { href: string; label: string };
};

type PageSectionProps = {
  page: PageRecord;
  width?: SectionWidth;
  /** Extra frame styling the route supplies, e.g. a tinted band. */
  className?: string;
  children: ReactNode;
};

type FeedSectionProps = {
  feed: FeedHeading;
  children: ReactNode;
};

export default function Section(props: PageSectionProps | FeedSectionProps) {
  if ('feed' in props) {
    const { feed, children } = props;

    return (
      <section
        id={feed.id}
        className="scroll-mt-16 border-t border-rule px-5 py-10 first:border-t-0 md:px-10 md:py-12"
      >
        <div className="mb-6 flex items-baseline justify-between gap-6">
          <h2 className="text-[1.3rem] tracking-[-0.015em] text-ink">{feed.title}</h2>
          {feed.viewMore && (
            <Link
              href={feed.viewMore.href}
              className="rail-link shrink-0 text-signal hover:underline"
            >
              {feed.viewMore.label}
            </Link>
          )}
        </div>

        {children}
      </section>
    );
  }

  const { page, width = 'wide', className, children } = props;

  return (
    <section className={`px-5 pb-16 pt-10 md:px-10 md:pt-14 ${className ?? ''}`}>
      <div className={`mx-auto ${WIDTHS[width]}`}>
        <PageHeader page={page} />
        {children}
      </div>
    </section>
  );
}
