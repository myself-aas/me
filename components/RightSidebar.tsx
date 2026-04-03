'use client';

import { useEffect, useState } from 'react';
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
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatPostText } from '@/lib/utils/text';

// --- Bluesky Widget ---
const BlueskyWidget = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const HANDLE = "meaas.bsky.social";

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=5`);
        const data = await res.json();
        if (data.feed) {
          // Filter out replies
          setPosts(data.feed.filter((f: any) => !f.reply).slice(0, 3));
        }
      } catch (err) {
        console.error('Bluesky API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (posts.length === 0) return null;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4 border border-blue-100/20 dark:border-blue-900/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <TrendingUp className="w-4 h-4" /> Latest Updates
        </h3>
        <a href={`https://bsky.app/profile/${HANDLE}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-3 h-3 text-gray-400 hover:text-blue-500" />
        </a>
      </div>
      <div className="space-y-3">
        {posts.map((item: any) => {
          const p = item.post;
          const date = new Date(p.record.createdAt).toLocaleDateString();
          return (
            <div key={p.cid} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 last:pb-0">
              <p className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-2 mb-1">
                {formatPostText(p.record.text)}
              </p>
              <div className="flex items-center justify-between text-[9px] text-gray-400">
                <span>{date}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-2 h-2" /> {p.replyCount || 0}</span>
              </div>
            </div>
          );
        })}
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
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYouTube = async () => {
      try {
        // Replace with your actual Channel ID. You can find it in your YouTube channel URL.
        const CHANNEL_ID = 'UC7jrEOTQeD1s0VLJ8Y5jaSQ'; 
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
        const data = await res.json();
        if (data.items) {
          setVideos(data.items.slice(0, 3));
        }
      } catch (err) {
        console.error('YouTube API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchYouTube();
  }, []);

  if (loading) return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (videos.length === 0) return null;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h3 className="font-bold text-sm mb-3">YouTube Content</h3>
      <div className="space-y-3">
        {videos.map(video => (
          <a 
            key={video.guid} 
            href={video.link}
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
  const [artwork, setArtwork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // 1. Search for objects
        const searchRes = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true');
        const searchData = await searchRes.json();
        if (!searchData.objectIDs) return;
        const randomId = searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];

        // 2. Get details
        const objRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
        const objData = await objRes.json();
        setArtwork(objData);
      } catch (err) {
        console.error('Met API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, []);

  if (loading) return <div className="animate-pulse h-48 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (!artwork || !artwork.primaryImageSmall) return null;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h3 className="font-bold text-sm mb-3">Met Museum Spotlight</h3>
      <div className="relative w-full h-40 mb-3">
        <Image 
          src={artwork.primaryImageSmall} 
          alt={artwork.title} 
          fill 
          className="rounded-xl object-cover"
        />
      </div>
      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{artwork.title}</p>
      <p className="text-[10px] text-gray-500">{artwork.artistDisplayName || 'Unknown Artist'}</p>
    </div>
  );
};

// --- Weather Widget (Open-Meteo) ---
const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    console.log('Fetching weather...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          if (!res.ok) throw new Error('Failed to fetch weather');
          const data = await res.json();
          setWeather(data.current_weather);
        } catch (err) {
          console.error('Error fetching weather:', err);
          setError('Failed to fetch weather');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied');
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div className="animate-pulse h-24 bg-white/20 dark:bg-black/20 rounded-2xl mb-4 backdrop-blur-sm" />;
  if (error) return (
    <div className="p-4 bg-white/20 dark:bg-black/20 rounded-2xl mb-4 text-xs text-gray-500 flex items-center gap-2 backdrop-blur-sm border border-white/10">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm">Weather</h3>
        <Cloud className="w-4 h-4 text-blue-500" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{weather.temperature}°C</span>
        <div className="text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Local
          </div>
          <div>Wind: {weather.windspeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

// --- HDX Widget (Humanitarian Data Exchange) ---
const HDXWidget = () => {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHDX = async () => {
      console.log('Fetching HDX data...');
      try {
        // Fetching recent datasets from HDX CKAN API
        const res = await fetch('https://data.humdata.org/api/3/action/package_search?rows=3');
        if (!res.ok) throw new Error('Failed to fetch HDX data');
        const data = await res.json();
        setDatasets(data.result.results);
      } catch (err) {
        console.error('HDX API error:', err);
        setError('Could not load data');
      } finally {
        setLoading(false);
      }
    };
    fetchHDX();
  }, []);

  if (error) return null;

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">Humanitarian Data</h3>
        <Globe className="w-4 h-4 text-orange-500" />
      </div>
      <div className="space-y-3">
        {loading ? (
          [1, 2].map(i => <div key={i} className="h-10 bg-white/20 dark:bg-black/20 rounded animate-pulse backdrop-blur-sm" />)
        ) : (
          datasets.map(ds => (
            <a 
              key={ds.id} 
              href={`https://data.humdata.org/dataset/${ds.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="text-[11px] font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                {ds.title}
              </div>
              <div className="text-[10px] text-gray-500 flex items-center gap-1">
                <Activity className="w-3 h-3" /> {ds.organization.title}
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
        <h3 className="font-bold text-sm">Site Analytics</h3>
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
      <h3 className="font-bold text-sm mb-4 tracking-tight">Recommended Researchers</h3>
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
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const HANDLE = "meaas.bsky.social";

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=30`);
        const data = await res.json();
        if (data.feed) {
          // Filter out replies
          setPosts(data.feed.filter((f: any) => !f.reply));
        }
      } catch (err) {
        console.error('Bluesky API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) return <div className="animate-pulse h-64 bg-white/20 dark:bg-black/20 rounded-2xl mb-4" />;
  if (posts.length === 0) return null;

  const blogPosts = posts.filter(p => p.post.record.text.includes('#blog')).slice(0, 2);
  const mediaPosts = posts.filter(p => p.post.embed?.images).slice(0, 2);
  const threadPosts = posts.slice(0, 2);

  const renderMiniPost = (p: any) => (
    <div key={p.cid} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 last:pb-0">
      <p className="text-[10px] text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
        {formatPostText(p.record.text)}
      </p>
    </div>
  );

  return (
    <div className="p-4 glass-card rounded-2xl mb-4">
      <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-500" /> Research Archive
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Threads</h4>
          <div className="space-y-2">
            {threadPosts.map(item => renderMiniPost(item.post))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Blogs</h4>
          <div className="space-y-2">
            {blogPosts.map(item => renderMiniPost(item.post))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Gallery</h4>
          <div className="space-y-2">
            {mediaPosts.map(item => renderMiniPost(item.post))}
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
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/20 dark:border-white/10 rounded-xl bg-white/40 dark:bg-black/40 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-md"
            placeholder="Search Portfolio"
          />
        </div>
      </div>

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
