'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PageHeader from './PageHeader';
import type { PageRecord } from '@/lib/content/pages';

/**
 * The chrome a piece of content is placed inside.
 *
 * A route renders one page Section: heading, intro, outer frame and column
 * width. The home feed renders many feed Sections: a title row, a card, and an
 * optional link onwards. Content modules below this never learn which of the
 * two is around them — they render their subject and nothing else.
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
  icon: LucideIcon;
  /** The deeper page that holds the rest of this content. */
  viewMore?: { href: string; label: string };
};

type PageSectionProps = {
  page: PageRecord;
  align?: 'center' | 'left';
  width?: SectionWidth;
  /** Extra frame styling the route supplies, e.g. a tinted background. */
  className?: string;
  children: ReactNode;
};

type FeedSectionProps = {
  feed: FeedHeading;
  /** Draw the card around the content. Off when the content brings its own. */
  card?: boolean;
  /** Pad the content. Off for content that manages full-bleed surfaces. */
  padded?: boolean;
  children: ReactNode;
};

export default function Section(props: PageSectionProps | FeedSectionProps) {
  if ('feed' in props) {
    const { feed, card = true, padded = true, children } = props;
    const Icon = feed.icon;

    return (
      <section
        id={feed.id}
        className="py-12 px-6 border-b border-gray-100 dark:border-gray-900 last:border-0 scroll-mt-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {feed.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            card
              ? 'bg-white dark:bg-black/40 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-sm overflow-hidden'
              : undefined
          }
        >
          <div className={padded ? 'p-6' : undefined}>{children}</div>
          {feed.viewMore && (
            <div className="border-t border-gray-100 dark:border-gray-900 p-4 bg-gray-50/30 dark:bg-white/5 flex justify-center">
              <Link
                href={feed.viewMore.href}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                {feed.viewMore.label}
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </motion.div>
      </section>
    );
  }

  const { page, align = 'center', width = 'wide', className, children } = props;

  return (
    <section className={`py-20 ${className ?? ''}`}>
      <div className={`container mx-auto px-4 ${WIDTHS[width]}`}>
        <PageHeader page={page} align={align} />
        {children}
      </div>
    </section>
  );
}
