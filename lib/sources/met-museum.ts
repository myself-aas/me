import { asArray, count, getJson, isRecord, text } from '@/lib/http';

/**
 * A random public-domain painting from the Met, for the sidebar spotlight.
 * The two-step search-then-object call is one read from the outside.
 */

export type Artwork = {
  title: string;
  artist: string;
  image: string;
};

const SEARCH =
  'https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true';

export async function loadArtwork(signal: AbortSignal): Promise<Artwork | null> {
  const search = await getJson(SEARCH, signal);
  const ids = asArray(isRecord(search) ? search.objectIDs : undefined)
    .map((id) => count(id))
    .filter((id) => id > 0);
  if (ids.length === 0) return null;

  const id = ids[Math.floor(Math.random() * ids.length)];
  const object = await getJson(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    signal,
  );

  const fields = isRecord(object) ? object : {};
  const image = text(fields.primaryImageSmall);
  if (!image) return null;

  return {
    title: text(fields.title, 'Untitled'),
    artist: text(fields.artistDisplayName, 'Unknown artist'),
    image,
  };
}
