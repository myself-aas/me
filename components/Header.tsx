'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { 
  Moon, Sun, Github, Linkedin, GraduationCap, 
  Home, User, Wrench, Briefcase, BookOpen, Folder, Mail
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Skills', href: '/skills', icon: Wrench },
    { name: 'Experience', href: '/experience', icon: Briefcase },
    { name: 'Publications', href: '/publications', icon: BookOpen },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <header className="hidden md:flex w-[88px] xl:w-[275px] flex-col justify-between sticky top-0 h-screen px-2 xl:px-4 py-4 border-r border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <div className="flex flex-col items-center xl:items-start w-full">
          <Link href="/" className="flex items-center justify-center xl:justify-start w-12 h-12 xl:w-auto xl:h-auto rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors mb-4 xl:p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
              A
            </div>
          </Link>
          
          <nav className="flex flex-col gap-2 w-full items-center xl:items-start mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="group flex items-center xl:w-full"
                >
                  <div className={`inline-flex items-center gap-4 p-3 xl:px-4 xl:py-2.5 rounded-xl text-[17px] transition-all ${
                    isActive 
                      ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm border border-white/20' 
                      : 'font-medium text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                    <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span className="hidden xl:block">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 w-full flex justify-center xl:block xl:px-2">
            <Link href="/contact" className="w-12 h-12 xl:w-full xl:h-12 flex items-center justify-center bg-blue-600/90 hover:bg-blue-700 text-white font-bold xl:text-[16px] rounded-xl transition-all shadow-md hover:shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-white/10">
              <Mail className="w-5 h-5 xl:hidden" />
              <span className="hidden xl:block">Contact Me</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center xl:items-start gap-4 mb-4 w-full">
          <div className="flex xl:flex-row flex-col items-center gap-4 xl:px-4">
            <a href="https://github.com/myself-aas" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-white/50 dark:hover:bg-white/5 rounded-full backdrop-blur-sm border border-transparent hover:border-white/20">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/me-aas" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-white/50 dark:hover:bg-white/5 rounded-full backdrop-blur-sm border border-transparent hover:border-white/20">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="group flex items-center justify-center xl:justify-start w-full py-1"
          >
            <div className="inline-flex items-center gap-4 p-3 xl:px-5 xl:py-3 rounded-full font-medium text-xl text-gray-900 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/5 transition-colors backdrop-blur-sm border border-transparent hover:border-white/20">
              {mounted ? (theme === 'dark' ? <Sun className="h-7 w-7" /> : <Moon className="h-7 w-7" />) : <div className="h-7 w-7" />}
              <span className="hidden xl:block pr-4">Theme</span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 dark:border-white/10 flex justify-between items-center h-14 px-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          A
        </div>
        <span className="font-bold text-base tracking-tight">Ashif Ahmed Shuvo</span>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors backdrop-blur-sm border border-white/10"
        >
          {mounted ? (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <div className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-t border-white/20 dark:border-white/10 flex justify-around items-center h-16 px-2">
        {[navItems[0], navItems[1], navItems[4], navItems[5], navItems[6]].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 m-auto w-12 h-12 bg-blue-50/50 dark:bg-blue-900/30 rounded-full backdrop-blur-sm border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative z-10 flex items-center justify-center p-2"
              >
                <item.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-gray-900 dark:text-white stroke-[2.5px]' : 'text-gray-500 dark:text-gray-400 stroke-2'}`} />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
