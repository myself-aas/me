export interface SocialProfile {
  id: string;
  name: string;
  handle: string;
  url: string;
  category: 'research' | 'code' | 'social';
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@myself-aas',
    url: 'https://github.com/myself-aas',
    category: 'code',
  },
  {
    id: 'scholar',
    name: 'Google Scholar',
    handle: 'Ashif Ahmed Shuvo',
    url: 'https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en',
    category: 'research',
  },
  {
    id: 'researchgate',
    name: 'ResearchGate',
    handle: 'Ashif Shuvo',
    url: 'https://www.researchgate.net/profile/Ashif-Shuvo',
    category: 'research',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    handle: '@ashifahmedshuvo',
    url: 'https://www.kaggle.com/ashifahmedshuvo',
    category: 'code',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    handle: '@me-aas',
    url: 'https://huggingface.co/me-aas',
    category: 'code',
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: '@me_aas',
    url: 'https://discord.com',
    category: 'social',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Ashif Ahmed Shuvo',
    url: 'https://www.linkedin.com/in/me-aas',
    category: 'social',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@myself_aas',
    url: 'https://x.com/myself_aas',
    category: 'social',
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    handle: '@myself-aas.bsky.social',
    url: 'https://bsky.app/profile/myself-aas.bsky.social',
    category: 'social',
  },
  {
    id: 'orcid',
    name: 'ORCID',
    handle: '0009-0003-5734-1519',
    url: 'https://orcid.org/0009-0003-5734-1519',
    category: 'research',
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'shuvo.1807016@bau.edu.bd',
    url: 'mailto:shuvo.1807016@bau.edu.bd',
    category: 'social',
  },
];
