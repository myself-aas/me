import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, BookOpen, Sparkles } from 'lucide-react';
import { getAllThoughts, getThoughtBySlug, getRelatedThoughts } from '@/lib/thoughts';
import { pageMetadata } from '@/lib/seo';
import ThoughtContent from './ThoughtContent';
import SubscribeThoughts from '@/components/SubscribeThoughts';
import CopyLinkButton from '@/components/CopyLinkButton';
import { formatDate } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const thoughts = getAllThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    return pageMetadata({
      title: 'Ashif Ahmed Shuvo | Thought Not Found',
      description: 'The requested research thought could not be found in the portfolio thoughts index.',
      path: `/thoughts/${slug}`,
    });
  }

  const title = `Ashif Ahmed Shuvo | ${thought.title}`;
  // Ensure description meets SEO length bounds if possible
  let description = thought.summary || thought.title;
  if (description.length < 120) {
    description = `${description} — A research thought and field note by Ashif Ahmed Shuvo on computer vision and agro-meteorology.`;
  }
  if (description.length > 160) {
    description = description.slice(0, 157) + '...';
  }

  return pageMetadata({
    title: title.length > 60 ? title.slice(0, 57) + '...' : title,
    description,
    path: `/thoughts/${slug}`,
  });
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  const allThoughts = getAllThoughts();
  const currentIndex = allThoughts.findIndex((t) => t.slug === slug);
  const nextThought = currentIndex > 0 ? allThoughts[currentIndex - 1] : null;
  const prevThought = currentIndex < allThoughts.length - 1 ? allThoughts[currentIndex + 1] : null;
  const relatedThoughts = getRelatedThoughts(slug, 3);

  return (
    <article className="px-5 pb-16 pt-10 md:px-10 md:pt-14">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-signal hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all thoughts
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 border-b border-rule pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-signal" />
                <span>Thought</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(thought.date, 'long')}
              </span>
              {thought.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {thought.readingTime}
                  </span>
                </>
              )}
            </div>

            {/* Copy Article Link Button */}
            <CopyLinkButton />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-[560] leading-tight text-ink mb-6">
            {thought.title}
          </h1>

          {thought.summary && (
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed border-l-2 border-signal pl-4 my-4 bg-band/40 py-2 rounded-r-[2px]">
              {thought.summary}
            </p>
          )}

          {thought.tags && thought.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {thought.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[2px] bg-band px-2.5 py-1 text-xs font-sans text-ink-soft border border-rule"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <ThoughtContent content={thought.content} />

        {/* Related Thoughts Section */}
        {relatedThoughts.length > 0 && (
          <section className="mt-14 border-t border-rule pt-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <h2 className="font-serif text-xl font-[560] text-ink flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-signal" />
                <span>Related Thoughts</span>
              </h2>
              <span className="text-xs text-ink-soft">
                Suggested based on matching research tags
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedThoughts.map((related) => {
                const currentTagsLower = (thought.tags || []).map((t) => t.toLowerCase());
                return (
                  <Link
                    key={related.slug}
                    href={`/thoughts/${related.slug}`}
                    className="group flex flex-col justify-between rounded-[2px] border border-rule bg-band/40 p-4 transition-all hover:border-signal hover:bg-band hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-ink-soft mb-2">
                        <Calendar className="h-3 w-3 text-signal" />
                        <span>{formatDate(related.date, 'short')}</span>
                        {related.readingTime && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {related.readingTime}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-serif text-base font-[560] text-ink group-hover:text-signal transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      {related.summary && (
                        <p className="text-xs text-ink-soft line-clamp-2 mb-3 leading-relaxed">
                          {related.summary}
                        </p>
                      )}
                    </div>

                    {related.tags && related.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-rule/50">
                        {related.tags.slice(0, 3).map((tag) => {
                          const isShared = currentTagsLower.includes(tag.toLowerCase());
                          return (
                            <span
                              key={tag}
                              className={`rounded-[2px] px-2 py-0.5 text-[10px] font-sans border transition-colors ${
                                isShared
                                  ? 'bg-signal/10 text-signal border-signal/30 font-medium'
                                  : 'bg-band text-ink-soft border-rule'
                              }`}
                            >
                              #{tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Subscribe Component */}
        <SubscribeThoughts />

        {/* Navigation Footer */}
        <footer className="mt-14 border-t border-rule pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevThought ? (
              <Link
                href={`/thoughts/${prevThought.slug}`}
                className="group flex flex-col rounded-[2px] border border-rule bg-band p-4 transition-all hover:border-signal"
              >
                <span className="text-[10px] font-sans uppercase tracking-wider text-ink-soft mb-1">
                  Previous Thought
                </span>
                <span className="font-serif text-sm font-[560] text-ink group-hover:text-signal transition-colors line-clamp-1">
                  {prevThought.title}
                </span>
              </Link>
            ) : <div />}

            {nextThought ? (
              <Link
                href={`/thoughts/${nextThought.slug}`}
                className="group flex flex-col sm:items-end text-left sm:text-right rounded-[2px] border border-rule bg-band p-4 transition-all hover:border-signal"
              >
                <span className="text-[10px] font-sans uppercase tracking-wider text-ink-soft mb-1">
                  Next Thought
                </span>
                <span className="font-serif text-sm font-[560] text-ink group-hover:text-signal transition-colors line-clamp-1">
                  {nextThought.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2 rounded-[2px] border border-rule bg-band px-4 py-2 text-xs font-sans font-medium text-ink hover:border-signal hover:text-signal transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all thoughts
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
