import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: 'Ashif Ahmed Shuvo | AI & ML Expert',
  description: 'Portfolio of Ashif Ahmed Shuvo, Machine Learning Enthusiast specializing in precision and sustainable agriculture.',
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
