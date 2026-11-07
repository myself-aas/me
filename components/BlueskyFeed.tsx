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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className={`group block relative bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-4 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all ${isMini ? 'p-5' : ''}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 shrink-0">
            <Image 
              src={post.author.avatar} 
              alt={post.author.displayName} 
              fill 
              className="rounded-full border-2 border-white dark:border-gray-700 object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.author.displayName}</div>
            <div className="text-xs text-gray-500 truncate">@{post.author.handle}</div>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            {date}
          </div>
        </div>

        <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed ${isMini ? 'text-sm line-clamp-3' : 'text-[17px]'}`}>
          <PostText text={post.text} />
        </p>

        {!isMini && post.images.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-2 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-inner">
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

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-1.5 group-hover:text-blue-500 transition-colors">
              <MessageSquare className="w-4 h-4" /> {post.replyCount || 0}
            </span>
            <span className="flex items-center gap-1.5 group-hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" /> {post.repostCount || 0}
            </span>
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
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
            <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl" />
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
            <div className="flex gap-2 p-1.5 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg">
              <button
                type="button"
                aria-pressed={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                All Threads
              </button>
              <button
                type="button"
                aria-pressed={activeTab === 'blog'}
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Research Blogs
              </button>
              <button
                type="button"
                aria-pressed={activeTab === 'media'}
                onClick={() => setActiveTab('media')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Visual Gallery
              </button>
            </div>
          </div>
        )}

        {/* Main Feed */}
        <div id="main-feed">
          <AnimatePresence mode="wait">
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
                <div className="py-20 text-center text-gray-500 italic bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                  No research updates found in this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Feed / Archive - Hide if limited */}
        {!limit && bottomPosts.length > 0 && (
          <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Research Archive</h2>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
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
