import { SITE_DESCRIPTION, SITE_TITLE } from '../seo.ts';
import {
  collectionPageSchema,
  contactPageSchema,
  personSchema,
  profilePageSchema,
} from '../schema.ts';

/** Inline link inside an intro paragraph. */
export type CopyLink = { href: string; label: string };

/** One intro paragraph: a plain string, or a run of text and links. */
export type CopyParagraph = string | (string | CopyLink)[];

/**
 * The single module per route: everything this repo knows about a page that is
 * not how it renders. Readers are `pageMetadata`, `app/sitemap.ts`, the page's
 * own route module and the page's content module.
 */
export type PageRecord = {
  /** Route below the `/me` base path. */
  path: string;
  /** Full document title, brand first: `Ashif Ahmed Shuvo | …`. */
  title: string;
  /** Meta description, 120–160 characters, unique across the site. */
  description: string;
  /** Visible `<h1>`. Home is the exception: its heading lives in the Hero. */
  heading: string;
  /** Optional line under the heading. */
  subheading?: string;
  /** Prose between heading and data. */
  intro?: CopyParagraph[];
  /** JSON-LD nodes for this route; site-wide nodes live in the root layout. */
  schema?: unknown[];
};

export const PAGES: Record<string, PageRecord> = {
  '/': {
    path: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    heading: 'Ashif Ahmed Shuvo',
  },

  '/about': {
    path: '/about',
    title: 'Ashif Ahmed Shuvo | About Me & My Research',
    description:
      'About Ashif Ahmed Shuvo: a food engineer turned AI researcher, pursuing an M.Sc. in AgroMeteorology at Bangladesh Agricultural University.',
    heading: 'About My Journey',
    schema: [profilePageSchema, personSchema],
  },

  '/thoughts': {
    path: '/thoughts',
    title: 'Ashif Ahmed Shuvo | Thoughts & Notes',
    description:
      'Longer notes, technical write-ups, and ongoing personal thoughts on field computer vision, agro-meteorology, and applied machine learning.',
    heading: 'Thoughts',
    subheading: 'Essays, field notes, and technical write-ups written in Markdown',
    intro: [
      'A collection of longer-form technical writing, field essays, and architectural reflections. Whereas papers follow the rigorous constraints of peer review and social media posts capture fleeting day-to-day moments, these thoughts dive into the messy realities of agricultural AI, hardware trade-offs, and empirical discoveries.',
      'Written as Markdown files directly in the repository, each piece explores problems encountered while developing models that survive outdoors under tropical sun, canopy shadows, and edge compute limits.',
    ],
  },

  '/skills': {
    path: '/skills',
    title: 'Ashif Ahmed Shuvo | Skills & Tech Stack',
    description:
      'Technical skills of Ashif Ahmed Shuvo: Python and PyTorch, computer vision architectures, statistical analysis, cloud ML and precision agriculture tooling.',
    heading: 'Technical Skills',
    subheading: 'Comprehensive toolkit across AI, Agriculture, and Software Engineering',
    intro: [
      'This is the toolbox rather than a claim of mastery: nine groups covering the languages I write, the architectures I have trained, the libraries I reach for first, the statistics behind the results, and the domain knowledge that makes the models useful in a field instead of a notebook.',
      'Python and PyTorch carry most of the modelling work, with R for the analysis and reporting that journals expect. The vision stack is deliberately broad, from U-Net and DeepLabV3+ for segmentation through Swin and Vision Transformers to plain ResNet baselines, because a simple model that trains on a small labelled set often beats an elegant one that needs ten times the annotations. Each list also names the libraries I have actually shipped with, not the ones I have merely read about.',
      [
        'On the domain side: near infrared spectroscopy, remote sensing indices, agrometeorological variables and the IoT hardware that collects them. I list the specific instruments and tools below each category so that a reviewer can check a claim rather than take the summary at face value. Select a category to see the full list, the way I would describe it to a collaborator who asked what I can actually finish on my own. If you want to see the work these skills produced, start with the ',
        { href: '/publications', label: 'publications' },
        ' and ',
        { href: '/experience', label: 'experience' },
        ' pages.',
      ],
    ],
  },

  '/experience': {
    path: '/experience',
    title: 'Ashif Ahmed Shuvo | Experience & Education',
    description:
      'Professional experience and education of Ashif Ahmed Shuvo, covering research assistantships, industry programmes and certificates of completion.',
    heading: 'Experience & Education',
    intro: [
      'A chronological view of where the work has been done. On the research side that means agricultural engineering and agrometeorology at Bangladesh Agricultural University, long days in the field with instruments under a Bangladesh summer, and the modelling that turns those readings into something a grower or a research station can act on.',
      'The industry entries come from structured programmes run with employers such as British Airways and Accenture, where the tasks were commercial rather than academic: cleaning messy spreadsheets, building a model against a deadline, and explaining the result to people who would never read the code. Each entry with a certificate links to the issuer’s own PDF so a claim can be checked without taking my word for it.',
      [
        'The education column lists the degrees in progress and completed, from the B.Sc. in Food Engineering through the current M.Sc. in AgroMeteorology. For what came out of that work, see the ',
        { href: '/publications', label: 'publications page' },
        '; for the tools used to produce it, the ',
        { href: '/skills', label: 'skills page' },
        '.',
      ],
    ],
  },

  '/projects': {
    path: '/projects',
    title: 'Ashif Ahmed Shuvo | Projects & Open Source Code',
    description:
      'Open-source projects and research code by Ashif Ahmed Shuvo, loaded live from GitHub with languages, topics, stars and repository links.',
    heading: 'Featured Projects',
    subheading: 'Open source contributions and personal projects',
    intro: [
      'Everything listed here is public code. The cards are loaded live from the GitHub API when the page opens, so the list reflects whatever was pushed most recently rather than a snapshot that goes stale: stars, forks, primary language and topics all come straight from each repository record.',
      'The work clusters around applied machine learning for agriculture and the tooling that supports it. You will find segmentation and detection experiments for crop and disease recognition, notebooks that walk through a dataset or a training run, small utilities for sensor and weather data, and this website itself, which is a Next.js static export deployed to GitHub Pages.',
      'Each card shows the language GitHub reports as primary, which is not always the language the interesting part is written in: a Python training script can sit behind a TypeScript demo. Where a repository has a paper or a write-up attached, the description links to it. Repositories that are archived or no longer maintained stay in the list so the record is complete, but the card will show the last push date.',
      [
        'Use the search field to filter by repository name or description, or pick a language to narrow the list. Selecting a card opens the full description, topics and links to the repository and its homepage. If a project looks relevant to something you are working on, the ',
        { href: '/contact', label: 'contact page' },
        ' is the fastest way to reach me, and the ',
        { href: '/publications', label: 'publications page' },
        ' covers the peer-reviewed side of the same work.',
      ],
    ],
    schema: [
      collectionPageSchema(
        '/projects',
        'Projects by Ashif Ahmed Shuvo',
        'Open-source research code and side projects, fetched live from GitHub.',
      ),
    ],
  },

  '/publications': {
    path: '/publications',
    title: 'Ashif Ahmed Shuvo | Publications',
    description:
      'Publications and writings by Ashif Ahmed Shuvo on precision agriculture, NIR spectroscopy and applied machine learning, with abstracts and impact factors.',
    heading: 'Publications & Writings',
    subheading: 'Automatically synced with ORCID (0009-0003-5734-1519)',
    intro: [
      'This list is mirrored from my public ORCID record, so it matches what a search committee or journal editor would find if they looked me up there. Each entry carries the citation, the venue, the year and, where the journal reports one, the impact factor.',
      'The work sits at the meeting point of food engineering, agrometeorology and machine learning: near infrared and spectral methods for quality assessment, computer vision for crop and plant phenotyping, and statistical modelling of environmental data that affects what a field actually yields. Several entries are conference papers or preprints, which is normal for a field that moves faster than a journal cycle.',
      'Impact factor is a property of the journal, not of the paper, so treat that column as a rough signal of reach rather than a measure of quality; several of the smaller venues are the more interesting reads. Conference entries usually have a DOI but no volume or issue, which is why those fields are blank. Preprints are labelled as such and may later appear under a different venue.',
      [
        'Filter by publication type or year when you are looking for something specific, or sort by impact factor when you want the most cited venues first. If a paper is paywalled and you need a copy for review, ask through the ',
        { href: '/contact', label: 'contact page' },
        ' and I will send the accepted manuscript. The code behind most of these results is on the ',
        { href: '/projects', label: 'projects page' },
        '.',
      ],
    ],
    schema: [
      collectionPageSchema(
        '/publications',
        'Publications by Ashif Ahmed Shuvo',
        'Peer-reviewed publications and writings on precision agriculture, spectroscopy and applied machine learning.',
      ),
    ],
  },

  '/feed': {
    path: '/feed',
    title: 'Ashif Ahmed Shuvo | Research Feed',
    description:
      'Short research updates from Ashif Ahmed Shuvo on computer vision, remote sensing and sustainable agriculture, published through Bluesky.',
    heading: 'Research Feed',
    subheading: 'Short updates, notes and links, published first on Bluesky.',
    intro: [
      'A project rarely arrives as a finished paper. Between submissions there are experiments that failed, figures worth keeping, datasets that behaved differently than expected and papers from other groups worth passing on. This page collects those notes in the order they were posted, pulled live from the public Bluesky API, so it doubles as a log of what the week actually looked like, mistakes included.',
      'Threads tagged as blog posts walk through a problem and how I approached it, usually with a chart or a sample image from the model under test. The visual gallery collects posts that carry media, which is the quickest way to see what the computer vision work actually looks like on real field photographs: dusty leaves, uneven shade, overlapping canopy and all the noise a clean benchmark dataset leaves out. When a post names a number, treat it as provisional until the code is published.',
      [
        'Nothing here is peer reviewed, and early results can change once more folds of data are added. Anything that survives review ends up on the ',
        { href: '/publications', label: 'publications page' },
        ' instead; the code behind an experiment usually lands on the ',
        { href: '/projects', label: 'projects page' },
        '. Posts are unlisted and unfiltered, so a passing note about a conference deadline sits next to a chart from a model run; that is deliberate, since the timeline is more honest than a curated highlights page. If a thread raises a question, reply to it there, or send a message through the ',
        { href: '/contact', label: 'contact form' },
        '.',
      ],
    ],
    schema: [
      collectionPageSchema(
        '/feed',
        'Research feed of Ashif Ahmed Shuvo',
        'Short research updates, notes and links published through Bluesky.',
      ),
    ],
  },

  '/contact': {
    path: '/contact',
    title: 'Ashif Ahmed Shuvo | Contact & Collaboration',
    description:
      'Contact Ashif Ahmed Shuvo about research collaborations, PhD opportunities, speaking or data work. Send a message with the contact form.',
    heading: 'Get in Touch',
    intro: ['Have a question or want to work together? Send me a message.'],
    schema: [contactPageSchema],
  },

  '/accessibility': {
    path: '/accessibility',
    title: 'Ashif Ahmed Shuvo | Accessibility',
    description:
      'Accessibility commitments behind this portfolio: WCAG 2.1 AA targets, keyboard and screen reader support, and how to report a barrier you hit.',
    heading: 'Accessibility',
    intro: [
      'This portfolio is a working notebook as much as a calling card, so it should be usable by everyone who arrives at it. I aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, the standard most public institutions and universities are held to.',
    ],
  },

  '/privacy': {
    path: '/privacy',
    title: 'Ashif Ahmed Shuvo | Privacy Policy',
    description:
      'How this portfolio handles personal data: what the contact form collects, how third-party embeds behave, and how to request access or deletion.',
    heading: 'Privacy Policy',
    intro: [
      'This portfolio is a personal site with one interactive feature, so its privacy story is deliberately short. What follows describes exactly what is collected, who receives it and how to have it removed.',
    ],
  },

  '/cookies': {
    path: '/cookies',
    title: 'Ashif Ahmed Shuvo | Cookie Policy',
    description:
      'Which cookies and local storage this portfolio uses, what each one stores, how long it lasts, and how to clear or block them in your browser.',
    heading: 'Cookie Policy',
    intro: [
      'This page explains what this portfolio stores on your device, why each item exists, and how to remove it. There is no advertising network, no analytics suite and no tag manager here, so the list is short and you can read it in a minute.',
    ],
  },

  '/terms': {
    path: '/terms',
    title: 'Ashif Ahmed Shuvo | Terms of Service',
    description:
      'Terms of service for using the research portfolio of Ashif Ahmed Shuvo, including acceptable use, content licensing and liability limits.',
    heading: 'Terms of Service',
    intro: [
      'These terms describe how you may use this portfolio and the material published on it. By browsing the site you accept them; if you do not, please close the tab. They are written to be readable rather than adversarial.',
    ],
  },

  '/ads-info': {
    path: '/ads-info',
    title: 'Ashif Ahmed Shuvo | Advertising Policy',
    description:
      'Advertising and sponsorship policy for this portfolio: whether ads are served, how sponsored content is labelled, and how it affects editorial choices.',
    heading: 'Ads Info',
    intro: [
      'This website does not display third-party advertisements and does not run an ad network, an affiliate script or a retargeting pixel. There is nothing on the page that earns money from your attention while you read.',
    ],
  },
};

/** Every page record, in declaration order. Read by the sitemap and the guardrail. */
export const PAGE_LIST: PageRecord[] = Object.values(PAGES);
