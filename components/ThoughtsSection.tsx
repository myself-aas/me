'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, X, Sparkles, Filter } from 'lucide-react';
import type { Thought } from '@/lib/thoughts';
import { formatDate } from '@/lib/utils';
import NewsletterSubscription from './NewsletterSubscription';

interface ThoughtsSectionProps {
  initialThoughts?: Thought[];
  limit?: number;
}

export default function ThoughtsSection({
  initialThoughts = [],
  limit,
}: ThoughtsSectionProps) {
  const [thoughts] = useState<Thought[]>(initialThoughts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Collect unique tags dynamically across thoughts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    thoughts.forEach((t) => {
      t.tags?.forEach((tag) => {
        if (tag) tagsSet.add(tag);
      });
    });
    return ['All', ...Array.from(tagsSet)];
  }, [thoughts]);

  // Real-time filtering by title, summary, or tags
  const filteredThoughts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return thoughts.filter((t) => {
      const matchesTag = selectedTag === 'All' || t.tags?.includes(selectedTag);
      if (!matchesTag) return false;
      if (!q) return true;

      const titleMatch = t.title.toLowerCase().includes(q);
      const summaryMatch = t.summary?.toLowerCase().includes(q) ?? false;
      const tagMatch = t.tags?.some((tag) => tag.toLowerCase().includes(q)) ?? false;

      return titleMatch || summaryMatch || tagMatch;
    });
  }, [thoughts, searchQuery, selectedTag]);

  const displayedThoughts = limit ? filteredThoughts.slice(0, limit) : filteredThoughts;

  // ESC shortcut to quickly clear active search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  return (
    <div className="w-full">
      {/* Real-time Search Input & Tag Filters */}
      {!limit && (
        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-soft">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="search"
              aria-label="Filter research articles by title, summary, or tags"
              className="block w-full pl-10 pr-10 py-3 border border-rule rounded-[2px] leading-5 bg-band placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal text-sm text-ink transition-all shadow-xs"
              placeholder="Filter research articles by title, summary, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-soft hover:text-signal transition-colors"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag Pills & Results Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-rule/40 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-ink-soft font-sans flex items-center gap-1 mr-1">
                <Filter className="h-3 w-3 text-signal" /> Tags:
              </span>
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-[2px] border px-2.5 py-1 text-xs font-sans transition-all cursor-pointer ${
                      isSelected
                        ? 'border-signal bg-signal text-paper font-semibold shadow-xs'
                        : 'border-rule/70 bg-band text-ink-soft hover:border-signal hover:text-ink'
                    }`}
                  >
                    {tag === 'All' ? 'All' : `#${tag}`}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-ink-soft">
              Showing {filteredThoughts.length} of {thoughts.length} articles
            </div>
          </div>
        </div>
      )}

      {/* Results List or Empty State */}
      {displayedThoughts.length === 0 ? (
        <div className="rounded-[2px] border border-rule bg-band p-8 text-center text-ink-soft space-y-3 my-6">
          <Sparkles className="h-8 w-8 text-signal/60 mx-auto" />
          <p className="text-base text-ink font-serif font-medium">No research articles match your query</p>
          <p className="text-xs text-ink-soft max-w-md mx-auto leading-relaxed">
            {searchQuery
              ? `No results found for "${searchQuery}"${
                  selectedTag !== 'All' ? ` under tag "#${selectedTag}"` : ''
                }. Try searching for terms like "vision", "crop", "precision", or "field".`
              : 'No articles found matching the selected tag filter.'}
          </p>
          {(searchQuery || selectedTag !== 'All') && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="inline-flex items-center gap-1.5 rounded-[2px] border border-signal px-3 py-1.5 text-xs font-sans font-medium text-signal hover:bg-signal hover:text-paper transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {displayedThoughts.map((thought) => (
            <article
              key={thought.slug}
              className="group relative rounded-[2px] border border-rule bg-band p-6 transition-all hover:border-signal hover:shadow-xs"
            >
              <Link
                href={`/thoughts/${thought.slug}`}
                className="absolute inset-0 z-0"
                aria-label={`Read thought: ${thought.title}`}
              />

              <div className="relative z-10 pointer-events-none">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-signal" />
                      {formatDate(thought.date, 'short')}
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

                  {thought.tags && thought.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
                      {thought.tags.map((tag) => {
                        const isCurrentFilter = selectedTag === tag;
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                            className={`rounded-[2px] px-2 py-0.5 text-[10px] font-sans border transition-all ${
                              isCurrentFilter
                                ? 'bg-signal text-paper border-signal font-semibold'
                                : 'bg-paper text-ink-soft border-rule hover:border-signal hover:text-signal'
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-[560] leading-snug text-ink group-hover:text-signal transition-colors mb-2">
                  {thought.title}
                </h3>

                {thought.summary && (
                  <p className="text-sm leading-relaxed text-ink-soft line-clamp-3 mb-4">
                    {thought.summary}
                  </p>
                )}

                <div className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-signal group-hover:underline">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter Subscription Callout */}
      {!limit && (
        <div className="mt-12">
          <NewsletterSubscription
            variant="banner"
            title="Subscribe to Research Thoughts"
            description="Get notified directly in your inbox when new field essays, technical write-ups, and computer vision research notes are published."
          />
        </div>
      )}
    </div>
  );
}
