import { asArray, count, getJson, isRecord, text } from '@/lib/http';

/**
 * The repositories on my GitHub account, as the projects page shows them.
 *
 * Wire shape in, `Project` out: `html_url`, `stargazers_count` and
 * `forks_count` stop at this file, so the module that renders a card never
 * spells another service's field name.
 */

export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
};

const REPOS = 'https://api.github.com/users/myself-aas/repos?sort=updated';

function toProject(repo: unknown): Project {
  const fields = isRecord(repo) ? repo : {};
  const id = count(fields.id);
  const name = text(fields.name);

  return {
    id,
    name,
    description: text(fields.description),
    url: text(fields.html_url, `https://github.com/myself-aas/${name}`),
    homepage: text(fields.homepage) || null,
    stars: count(fields.stargazers_count),
    forks: count(fields.forks_count),
    language: text(fields.language),
    topics: asArray(fields.topics).map((topic) => text(topic)).filter(Boolean),
  };
}

export async function loadProjects(signal: AbortSignal): Promise<Project[]> {
  const payload = await getJson(REPOS, signal);
  return asArray(payload)
    .filter(isRecord)
    .map(toProject)
    .filter((project) => project.name !== '');
}
