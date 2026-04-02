'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import RightSidebar from './RightSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages that should have a wider layout to accommodate more columns
  const isWidePage = ['/skills', '/projects'].includes(pathname);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl justify-center">
      <Header />
      <main 
        className={`flex w-full flex-col border-x border-white/20 dark:border-white/10 pt-14 pb-20 md:pt-0 md:pb-0 transition-all duration-300 bg-white/30 dark:bg-black/30 backdrop-blur-md ${
          isWidePage ? 'max-w-[1000px]' : 'max-w-[700px]'
        }`}
      >
        {children}
        
        {/* Mobile Right Sidebar (Visible on small screens, hidden on large) */}
        {!isWidePage && (
          <div className="lg:hidden p-4 border-t border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md">
            <RightSidebar />
          </div>
        )}
        
        <Footer />
      </main>
      {/* Desktop Right Sidebar */}
      <div className={`hidden lg:block w-[350px] p-4 transition-all duration-300 ${isWidePage ? 'opacity-0 pointer-events-none' : 'opacity-100'} sticky top-0 h-screen overflow-y-auto`}>
        <RightSidebar />
      </div>
    </div>
  );
}
