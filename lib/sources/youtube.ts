import { asArray, getJson, isRecord, text } from '@/lib/http';

/**
 * The three newest uploads on the channel, through the RSS bridge.
 */

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

const CHANNEL_ID = 'UC7jrEOTQeD1s0VLJ8Y5jaSQ';
const FEED = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function loadVideos(signal: AbortSignal): Promise<Video[]> {
  const payload = await getJson(FEED, signal);

  return asArray(isRecord(payload) ? payload.items : undefined)
    .filter(isRecord)
    .slice(0, 3)
    .map((item) => ({
      id: text(item.guid),
      title: text(item.title),
      url: text(item.link),
      thumbnail: text(item.thumbnail),
    }))
    .filter((video) => video.url !== '');
}
