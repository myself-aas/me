import type {Metadata, Viewport} from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';
import MainLayout from '@/components/MainLayout';
import JsonLd from '@/components/JsonLd';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/seo';
import { personSchema, websiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Ashif Ahmed Shuvo Portfolio',
  authors: [{ name: 'Ashif Ahmed Shuvo', url: SITE_URL }],
  creator: 'Ashif Ahmed Shuvo',
  publisher: 'Ashif Ahmed Shuvo',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://github.com/myself-aas.png',
    apple: 'https://github.com/myself-aas.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Ashif Ahmed Shuvo Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Ashif Ahmed Shuvo — AI and machine learning research portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd nodes={[personSchema, websiteSchema]} />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-black text-black dark:text-white" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
