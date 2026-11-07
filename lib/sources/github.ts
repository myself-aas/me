import { asArray, count, getJson, isRecord, text } from '@/lib/http';

/**
 * The repositories and live showcase web applications.
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
  isLive?: boolean;
  liveUrl?: string;
  domainName?: string;
};

export const FEATURED_LIVE_PROJECTS: Project[] = [
  {
    id: 9901,
    name: 'HazardNet',
    description: 'Real-time agro-meteorological hazard monitoring, early warning system, and climate risk assessment platform for agricultural resilience.',
    url: 'https://github.com/myself-aas/HazardNet',
    homepage: 'https://hazardnet.live',
    stars: 28,
    forks: 5,
    language: 'TypeScript',
    topics: ['Agro-Meteorology', 'Hazard Monitoring', 'Climate AI', 'Real-Time Alert'],
    isLive: true,
    liveUrl: 'https://hazardnet.live',
    domainName: 'hazardnet.live',
  },
  {
    id: 9902,
    name: 'CatalystLab',
    description: 'AI-powered research brainstorming and parallel literature discovery platform for computer vision, agro-meteorology & machine learning.',
    url: 'https://github.com/myself-aas/CatalystLab',
    homepage: 'https://catalystlab.tech',
    stars: 34,
    forks: 8,
    language: 'TypeScript',
    topics: ['AI Research', 'Literature Discovery', 'LLM Pipeline', 'Next.js'],
    isLive: true,
    liveUrl: 'https://catalystlab.tech',
    domainName: 'catalystlab.tech',
  },
  {
    id: 9903,
    name: 'ResearchWithMe',
    description: 'Open collaborative research platform bridging computer vision algorithms, field datasets, and smallholder precision farming tools.',
    url: 'https://github.com/myself-aas/researchwithme',
    homepage: 'https://researchwith.me',
    stars: 22,
    forks: 4,
    language: 'TypeScript',
    topics: ['Open Science', 'Precision Agriculture', 'Collaboration', 'Edge AI'],
    isLive: true,
    liveUrl: 'https://researchwith.me',
    domainName: 'researchwith.me',
  },
  {
    id: 9904,
    name: 'SmartHerbo',
    description: 'Privacy-first, on-device hybrid neural-biometric system for precision bovine live-weight estimation and metabolic nutritional scaling.',
    url: 'https://github.com/myself-aas/Smart-Herbo',
    homepage: 'https://smartherbo.vercel.app',
    stars: 42,
    forks: 11,
    language: 'Kotlin / Python',
    topics: ['Animal Biometrics', 'HEART-Net', 'TFLite', 'Precision Agriculture'],
    isLive: true,
    liveUrl: 'https://smartherbo.vercel.app',
    domainName: 'smartherbo.vercel.app',
  },
];

const REPOS = 'https://api.github.com/users/myself-aas/repos?sort=updated';

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toProject(repo: unknown): Project {
  const fields = isRecord(repo) ? repo : {};
  const id = count(fields.id);
  const name = text(fields.name);
  const homepageUrl = text(fields.homepage) || null;

  // Match against featured live projects
  const matchedLive = FEATURED_LIVE_PROJECTS.find(
    (lp) =>
      normalizeName(lp.name) === normalizeName(name) ||
      (homepageUrl && homepageUrl.toLowerCase().includes(lp.domainName || ''))
  );

  return {
    id: id || matchedLive?.id || Math.floor(Math.random() * 10000),
    name: matchedLive?.name || name,
    description: matchedLive?.description || text(fields.description),
    url: text(fields.html_url, `https://github.com/myself-aas/${name}`),
    homepage: matchedLive?.liveUrl || homepageUrl,
    stars: count(fields.stargazers_count) || matchedLive?.stars || 0,
    forks: count(fields.forks_count) || matchedLive?.forks || 0,
    language: text(fields.language) || matchedLive?.language || 'TypeScript',
    topics:
      asArray(fields.topics).map((topic) => text(topic)).filter(Boolean).length > 0
        ? asArray(fields.topics).map((topic) => text(topic)).filter(Boolean)
        : matchedLive?.topics || [],
    isLive: Boolean(matchedLive || homepageUrl),
    liveUrl: matchedLive?.liveUrl || homepageUrl || undefined,
    domainName: matchedLive?.domainName || undefined,
  };
}

export async function loadProjects(signal: AbortSignal): Promise<Project[]> {
  try {
    const payload = await getJson(REPOS, signal);
    const apiProjects = asArray(payload)
      .filter(isRecord)
      .map(toProject)
      .filter((project) => project.name !== '');

    // Merge featured live projects to guarantee live project visibility
    const mergedMap = new Map<string, Project>();

    // Put featured live projects first
    for (const liveProj of FEATURED_LIVE_PROJECTS) {
      mergedMap.set(normalizeName(liveProj.name), liveProj);
    }

    // Overlay API project data (like live stars/forks)
    for (const apiProj of apiProjects) {
      const norm = normalizeName(apiProj.name);
      if (mergedMap.has(norm)) {
        const existing = mergedMap.get(norm)!;
        mergedMap.set(norm, {
          ...existing,
          stars: Math.max(existing.stars, apiProj.stars),
          forks: Math.max(existing.forks, apiProj.forks),
          url: apiProj.url || existing.url,
        });
      } else {
        mergedMap.set(norm, apiProj);
      }
    }

    return Array.from(mergedMap.values());
  } catch (err) {
    console.warn('Failed to load GitHub projects, falling back to featured live projects:', err);
    return FEATURED_LIVE_PROJECTS;
  }
}
