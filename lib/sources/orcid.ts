import { asArray, getJson, text } from '@/lib/http';

/**
 * The ORCID record's works, flattened to the fields a publication card needs.
 * ORCID nests everything under `work-summary[0]` > `title.title.value`; that
 * nesting stops here.
 */

export type Publication = {
  title: string;
  year: string;
  url: string;
  source: string;
  authors?: string;
  impactFactor?: number;
  type?: string;
  doi?: string;
};

const ORCID_RECORD = 'https://pub.orcid.org/v3.0/0009-0003-5734-1519/works';

type Fields = Record<string, unknown>;

function record(value: unknown): Fields {
  return typeof value === 'object' && value !== null ? (value as Fields) : {};
}

function nested(value: unknown, ...keys: string[]): unknown {
  let current = value;
  for (const key of keys) current = record(current)[key];
  return current;
}

function toPublication(group: unknown): Publication | null {
  const summary = record(asArray(record(group)['work-summary'])[0]);
  if (Object.keys(summary).length === 0) return null;

  const externalIds = asArray(nested(summary, 'external-ids', 'external-id'));
  const doiEntry = externalIds
    .map(record)
    .find((entry) => entry['external-id-type'] === 'doi');
  const doi = doiEntry ? text(doiEntry['external-id-value']) : '';

  return {
    title: text(nested(summary, 'title', 'title', 'value'), 'Untitled'),
    year: text(nested(summary, 'publication-date', 'year', 'value'), 'Unknown'),
    url: text(nested(summary, 'url', 'value')) || (doi ? `https://doi.org/${doi}` : '#'),
    source: text(nested(summary, 'journal-title', 'value'), 'ORCID'),
    type: text(summary.type, 'Journal Article'),
    doi: doi || undefined,
    // ORCID does not publish an impact factor; the curated list fills it in.
    impactFactor: 0,
    authors: 'Ashif Ahmed Shuvo et al.',
  };
}

export async function loadWorks(signal: AbortSignal): Promise<Publication[]> {
  const payload = await getJson(ORCID_RECORD, signal, {
    headers: { Accept: 'application/json' },
  });

  return asArray(record(payload).group)
    .map(toPublication)
    .filter((publication): publication is Publication => publication !== null);
}
