import localFont from 'next/font/local';

/** Source Serif 4 carries headings and running text; the opsz axis does the display work. */
export const serif = localFont({
  // Roman only: the one italic line on the site is a fallback message, and the
  // browser can slant the roman face for it.
  src: [{ path: '../public/fonts/source-serif-opsz.woff2', style: 'normal', weight: '200 900' }],
  variable: '--font-source-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

/** IBM Plex Sans carries navigation, labels and data rows. */
export const sans = localFont({
  src: [{ path: '../public/fonts/plex-sans.woff2', style: 'normal', weight: '100 700' }],
  variable: '--font-plex-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
