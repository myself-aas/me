import type { Metadata } from 'next';

/**
 * Single source of truth for canonical URLs and social metadata.
 *
 * The site is published as a GitHub Pages project site, so every absolute URL
 * has to carry the `/me` base path.
 */
export const SITE_URL = 'https://myself-aas.github.io/me';
export const SITE_NAME = 'Ashif Ahmed Shuvo';
export const SITE_TITLE = 'Ashif Ahmed Shuvo | AI & ML Expert';
export const SITE_DESCRIPTION =
  'Research portfolio of Ashif Ahmed Shuvo, an AI and machine learning researcher working on computer vision, remote sensing and precision agriculture.';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = 'Ashif Ahmed Shuvo — AI and machine learning research portfolio';
export const CONTACT_EMAIL = 'shuvo.1807016@bau.edu.bd';

/** The part of a page record that decides a document's metadata. */
type PageIdentity = {
  /** Full document title, always prefixed with the site owner's name. */
  title: string;
  /** 120-160 characters, unique per page. */
  description: string;
  /** Route below the `/me` base path, e.g. `/about`. */
  path: string;
};

/**
 * Builds canonical, Open Graph and Twitter metadata from a page record, so the
 * record is the only place a title or description is written.
 */
export function pageMetadata({ title, description, path }: PageIdentity): Metadata {
  // Routes are exported with trailing slashes (see next.config.ts).
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: `${SITE_NAME} Portfolio`,
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
