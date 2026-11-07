'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, X } from 'lucide-react';
import type { Thought } from '@/lib/thoughts';

export default function ThoughtsSection({
  initialThoughts = [],
  limit,
}: {
  initialThoughts?: Thought[];
  limit?: number;
}) {
  const [thoughts] = useState<Thought[]>(initialThoughts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = [
    'All',
    ...Array.from(new Set(thoughts.flatMap((t) => t.tags || []).filter(Boolean))),
  ];

  const filteredThoughts = thoughts.filter((t) => {
    const matchesTag = selectedTag === 'All' || t.tags?.includes(selectedTag);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesTag;

    const matchesTitle = t.title.toLowerCase().includes(q);
    const matchesSummary = t.summary.toLowerCase().includes(q);
    const matchesTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));

    return matchesTag && (matchesTitle || matchesSummary || matchesTags);
  });

  const displayedThoughts = limit ? filteredThoughts.slice(0, limit) : filteredThoughts;

  return (
    <div className="w-full">
      {/* Search Bar & Tag Filter - Only show on full thoughts page (!limit) */}
      {!limit && (
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-ink-soft" />
            </div>
            <input
              type="text"
              aria-label="Search thoughts by title or tags"
              className="block w-full pl-10 pr-9 py-2.5 border border-rule rounded-[2px] leading-5 bg-band placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal text-sm text-ink transition-all"
              placeholder="Search thoughts by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-soft hover:text-ink transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag Filter Pills */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-ink-soft font-sans mr-1">Filter by tag:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-[2px] border px-3 py-1 text-xs font-sans font-medium transition-colors ${
                    selectedTag === tag
                      ? 'border-signal bg-signal text-paper'
                      : 'border-rule bg-band text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {displayedThoughts.length === 0 ? (
        <div className="rounded-[2px] border border-rule bg-band p-8 text-center text-ink-soft space-y-3">
          <p>
            {searchQuery
              ? `No thoughts found matching "${searchQuery}"${
                  selectedTag !== 'All' ? ` under tag "${selectedTag}"` : ''
                }.`
              : 'No thoughts found.'}
          </p>
          {(searchQuery || selectedTag !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-signal hover:underline"
            >
              Clear filters & search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedThoughts.map((thought) => (
            <article
              key={thought.slug}
              className="group relative rounded-[2px] border border-rule bg-band p-6 transition-all hover:border-signal"
            >
              <Link
                href={`/thoughts/${thought.slug}`}
                className="absolute inset-0 z-0"
                aria-label={`Read ${thought.title}`}
              />

              <div className="relative z-10 pointer-events-none">
                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {thought.date
                      ? new Date(thought.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Undated'}
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
                  {thought.tags && thought.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      {thought.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] bg-paper px-2 py-0.5 text-[10px] font-sans text-ink-soft border border-rule"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-xl font-[560] leading-snug text-ink group-hover:text-signal transition-colors mb-2">
                  {thought.title}
                </h3>

                <p className="text-sm leading-relaxed text-ink-soft line-clamp-3 mb-4">
                  {thought.summary}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-signal group-hover:underline">
                  Read thought <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
