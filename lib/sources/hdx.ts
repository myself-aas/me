import { asArray, getJson, isRecord, text } from '@/lib/http';

/**
 * The most recently updated datasets on the Humanitarian Data Exchange.
 */

export type Dataset = {
  id: string;
  name: string;
  title: string;
  organisation: string;
};

const RECENT = 'https://data.humdata.org/api/3/action/package_search?rows=3';

export async function loadDatasets(signal: AbortSignal): Promise<Dataset[]> {
  const payload = await getJson(RECENT, signal);
  const result = isRecord(payload) && isRecord(payload.result) ? payload.result : {};

  return asArray(result.results)
    .filter(isRecord)
    .map((dataset) => ({
      id: text(dataset.id),
      name: text(dataset.name),
      title: text(dataset.title),
      organisation: isRecord(dataset.organization) ? text(dataset.organization.title) : '',
    }))
    .filter((dataset) => dataset.name !== '');
}
