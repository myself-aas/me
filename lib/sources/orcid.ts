import { asArray, isRecord, text } from '@/lib/http';

/**
 * The whole ORCID record's works, flattened to the fields a publication card
 * needs.
 *
 * ORCID answers with `group[].work-summary[].title.title.value` and friends;
 * that nesting stops here, and so do its type slugs (`journal-article` and
 * sixteen others). Everything the record holds is returned — there is no
 * filter on type, year or visibility beyond what ORCID itself returns.
 *
 * This file shapes data and holds no fetch: ORCID sends no CORS headers, so
 * the read has to happen on the server, at build time (see `lib/orcid-record.ts`).
 */

export const ORCID_ID = '0009-0003-5734-1519';
export const ORCID_PROFILE = `https://orcid.org/${ORCID_ID}`;

export type Publication = {
  title: string;
  year: string;
  /** A label fit for a filter, e.g. "Journal article". */
  type: string;
  source: string;
  url: string;
  doi?: string;
  authors?: string;
  impactFactor?: number;
  /** Last time the ORCID entry changed, for ordering entries with no year. */
  updated?: string;
  putCode?: number;
};

/** ORCID work types, as the record writes them, in words. */
const TYPE_LABELS: Record<string, string> = {
  'annotation': 'Annotation',
  'book': 'Book',
  'book-chapter': 'Book chapter',
  'conference-paper': 'Conference paper',
  'conference-abstract': 'Conference abstract',
  'data-set': 'Dataset',
  'dictionary-entry': 'Dictionary entry',
  'dissertation': 'Dissertation',
  'edited-book': 'Edited book',
  'encyclopedia-entry': 'Encyclopedia entry',
  'invention': 'Invention',
  'journal-article': 'Journal article',
  'lecture-speech': 'Lecture',
  'license': 'Licence',
  'magazine-article': 'Magazine article',
  'manual': 'Manual',
  'manuscript': 'Manuscript',
  'musical-score': 'Musical score',
  'newsletter-article': 'Newsletter article',
  'newspaper-article': 'Newspaper article',
  'online-resource': 'Online resource',
  'other': 'Other',
  'patent': 'Patent',
  'physical-object': 'Physical object',
  'preprint': 'Preprint',
  'registered-copyright': 'Registered copyright',
  'report': 'Report',
  'research-technique': 'Research technique',
  'research-tool': 'Research tool',
  'software': 'Software',
  'spin-off-company': 'Spin-off company',
  'standards-and-policy': 'Standard or policy',
  'supervised-student-publication': 'Supervised student publication',
  'technical-standard': 'Technical standard',
  'test': 'Test',
  'translation': 'Translation',
  'trademark': 'Trademark',
  'website': 'Website',
  'works-license': 'Works licence',
};

export function typeLabel(type: string): string {
  return TYPE_LABELS[type] ?? (type ? type.replace(/-/g, ' ') : 'Work');
}

type Fields = Record<string, unknown>;

function record(value: unknown): Fields {
  return isRecord(value) ? value : {};
}

function nested(value: unknown, ...keys: string[]): unknown {
  let current = value;
  for (const key of keys) current = record(current)[key];
  return current;
}

function doiOf(summary: Fields): string {
  const entries = asArray(nested(summary, 'external-ids', 'external-id')).map(record);
  const doi = entries.find((entry) => entry['external-id-type'] === 'doi');
  if (doi) return text(doi['external-id-value']);
  const ssrn = entries.find((entry) => entry['external-id-type'] === 'ssrn');
  if (ssrn) return text(ssrn['external-id-value']);
  return '';
}

const JOURNAL_IMPACT_FACTORS: Record<string, number> = {
  'smart agricultural technology': 7.2,
  'smart agric. technol.': 7.2,
  'computers and electronics in agriculture': 7.7,
  'precision agriculture': 5.4,
  'remote sensing of environment': 11.1,
};

export function getJournalImpactFactor(journalTitle?: string): number {
  if (!journalTitle) return 0;
  const normalized = journalTitle.toLowerCase().trim();
  return JOURNAL_IMPACT_FACTORS[normalized] || 0;
}

/**
 * One work. A group can carry several summaries of the same work; the richest
 * one — a DOI, then an external URL — wins, because that is the one a reader
 * can follow.
 */
function toPublication(summary: Fields): Publication | null {
  const title = text(nested(summary, 'title', 'title', 'value')).trim();
  if (!title) return null;

  const doi = doiOf(summary);
  const externalUrl = text(nested(summary, 'url', 'value'));
  const path = text(summary.path);
  const year = text(nested(summary, 'publication-date', 'year', 'value'));
  const putCode = typeof summary['put-code'] === 'number' ? summary['put-code'] : undefined;
  // `last-modified-date` arrives as epoch milliseconds, the rest as ISO strings.
  const modified = nested(summary, 'last-modified-date', 'value');
  const journalSource = text(nested(summary, 'journal-title', 'value'), 'ORCID record');

  return {
    title,
    year: year || 'Undated',
    type: typeLabel(text(summary.type)),
    source: journalSource,
    url:
      externalUrl ||
      (doi ? `https://doi.org/${doi}` : path ? `https://orcid.org${path}` : ORCID_PROFILE),
    doi: doi || undefined,
    impactFactor: getJournalImpactFactor(journalSource),
    putCode,
    updated:
      typeof modified === 'number'
        ? new Date(modified).toISOString()
        : text(modified) || undefined,
  };
}

function score(summary: Fields): number {
  return (doiOf(summary) ? 2 : 0) + (text(nested(summary, 'url', 'value')) ? 1 : 0);
}

function bestSummary(group: unknown): Fields | null {
  const summaries = asArray(record(group)['work-summary']).map(record);
  if (summaries.length === 0) return null;
  return summaries.reduce((best, candidate) => (score(candidate) > score(best) ? candidate : best));
}

/** Turn an ORCID `/works` payload into publications, one per work, in record order. */
export function parseWorks(payload: unknown): Publication[] {
  const groups = asArray(isRecord(payload) ? payload.group : undefined);
  const works: Publication[] = [];
  const seen = new Set<string>();

  for (const group of groups) {
    const summary = bestSummary(group);
    if (!summary) continue;

    const publication = toPublication(summary);
    if (!publication) continue;

    const key = publication.title.toLowerCase().replace(/\s+/g, ' ').trim();
    if (seen.has(key)) continue;
    seen.add(key);
    works.push(publication);
  }

  return works;
}
