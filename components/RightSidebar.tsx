'use client';

import Image from 'next/image';
import {
  ExternalLink,
  TrendingUp,
  MessageSquare,
  FileText
} from 'lucide-react';
import PostText from './PostText';
import NewsletterSubscription from './NewsletterSubscription';
import { useRemote } from '@/lib/remote';
import { HANDLE, loadAuthorFeed } from '@/lib/sources/bluesky';
import { formatDate } from '@/lib/utils';

// --- Resume Widget ---
const ResumeWidget = () => {
  return (
    <div className="border-t border-rule py-4">
      <a 
        href="/Ashif_Ahmed_Shuvo_Resume.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[2px] border-2 border-signal text-signal font-bold hover:bg-signal hover:text-paper transition-all "
      >
        View Resume <FileText className="w-4 h-4" />
      </a>
    </div>
  );
};

// --- Bluesky Widget ---
const BlueskyWidget = () => {
  const remote = useRemote(loadAuthorFeed);

  if (remote.status === 'pending') return <div className="animate-pulse h-16 bg-band" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  const posts = remote.data.slice(0, 3);

  return (
    <div className="border-t border-rule py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="datum flex items-center gap-2 text-signal">
          <TrendingUp className="w-4 h-4" aria-hidden="true" /> Recent posts
        </h2>
        <a href={`https://bsky.app/profile/${HANDLE}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-3 h-3 text-ink-soft hover:text-signal" />
        </a>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.cid} className="border-b border-rule last:border-0 pb-2 last:pb-0">
            <p className="text-[11px] text-ink line-clamp-2 mb-1">
              <PostText text={post.text} />
            </p>
            <div className="flex items-center justify-between text-[9px] text-ink-soft">
              <span>{formatDate(post.createdAt, 'short')}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-2 h-2" /> {post.replyCount}</span>
            </div>
          </div>
        ))}
      </div>
      <a 
        href={`https://bsky.app/profile/${HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center py-1.5 text-[10px] font-bold text-signal bg-signal-wash rounded-[2px] hover:bg-signal-wash transition-all"
      >
        Follow on Bluesky
      </a>
    </div>
  );
};

export default function RightSidebar() {
  return (
    <aside className="w-full space-y-4">
      {/* Search Placeholder */}
      <div className="sticky top-0 z-10 py-2 bg-transparent">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            aria-label="Search the portfolio"
            className="block w-full pl-10 pr-3 py-2 border border-rule rounded-[2px] bg-band text-sm placeholder-gray-500 focus:ring-2 focus:ring-signal focus:bg-band focus:bg-paper transition-all"
            placeholder="Search Portfolio"
          />
        </div>
      </div>

      <ResumeWidget />
      <NewsletterSubscription variant="compact" />
      <BlueskyWidget />
    </aside>
  );
}
