import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from './seo.ts';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Shared `Person` entity: referenced by every page-level schema block. */
export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: 'https://github.com/myself-aas.png',
  jobTitle: 'AI & Machine Learning Researcher',
  description:
    'AI and machine learning researcher working on computer vision, remote sensing and data-driven precision agriculture.',
  email: `mailto:${CONTACT_EMAIL}`,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Bangladesh Agricultural University',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Computer Vision',
    'Precision Agriculture',
    'Remote Sensing',
    'Agrometeorology',
    'Deep Learning',
  ],
  sameAs: [
    'https://github.com/myself-aas',
    'https://www.linkedin.com/in/me-aas',
    'https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en',
    'https://orcid.org/0009-0003-5734-1519',
    'https://www.researchgate.net/profile/Ashif-Shuvo',
    'https://x.com/myself_aas',
    'https://www.kaggle.com/ashifahmedshuvo',
    'https://huggingface.co/me-aas',
    'https://bsky.app/profile/myself-aas.bsky.social',
    'https://discord.com',
  ],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: `${SITE_NAME} — Research Portfolio`,
  description:
    'Research portfolio of Ashif Ahmed Shuvo: publications, projects and updates on AI for sustainable agriculture.',
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

export const profilePageSchema = {
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/about#page`,
  url: `${SITE_URL}/about`,
  name: 'About Ashif Ahmed Shuvo',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
};

export const contactPageSchema = {
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#page`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Ashif Ahmed Shuvo',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    email: `mailto:${CONTACT_EMAIL}`,
  },
};

export const collectionPageSchema = (path: string, name: string, description: string) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${path}#page`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
});

/** Wraps one or more schema nodes into a single JSON-LD payload. */
export function jsonLdDocument(nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
