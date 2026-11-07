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
    <div className="p-4 glass-card rounded-2xl mb-4 border border-blue-100/20 dark:border-blue-900/20">
      <a 
        href="/me/Ashif_Ahmed_Shuvo_Resume.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-[0_0_12px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
      >
        View Resume <FileText className="w-4 h-4" />
      </a>
    </div>
  );
};

// --- Bluesky Widget ---
const BlueskyWidget = () => {
  const remote = useRemote(loadAuthorFeed);

  if (remote.status === 'pending') return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  const posts = remote.data.slice(0, 3);

  return (
    <div className="p-4 glass-card rounded-2xl mb-4 border border-blue-100/20 dark:border-blue-900/20">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <TrendingUp className="w-4 h-4" /> Latest Updates
        </h2>
        <a href={`https://bsky.app/profile/${HANDLE}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-3 h-3 text-gray-400 hover:text-blue-500" />
        </a>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.cid} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 last:pb-0">
            <p className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-2 mb-1">
              <PostText text={post.text} />
            </p>
            <div className="flex items-center justify-between text-[9px] text-gray-400">
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
        className="mt-3 block text-center py-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-all"
      >
        Follow on Bluesky
      </a>
    </div>
  );
};

// --- YouTube Widget ---
const YouTubeWidget = () => {
  const remote = useRemote(loadVideos);

  if (remote.status === 'pending') return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h2 className="font-bold text-sm mb-3">YouTube Content</h2>
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
                className="rounded-xl object-cover"
              />
            </div>
            <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">{video.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

// --- Met Museum Widget ---
const MetMuseumWidget = () => {
  const remote = useRemote(loadArtwork);

  if (remote.status === 'pending') return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (remote.status !== 'ready' || !remote.data) return null;

  const artwork = remote.data;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h2 className="font-bold text-sm mb-3">Met Museum Spotlight</h2>
      <div className="relative w-full h-40 mb-3">
        <Image 
          src={artwork.image} 
          alt={artwork.title} 
          fill 
          className="rounded-xl object-cover"
        />
      </div>
      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{artwork.title}</p>
      <p className="text-[10px] text-gray-500">{artwork.artist}</p>
    </div>
  );
};

// --- Weather Widget (Open-Meteo) ---
const WeatherWidget = () => {
  const remote = useRemote(loadWeather);

  if (remote.status === 'pending') return <div className="animate-pulse h-24 bg-white/20 dark:bg-black/20 rounded-2xl mb-4 backdrop-blur-sm" />;
  if (remote.status === 'unavailable') return (
    <div className="p-4 bg-white/20 dark:bg-black/20 rounded-2xl mb-4 text-xs text-gray-500 flex items-center gap-2 backdrop-blur-sm border border-white/10">
      <AlertCircle className="w-4 h-4" /> {remote.reason}
    </div>
  );

  const weather = remote.data;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-sm">Weather</h2>
        <Cloud className="w-4 h-4 text-blue-500" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{weather.temperature}°C</span>
        <div className="text-xs text-gray-500">
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
    <div className="p-4 glass-card rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-sm">Humanitarian Data</h2>
        <Globe className="w-4 h-4 text-orange-500" />
      </div>
      <div className="space-y-3">
        {remote.status === 'pending' ? (
          [1, 2].map(i => <div key={i} className="h-10 bg-white/20 dark:bg-black/20 rounded animate-pulse backdrop-blur-sm" />)
        ) : (
          remote.data.map((dataset) => (
            <a 
              key={dataset.id} 
              href={`https://data.humdata.org/dataset/${dataset.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="text-[11px] font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                {dataset.title}
              </div>
              <div className="text-[10px] text-gray-500 flex items-center gap-1">
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
        className="mt-3 block text-center text-[10px] text-blue-500 font-bold hover:underline"
      >
        View HDX Explorer
      </a>
    </div>
  );
};

// --- Countly / Analytics Widget ---
const AnalyticsWidget = () => {
  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-sm">Site Analytics</h2>
        <BarChart3 className="w-4 h-4 text-purple-500" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Total Views</span>
          <span className="font-bold">1.2k</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Unique Visitors</span>
          <span className="font-bold">842</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Avg. Session</span>
          <span className="font-bold">2m 14s</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 italic">
          <TrendingUp className="w-3 h-3" /> Powered by Countly
        </div>
      </div>
    </div>
  );
};

// --- Recommended Researchers Widget ---
const RecommendedResearchers = () => {
  const researchers = [
    { name: "Google AI Research", handle: "GoogleAI", avatar: "G" },
    { name: "NVIDIA Research", handle: "NVIDIAAI", avatar: "N" },
    { name: "OpenAI Research", handle: "OpenAI", avatar: "O" },
  ];

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h2 className="font-bold text-sm mb-4 tracking-tight">Recommended Researchers</h2>
      <div className="space-y-4">
        {researchers.map((user) => (
          <div key={user.handle} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm backdrop-blur-sm">
                {user.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white hover:underline cursor-pointer">{user.name}</div>
                <div className="text-[10px] text-gray-500">@{user.handle}</div>
              </div>
            </div>
            <a 
              href={`https://www.linkedin.com/search/results/all/?keywords=${user.handle}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900/90 dark:bg-white/90 text-white dark:text-black text-[10px] font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-all backdrop-blur-sm"
            >
              Profile
            </a>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-500 text-[11px] font-bold hover:underline">View more</button>
    </div>
  );
};

// --- Bluesky Archive Widget ---
const BlueskyArchiveWidget = () => {
  const remote = useRemote(loadAuthorFeed);

  if (remote.status === 'pending') return <div className="animate-pulse h-64 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (remote.status !== 'ready' || remote.data.length === 0) return null;

  const threads = remote.data.slice(0, 2);
  const blogs = postsWithTag(remote.data, '#blog').slice(0, 2);
  const gallery = postsWithImages(remote.data).slice(0, 2);

  const renderMiniPost = (post: { cid: string; text: string }) => (
    <div key={post.cid} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 last:pb-0">
      <p className="text-[10px] text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
        <PostText text={post.text} />
      </p>
    </div>
  );

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-500" /> Research Archive
      </h2>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Threads</h4>
          <div className="space-y-2">
            {threads.map(renderMiniPost)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Blogs</h4>
          <div className="space-y-2">
            {blogs.map(renderMiniPost)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Gallery</h4>
          <div className="space-y-2">
            {gallery.map(renderMiniPost)}
          </div>
        </div>
      </div>

      <a 
        href={`https://bsky.app/profile/${HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-[10px] text-blue-500 font-bold hover:underline"
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
      <div className="sticky top-0 z-10 py-2 bg-transparent backdrop-blur-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            aria-label="Search the portfolio"
            className="block w-full pl-10 pr-3 py-2 border border-white/20 dark:border-white/10 rounded-xl bg-white/40 dark:bg-black/40 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-md"
            placeholder="Search Portfolio"
          />
        </div>
      </div>

      <ResumeWidget />
      <YouTubeWidget />
      <BlueskyWidget />
      <RecommendedResearchers />
      <MetMuseumWidget />
      <WeatherWidget />
      <AnalyticsWidget />
      <HDXWidget />
      <BlueskyArchiveWidget />
    </aside>
  );
}
