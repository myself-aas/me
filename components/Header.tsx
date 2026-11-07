'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The contents of the record, in the order a reader moves through it. */
const CONTENTS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Research Feed', href: '/feed' },
  { name: 'Publications', href: '/publications' },
  { name: 'Projects', href: '/projects' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
                  <span className={`figure text-[0.6875rem] ${isActive ? 'text-signal' : 'text-ink-soft/70'}`}>
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
          <div className="flex items-center gap-4 py-3">
            <a
              href="https://github.com/myself-aas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/me-aas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Switch between light and dark theme"
              className="ml-auto text-ink-soft transition-colors hover:text-ink"
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

      {/* Small screens: a masthead rule and the contents along the bottom edge. */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b border-rule bg-paper px-5 md:hidden">
        <Link href="/" className="font-serif text-[0.9375rem] tracking-[-0.01em]">
          Ashif Ahmed Shuvo
        </Link>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Switch between light and dark theme"
          className="text-ink-soft transition-colors hover:text-ink"
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

      <nav
        aria-label="Contents"
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-stretch justify-between border-t border-rule bg-paper px-2 md:hidden"
      >
        {[CONTENTS[0], CONTENTS[1], CONTENTS[5], CONTENTS[6], CONTENTS[4]].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 items-center justify-center border-b-2 px-1 text-center font-sans text-[0.6875rem] leading-tight transition-colors ${
                isActive
                  ? 'border-signal text-signal'
                  : 'border-transparent text-ink-soft hover:text-ink'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
