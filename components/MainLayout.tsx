'use client';

import Header from './Header';
import Footer from './Footer';
import RightSidebar from './RightSidebar';

/**
 * Three rails: the contents, the record itself, and the instruments reading the
 * world on the right. On narrow screens the instruments move under the record.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px] justify-center">
      <Header />

      <main className="flex w-full min-w-0 max-w-[760px] flex-col border-rule bg-paper pb-14 pt-12 md:border-x md:pb-0 md:pt-0">
        {children}

        <div className="border-t border-rule px-5 py-8 lg:hidden">
          <RightSidebar />
        </div>

        <Footer />
      </main>

      <aside className="sticky top-0 hidden h-screen w-[336px] shrink-0 overflow-y-auto border-rule px-6 py-8 lg:block [scrollbar-width:none]">
        <RightSidebar />
      </aside>
    </div>
  );
}
