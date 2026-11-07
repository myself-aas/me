import { getJson } from '@/lib/http';
import { ORCID_ID, ORCID_PROFILE, parseWorks, type Publication } from '@/lib/sources/orcid';

/**
 * The ORCID record, read while the site is built.
 *
 * Three facts decide how this works:
 *
 * - ORCID sends no CORS headers, so the browser cannot call it. The read has to
 *   happen on the server, which for a static export means at build time.
 * - Public data needs no token. A *wrong* token is worse than none: ORCID
 *   answers 401, so the token is only sent when one is configured, and the read
 *   falls back to anonymous if it is refused.
 * - Anonymous reads are rate limited per address, which a build comfortably fits
 *   inside: one read per build.
 *
 * A build without network access is not a failed build. It produces the curated
 * list and says so on the page.
 */

export type OrcidRecord = {
  works: Publication[];
  /** When the record was read, ISO 8601, or null if it could not be read. */
  readAt: string | null;
  profile: string;
  id: string;
};

const WORKS_ENDPOINT = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

async function readWorks(): Promise<Publication[]> {
  const token = process.env.ORCID_ACCESS_TOKEN?.trim();

  if (token) {
    try {
      const payload = await getJson(WORKS_ENDPOINT, AbortSignal.timeout(15_000), {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
      return parseWorks(payload);
    } catch (error) {
      console.warn('[orcid] token read refused, retrying anonymously:', error);
    }
  }

  const payload = await getJson(WORKS_ENDPOINT, AbortSignal.timeout(15_000), {
    headers: { Accept: 'application/json' },
  });
  return parseWorks(payload);
}

export async function readOrcidRecord(): Promise<OrcidRecord> {
  const base = { profile: ORCID_PROFILE, id: ORCID_ID };

  try {
    const works = await readWorks();
    console.info(`[orcid] read ${works.length} works from ${ORCID_ID}`);
    return { ...base, works, readAt: new Date().toISOString() };
  } catch (error) {
    console.warn(`[orcid] could not read ${ORCID_ID} at build time:`, error);
    return { ...base, works: [], readAt: null };
  }
}
