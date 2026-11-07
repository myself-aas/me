'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { MessageSquare, Share2, Clock, ExternalLink, Globe, Layers, Filter } from 'lucide-react';
import PostText from './PostText';
import { useRemote } from '@/lib/remote';
import { HANDLE, loadAuthorFeed, postsWithImages, postsWithTag, type Post } from '@/lib/sources/bluesky';

const NO_POSTS: Post[] = [];

type FeedCategory = 'all' | 'bluesky' | 'notes' | 'media';

export default function UnifiedSocialFeed({
  limit,
  initialCategory = 'all',
}: {
  limit?: number;
  initialCategory?: FeedCategory;
}) {
  const remote = useRemote(loadAuthorFeed);
  const posts = remote.status === 'ready' ? remote.data : NO_POSTS;
  const [activeCategory, setActiveCategory] = useState<FeedCategory>(initialCategory);

  // Categorize social media posts
  const categorizedPosts = (() => {
    switch (activeCategory) {
      case 'notes':
        return postsWithTag(posts, '#blog');
      case 'media':
        return postsWithImages(posts);
      case 'bluesky':
      case 'all':
      default:
        return posts;
    }
  })();

  const renderPost = (post: Post, isMini = false) => {
    const date = new Date(post.createdAt).toLocaleDateString();

    return (
      <motion.div
        key={post.cid}
        className={`group relative bg-band border border-rule rounded-[2px] p-6 mb-4 hover:border-signal transition-all ${
          isMini ? 'p-5' : ''
        }`}
      >
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0"
          aria-label="Read update on Bluesky"
        />

        <div className="relative z-10 pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src={post.author.avatar || 'https://github.com/myself-aas.png'}
                alt={post.author.displayName}
                fill
                className="rounded-[2px] border border-rule object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink truncate group-hover:text-signal transition-colors text-sm">
                  {post.author.displayName}
                </span>
                <span className="rounded-[2px] bg-paper px-1.5 py-0.5 text-[9px] font-sans text-ink-soft border border-rule">
                  Bluesky
                </span>
              </div>
              <div className="text-xs text-ink-soft truncate">@{post.author.handle}</div>
            </div>
            <div className="text-xs text-ink-soft flex items-center gap-1.5 bg-band px-2 py-1 rounded-[2px]">
              <Clock className="w-3.5 h-3.5" />
              {date}
            </div>
          </div>

          <p
            className={`text-ink whitespace-pre-wrap break-words leading-relaxed pointer-events-auto ${
              isMini ? 'text-sm line-clamp-3' : 'text-[1.03rem]'
            }`}
          >
            <PostText text={post.text} />
          </p>

          {!isMini && post.images.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-2 rounded-[2px] overflow-hidden border border-rule">
              {post.images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-video">
                  <Image
                    src={img.thumb}
                    alt={img.alt || 'Post image'}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-rule">
            <div className="flex items-center gap-6 text-ink-soft text-xs">
              <span className="flex items-center gap-1.5 group-hover:text-signal transition-colors">
                <MessageSquare className="w-4 h-4" /> {post.replyCount || 0}
              </span>
              <span className="flex items-center gap-1.5 group-hover:text-teal transition-colors">
                <Share2 className="w-4 h-4" /> {post.repostCount || 0}
              </span>
            </div>
            <div className="text-xs font-bold text-signal flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              Read Thread <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (remote.status === 'pending') {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 bg-band animate-pulse rounded-[2px]" />
        ))}
      </div>
    );
  }

  const mainPosts = categorizedPosts.slice(0, limit ?? 12);

  return (
    <div className="w-full space-y-6">
      {/* Category Filter Tabs - Only show when not in preview mode */}
      {!limit && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Dispatches' },
              { id: 'notes', label: 'Research Threads (#blog)' },
              { id: 'media', label: 'Media & Field Snaps' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as FeedCategory)}
                className={`rounded-[2px] px-3.5 py-1.5 text-xs font-sans font-medium transition-colors border ${
                  activeCategory === cat.id
                    ? 'border-signal bg-signal text-paper'
                    : 'border-rule bg-band text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <a
            href={`https://bsky.app/profile/${HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-sans text-signal hover:underline"
          >
            @{HANDLE} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Main Feed Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-4"
        >
          {mainPosts.length > 0 ? (
            mainPosts.map((post) => renderPost(post))
          ) : (
            <div className="border border-rule bg-band py-16 text-center text-ink-soft rounded-[2px]">
              No updates currently available in this category.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
