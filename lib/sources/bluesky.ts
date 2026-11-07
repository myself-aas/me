import { asArray, count, getJson, isRecord, text } from '@/lib/http';

/**
 * My Bluesky posts, as the feed page and the sidebar both show them.
 *
 * One module owns what a post is: the XRPC envelope (`feed[].post.record`),
 * the reply filter, the image list, the permalink, and the two queries the
 * feed is built from. Three separate call sites used to re-derive all of it
 * from raw JSON.
 */

export const HANDLE = 'meaas.bsky.social';

export type Post = {
  uri: string;
  cid: string;
  /** The permalink on bsky.app, already assembled. */
  url: string;
  text: string;
  createdAt: string;
  author: { displayName: string; handle: string; avatar: string };
  images: Array<{ thumb: string; fullsize: string; alt: string }>;
  likeCount: number;
  repostCount: number;
  replyCount: number;
};

const AUTHOR_FEED = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=30`;

export function postUrl(uri: string): string {
  const id = uri.split('/').pop() ?? '';
  return `https://bsky.app/profile/${HANDLE}/post/${id}`;
}

/** Posts carrying a hashtag, e.g. `#blog`. */
export function postsWithTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.text.includes(tag));
}

/** Posts that carry at least one image. */
export function postsWithImages(posts: Post[]): Post[] {
  return posts.filter((post) => post.images.length > 0);
}

function toPost(item: unknown): Post | null {
  const entry = isRecord(item) ? item : {};
  // Replies are dropped: the feed is a record of what I published, not chatter.
  if (entry.reply) return null;

  const post = isRecord(entry.post) ? entry.post : {};
  const uri = text(post.uri);
  if (!uri) return null;

  const record = isRecord(post.record) ? post.record : {};
  const author = isRecord(post.author) ? post.author : {};
  const embed = isRecord(post.embed) ? post.embed : {};

  return {
    uri,
    cid: text(post.cid, uri),
    url: postUrl(uri),
    text: text(record.text),
    createdAt: text(record.createdAt),
    author: {
      displayName: text(author.displayName, HANDLE),
      handle: text(author.handle, HANDLE),
      avatar: text(author.avatar),
    },
    images: asArray(embed.images)
      .filter(isRecord)
      .map((image) => ({
        thumb: text(image.thumb),
        fullsize: text(image.fullsize),
        alt: text(image.alt),
      }))
      .filter((image) => image.thumb !== ''),
    likeCount: count(post.likeCount),
    repostCount: count(post.repostCount),
    replyCount: count(post.replyCount),
  };
}

export async function loadAuthorFeed(signal: AbortSignal): Promise<Post[]> {
  const payload = await getJson(AUTHOR_FEED, signal);
  return asArray(isRecord(payload) ? payload.feed : undefined)
    .map(toPost)
    .filter((post): post is Post => post !== null);
}
