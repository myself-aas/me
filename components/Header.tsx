import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github, Linkedin, Mail, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { SocialIcon } from './SocialLinks';
import { SOCIAL_PROFILES } from '@/lib/socials';

/** The contents of the record, in the order a reader moves through it. */
const CONTENTS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Research Feed', href: '/feed' },
  { name: 'Publications', href: '/publications' },
  { name: 'Projects', href: '/projects' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close menu when pathname changes
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 hidden h-screen w-[76px] shrink-0 flex-col justify-between border-r border-rule py-6 md:flex xl:w-[248px] xl:px-6">
        <div>
          <Link href="/" aria-label="Ashif Ahmed Shuvo, home" className="block px-3 xl:px-0">
            <span className="hidden font-serif text-[1.0625rem] leading-[1.25] tracking-[-0.015em] text-ink xl:block">
              Ashif Ahmed
              <br />
              Shuvo
            </span>
            <span className="font-serif text-[1.15rem] leading-none text-ink xl:hidden">A.</span>
            <span className="datum mt-2 hidden xl:block">Research portfolio</span>
          </Link>

          <nav aria-label="Contents" className="mt-9 border-t border-rule">
            {CONTENTS.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.name}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-baseline gap-3 border-b border-rule py-2.5 pl-3 transition-colors xl:pl-0 ${
                    isActive ? 'text-signal' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className={`figure text-[0.6875rem] ${isActive ? 'text-signal font-semibold' : 'text-ink-soft'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden font-sans text-[0.875rem] tracking-[0.005em] xl:block">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-1 px-3 xl:px-0">
          <Link
            href="/contact"
            aria-label="Contact"
            className="flex items-center gap-3 border-b border-rule py-2.5 font-sans text-[0.875rem] text-ink transition-colors hover:text-signal"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:block">Contact</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 py-3">
            {SOCIAL_PROFILES.filter(p => p.id !== 'email').map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${profile.name} (${profile.handle})`}
                aria-label={`${profile.name} profile`}
                className="text-ink-soft transition-colors hover:text-signal p-1 hover:bg-band rounded-[2px]"
              >
                <SocialIcon id={profile.id} className="h-3.5 w-3.5" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Switch between light and dark theme"
              className="ml-auto text-ink-soft transition-colors hover:text-signal p-1"
            >
              {!mounted ? (
                <span className="block h-4 w-4" />
              ) : theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Small screens: Masthead with Hamburger and GitHub link */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-rule bg-paper px-5 md:hidden">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="group flex flex-col items-start gap-1.5 p-1 transition-colors hover:text-signal"
          >
            <motion.div 
              className="h-[2px] bg-current rounded-full"
              initial={false}
              animate={isMenuOpen ? { rotate: 45, y: 4, width: 22 } : { rotate: 0, y: 0, width: 22 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="h-[2px] bg-current rounded-full"
              initial={false}
              animate={isMenuOpen ? { rotate: -45, y: -4, width: 22 } : { rotate: 0, y: 0, width: 14 }}
              transition={{ duration: 0.2 }}
            />
          </button>
          <Link href="/" className="font-serif text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
            Ashif Ahmed Shuvo
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/myself-aas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <Github className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Switch theme"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {!mounted ? (
              <span className="block h-5 w-5" />
            ) : theme === 'dark' ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-40 w-4/5 max-w-sm bg-paper border-r border-rule pt-14 md:hidden"
            >
              <div className="flex flex-col h-full overflow-y-auto px-5 py-8">
                <div className="datum mb-6 border-b border-rule pb-2">Contents</div>
                <div className="flex flex-col gap-1">
                  {CONTENTS.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-baseline gap-4 border-b border-rule/50 py-4 transition-colors ${
                          isActive ? 'text-signal' : 'text-ink-soft hover:text-ink'
                        }`}
                      >
                        <span className={`figure text-xs ${isActive ? 'text-signal' : 'text-ink-soft/50'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-lg font-medium">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    className="flex items-center gap-4 py-6 mt-4 text-ink hover:text-signal transition-colors border-t border-rule"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-sans text-lg font-medium">Contact</span>
                  </Link>
                </div>
                
                <div className="mt-auto pt-6 border-t border-rule">
                  <div className="datum mb-3">Profiles & Networks</div>
                  <div className="grid grid-cols-2 gap-2">
                    {SOCIAL_PROFILES.filter(p => p.id !== 'email').map((profile) => (
                      <a
                        key={profile.id}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-soft hover:text-signal transition-colors flex items-center gap-2 p-1.5 rounded-[2px] hover:bg-band"
                      >
                        <SocialIcon id={profile.id} className="h-4 w-4 shrink-0 text-signal" />
                        <span className="text-xs font-medium truncate">{profile.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
