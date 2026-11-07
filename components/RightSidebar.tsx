'use client';

import Image from 'next/image';
import {
  Cloud,
  MapPin,
  BarChart3,
  Globe,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  Activity,
  MessageSquare,
  BookOpen,
  FileText
} from 'lucide-react';
import PostText from './PostText';
import { useRemote } from '@/lib/remote';
import { HANDLE, loadAuthorFeed, postsWithImages, postsWithTag } from '@/lib/sources/bluesky';
import { loadVideos } from '@/lib/sources/youtube';
import { loadArtwork } from '@/lib/sources/met-museum';
import { loadWeather } from '@/lib/sources/weather';
import { loadDatasets } from '@/lib/sources/hdx';

// --- Resume Widget ---
const ResumeWidget = () => {
  return (
    <div className="border-t border-rule py-4">
      <a 
        href="/me/Ashif_Ahmed_Shuvo_Resume.pdf" 
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
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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

// --- YouTube Widget ---
const YouTubeWidget = () => {
  const remote = useRemote(loadVideos);

  if (remote.status === 'pending') return <div className="animate-pulse h-16 bg-band" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  return (
    <div className="border-t border-rule py-4">
      <h2 className="datum mb-3">YouTube content</h2>
      <div className="space-y-3">
        {remote.data.map((video) => (
          <a 
            key={video.id} 
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative w-full h-20 mb-1">
              <Image 
                src={video.thumbnail} 
                alt={video.title} 
                fill 
                className="rounded-[2px] object-cover"
              />
            </div>
            <p className="text-xs font-bold text-ink line-clamp-1 group-hover:text-signal transition-colors">{video.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

// --- Met Museum Widget ---
const MetMuseumWidget = () => {
  const remote = useRemote(loadArtwork);

  if (remote.status === 'pending') return <div className="animate-pulse h-16 bg-band" />;
  if (remote.status !== 'ready' || !remote.data) return null;

  const artwork = remote.data;

  return (
    <div className="border-t border-rule py-4">
      <h2 className="datum mb-3">Met Museum spotlight</h2>
      <div className="relative w-full h-40 mb-3">
        <Image 
          src={artwork.image} 
          alt={artwork.title} 
          fill 
          className="rounded-[2px] object-cover"
        />
      </div>
      <p className="text-xs font-bold text-ink line-clamp-1">{artwork.title}</p>
      <p className="text-[10px] text-ink-soft">{artwork.artist}</p>
    </div>
  );
};

// --- Weather Widget (Open-Meteo) ---
const WeatherWidget = () => {
  const remote = useRemote(loadWeather);

  if (remote.status === 'pending') return <div className="animate-pulse h-10 bg-band" />;
  if (remote.status === 'unavailable') return (
    <div className="p-4 bg-band rounded-[2px] mb-4 text-xs text-ink-soft flex items-center gap-2 border border-rule">
      <AlertCircle className="w-4 h-4" /> {remote.reason}
    </div>
  );

  const weather = remote.data;

  return (
    <div className="border-t border-rule py-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="datum">Weather</h2>
        <Cloud className="w-4 h-4 text-signal" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{weather.temperature}°C</span>
        <div className="text-xs text-ink-soft">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Local
          </div>
          <div>Wind: {weather.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

// --- HDX Widget (Humanitarian Data Exchange) ---
const HDXWidget = () => {
  const remote = useRemote(loadDatasets);

  if (remote.status === 'unavailable') return null;

  return (
    <div className="border-t border-rule py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="datum">Humanitarian data</h2>
        <Globe className="w-4 h-4 text-ochre" />
      </div>
      <div className="space-y-3">
        {remote.status === 'pending' ? (
          [1, 2].map(i => <div key={i} className="h-10 bg-band rounded animate-pulse" />)
        ) : (
          remote.data.map((dataset) => (
            <a 
              key={dataset.id} 
              href={`https://data.humdata.org/dataset/${dataset.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="text-[11px] font-bold text-ink group-hover:text-signal transition-colors line-clamp-1">
                {dataset.title}
              </div>
              <div className="text-[10px] text-ink-soft flex items-center gap-1">
                <Activity className="w-3 h-3" /> {dataset.organisation}
              </div>
            </a>
          ))
        )}
      </div>
      <a 
        href="https://data.humdata.org/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-3 block text-center text-[10px] text-signal font-bold hover:underline"
      >
        View HDX Explorer
      </a>
    </div>
  );
};

// --- Bluesky Archive Widget ---
const BlueskyArchiveWidget = () => {
  const remote = useRemote(loadAuthorFeed);

  if (remote.status === 'pending') return <div className="animate-pulse h-20 bg-band" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  const threads = remote.data.slice(0, 2);
  const blogs = postsWithTag(remote.data, '#blog').slice(0, 2);
  const gallery = postsWithImages(remote.data).slice(0, 2);

  const renderMiniPost = (post: { cid: string; text: string }) => (
    <div key={post.cid} className="border-b border-rule last:border-0 pb-2 last:pb-0">
      <p className="text-[10px] text-ink whitespace-pre-wrap break-words">
        <PostText text={post.text} />
      </p>
    </div>
  );

  return (
    <div className="border-t border-rule py-4">
      <h2 className="datum mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-signal" aria-hidden="true" /> Research archive
      </h2>
      
      <div className="space-y-4">
        <div>
          <h4 className="datum mb-2">Threads</h4>
          <div className="space-y-2">
            {threads.map(renderMiniPost)}
          </div>
        </div>

        <div>
          <h4 className="datum mb-2">Blogs</h4>
          <div className="space-y-2">
            {blogs.map(renderMiniPost)}
          </div>
        </div>

        <div>
          <h4 className="datum mb-2">Gallery</h4>
          <div className="space-y-2">
            {gallery.map(renderMiniPost)}
          </div>
        </div>
      </div>

      <a 
        href={`https://bsky.app/profile/${HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-[10px] text-signal font-bold hover:underline"
      >
        Explore Full Archive
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
      <YouTubeWidget />
      <BlueskyWidget />
      <MetMuseumWidget />
      <WeatherWidget />
      <HDXWidget />
      <BlueskyArchiveWidget />
    </aside>
  );
}
