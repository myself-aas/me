'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, BookOpen, Image as ImageIcon, ExternalLink, Share2, Clock } from 'lucide-react';

const HANDLE = "meaas.bsky.social";

interface BlueskyPost {
  post: {
    uri: string;
    cid: string;
    author: {
      handle: string;
      displayName: string;
      avatar: string;
    };
    record: {
      text: string;
      createdAt: string;
    };
    embed?: {
      images?: Array<{
        thumb: string;
        fullsize: string;
        alt: string;
      }>;
    };
    likeCount?: number;
    repostCount?: number;
    replyCount?: number;
  };
  reply?: any;
}

export default function BlueskyFeed() {
  const [posts, setPosts] = useState<BlueskyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'media'>('all');

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=30`);
        const data = await res.json();
        // Filter out replies to keep it clean as per user strategy
        const filteredPosts = data.feed.filter((f: BlueskyPost) => !f.reply);
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to fetch Bluesky feed:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  const getFilteredPosts = () => {
    if (activeTab === 'blog') {
      return posts.filter(p => p.post.record.text.includes('#blog'));
    }
    if (activeTab === 'media') {
      return posts.filter(p => p.post.embed?.images);
    }
    return posts;
  };

  const renderPost = (item: BlueskyPost, isMini = false) => {
    const p = item.post;
    const postId = p.uri.split('/').pop();
    const postUrl = `https://bsky.app/profile/${HANDLE}/post/${postId}`;
    const date = new Date(p.record.createdAt).toLocaleDateString();

    return (
      <motion.div
        key={p.cid}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`group relative bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 mb-4 backdrop-blur-sm hover:border-blue-500/30 transition-all ${isMini ? 'p-4' : ''}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image 
              src={p.author.avatar} 
              alt={p.author.displayName} 
              fill 
              className="rounded-full border border-gray-200 dark:border-gray-700 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 dark:text-white truncate">{p.author.displayName}</div>
            <div className="text-xs text-gray-500 truncate">@{p.author.handle}</div>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {date}
          </div>
        </div>

        <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words ${isMini ? 'text-sm line-clamp-3' : 'text-base'}`}>
          {p.record.text}
        </p>

        {!isMini && p.embed?.images && (
          <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            {p.embed.images.map((img, idx) => (
              <div key={idx} className="relative w-full aspect-video">
                <Image 
                  src={img.thumb} 
                  alt={img.alt} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {p.replyCount || 0}</span>
            <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {p.repostCount || 0}</span>
          </div>
          <a 
            href={postUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            View on Bluesky <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const mainPosts = getFilteredPosts().slice(0, 5);
  const bottomPosts = posts.slice(10, 15);
  const sidebarPosts = posts.slice(0, 3);

  return (
    <div className="p-6 space-y-8">
      <main className="space-y-8">
        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Threads
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'blog' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Blogs
            </button>
            <button 
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Gallery
            </button>
          </div>
        </div>

        {/* Main Feed */}
        <div id="main-feed">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {mainPosts.length > 0 ? (
                mainPosts.map(post => renderPost(post))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500 italic">No posts found in this category.</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Feed / Archive */}
        {bottomPosts.length > 0 && (
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Archive Feed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bottomPosts.map(post => renderPost(post, true))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
