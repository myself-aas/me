import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: 'Ashif Ahmed Shuvo | AI & ML Expert',
  description: 'Portfolio of Ashif Ahmed Shuvo, Machine Learning Enthusiast specializing in precision and sustainable agriculture.',
  icons: {
    icon: 'https://github.com/myself-aas.png',
  },
  openGraph: {
    title: 'Ashif Ahmed Shuvo | AI & ML Expert',
    description: 'Portfolio of Ashif Ahmed Shuvo, Machine Learning Enthusiast specializing in precision and sustainable agriculture.',
    url: 'https://myself-aas.github.io/me/',
    siteName: 'Ashif Ahmed Shuvo Portfolio',
    images: [
      {
        url: 'https://ghchart.rshah.org/myself-aas.svg',
        width: 1200,
        height: 630,
        alt: 'Ashif Ahmed Shuvo GitHub Contribution Graph',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashif Ahmed Shuvo | AI & ML Expert',
    description: 'Portfolio of Ashif Ahmed Shuvo, Machine Learning Enthusiast specializing in precision and sustainable agriculture.',
    images: ['https://ghchart.rshah.org/myself-aas.svg'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
