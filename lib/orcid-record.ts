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
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let works: Publication[] = [];
  try {
    const payload = await getJson(WORKS_ENDPOINT, AbortSignal.timeout(15_000), { headers });
    works = parseWorks(payload);
  } catch (error) {
    if (token) {
      console.warn('[orcid] token read refused, retrying anonymously:', error);
      const payload = await getJson(WORKS_ENDPOINT, AbortSignal.timeout(15_000), {
        headers: { Accept: 'application/json' },
      });
      works = parseWorks(payload);
    } else {
      throw error;
    }
  }

  // Attempt to enrich author/contributor information for each work from ORCID public record
  try {
    const enriched = await Promise.all(
      works.map(async (work) => {
        if (!work.putCode) return work;
        try {
          const detailUrl = `https://pub.orcid.org/v3.0/${ORCID_ID}/work/${work.putCode}`;
          const detail = await getJson(detailUrl, AbortSignal.timeout(8_000), {
            headers: { Accept: 'application/json' },
          });
          const contributors = (detail as Record<string, any>)?.contributors?.contributor || [];
          const seen = new Set<string>();
          const names: string[] = [];
          for (const c of contributors) {
            const name = c?.['credit-name']?.value?.trim();
            if (name && !seen.has(name.toLowerCase())) {
              seen.add(name.toLowerCase());
              names.push(name);
            }
          }
          if (names.length > 0) {
            return { ...work, authors: names.join(', ') };
          }
        } catch {
          // If individual detail fetch fails or times out, proceed with base summary
        }
        return work;
      })
    );
    return enriched;
  } catch (enrichError) {
    console.warn('[orcid] error during contributor enrichment:', enrichError);
    return works;
  }
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
