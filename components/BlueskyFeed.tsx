'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { MessageSquare, BookOpen, Image as ImageIcon, ExternalLink, Share2, Clock } from 'lucide-react';
import PostText from './PostText';
import { useRemote } from '@/lib/remote';
import { HANDLE, loadAuthorFeed, postsWithImages, postsWithTag, type Post } from '@/lib/sources/bluesky';

const NO_POSTS: Post[] = [];

export default function BlueskyFeed({ limit }: { limit?: number }) {
  const remote = useRemote(loadAuthorFeed);
  const posts = remote.status === 'ready' ? remote.data : NO_POSTS;
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'media'>('all');

  const visiblePosts = (() => {
    if (activeTab === 'blog') return postsWithTag(posts, '#blog');
    if (activeTab === 'media') return postsWithImages(posts);
    return posts;
  })();

  const renderPost = (post: Post, isMini = false) => {
    const date = new Date(post.createdAt).toLocaleDateString();

    return (
      <motion.a
        key={post.cid}
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block relative bg-band border border-rule rounded-[2px] p-6 mb-4 hover:border-signal transition-all ${isMini ? 'p-5' : ''}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 shrink-0">
            <Image 
              src={post.author.avatar} 
              alt={post.author.displayName} 
              fill 
              className="rounded-[2px] border-2 border-rule object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-ink truncate group-hover:text-signal transition-colors">{post.author.displayName}</div>
            <div className="text-xs text-ink-soft truncate">@{post.author.handle}</div>
          </div>
          <div className="text-xs text-ink-soft flex items-center gap-1.5 bg-band px-2 py-1 rounded-[2px]">
            <Clock className="w-3.5 h-3.5" />
            {date}
          </div>
        </div>

        <p className={`text-ink whitespace-pre-wrap break-words leading-relaxed ${isMini ? 'text-sm line-clamp-3' : 'text-[17px]'}`}>
          <PostText text={post.text} />
        </p>

        {!isMini && post.images.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-2 rounded-[2px] overflow-hidden border border-rule">
            {post.images.map((img, idx) => (
              <div key={idx} className="relative w-full aspect-video">
                <Image 
                  src={img.thumb} 
                  alt={img.alt} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-rule">
          <div className="flex items-center gap-6 text-ink-soft dark:text-ink-soft text-sm">
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
      </motion.a>
    );
  };

  if (remote.status === 'pending') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-band animate-pulse rounded-[2px]" />
          ))}
        </div>
      </div>
    );
  }

  const mainPosts = visiblePosts.slice(0, limit ?? 10);
  const bottomPosts = limit ? [] : posts.slice(10, 20);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <main className="space-y-10">
        {/* Tabs - Hide if limited */}
        {!limit && (
          <div className="flex justify-center sticky top-20 z-20">
            <div className="flex gap-2 p-1.5 bg-paper border border-rule rounded-[2px]">
              <button
                type="button"
                aria-pressed={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2.5 rounded-[2px] text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-signal text-paper ' : 'text-ink-soft hover:text-ink hover:text-ink'}`}
              >
                All Threads
              </button>
              <button
                type="button"
                aria-pressed={activeTab === 'blog'}
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-2.5 rounded-[2px] text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-signal text-paper ' : 'text-ink-soft hover:text-ink hover:text-ink'}`}
              >
                Research Blogs
              </button>
              <button
                type="button"
                aria-pressed={activeTab === 'media'}
                onClick={() => setActiveTab('media')}
                className={`px-6 py-2.5 rounded-[2px] text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-signal text-paper ' : 'text-ink-soft hover:text-ink hover:text-ink'}`}
              >
                Visual Gallery
              </button>
            </div>
          </div>
        )}

        {/* Main Feed */}
        <div id="main-feed">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              {mainPosts.length > 0 ? (
                mainPosts.map(post => renderPost(post))
              ) : (
                <div className="border border-rule bg-band py-20 text-center text-ink-soft">
                  No research updates found in this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Feed / Archive - Hide if limited */}
        {!limit && bottomPosts.length > 0 && (
          <div className="pt-12 border-t border-rule">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-band" />
              <h2 className="datum">Research Archive</h2>
              <div className="h-px flex-1 bg-band" />
            </div>
            <div className="flex flex-col gap-6">
              {bottomPosts.map(post => renderPost(post, true))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
