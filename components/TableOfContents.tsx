'use client';

import React, { useState, useEffect } from 'react';
import { ListTree, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  items: TocItem[];
  defaultCollapsed?: boolean;
}

export default function TableOfContents({ items, defaultCollapsed = false }: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [activeId, setActiveId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);

  // ScrollSpy using IntersectionObserver
  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Select the top-most visible heading
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: [0, 0.5, 1],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Track reading progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(Math.round(progress));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!items || items.length < 2) {
    return null;
  }

  const handleScrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="my-6 sticky top-16 z-20 w-full transition-all duration-200">
      <nav
        aria-label="Table of contents"
        className="overflow-hidden rounded-[2px] border border-rule bg-band/95 backdrop-blur-md shadow-xs transition-colors"
      >
        {/* Reading Progress Bar */}
        <div className="h-0.5 w-full bg-rule/30">
          <div
            className="h-full bg-signal transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-band/60">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="group flex flex-1 items-center gap-2 text-left font-sans text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-signal focus:outline-none"
            aria-expanded={!isCollapsed}
          >
            <ListTree className="h-4 w-4 text-signal shrink-0" />
            <span className="flex items-center gap-2">
              <span>Table of Contents</span>
              <span className="rounded-[2px] bg-paper px-1.5 py-0.5 text-[10px] font-mono text-ink-soft border border-rule/60">
                {items.length} sections
              </span>
            </span>
          </button>

          <div className="flex items-center gap-1 pl-2">
            {readingProgress > 15 && (
              <button
                type="button"
                onClick={handleScrollToTop}
                title="Back to top"
                className="rounded-[2px] p-1 text-ink-soft hover:bg-paper hover:text-signal transition-colors border border-transparent hover:border-rule"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center rounded-[2px] p-1 text-ink-soft hover:bg-paper hover:text-signal transition-colors border border-transparent hover:border-rule"
              aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Section List */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="border-t border-rule/60 px-3 py-2.5 bg-paper/40 max-h-[55vh] overflow-y-auto"
            >
              <ul className="space-y-1 text-xs font-sans">
                {items.map((item) => {
                  const isActive = activeId === item.id;
                  const levelIndent =
                    item.level === 3 ? 'pl-4' : item.level >= 4 ? 'pl-7' : 'pl-0';

                  return (
                    <li key={item.id} className={levelIndent}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleScrollToHeading(item.id, e)}
                        className={`group flex items-start gap-2 rounded-[2px] px-2 py-1.5 transition-all ${
                          isActive
                            ? 'bg-signal/10 font-medium text-signal border-l-2 border-signal -ml-0.5'
                            : 'text-ink-soft hover:bg-band hover:text-ink hover:border-l-2 hover:border-rule -ml-0.5'
                        }`}
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            isActive ? 'bg-signal' : 'bg-rule/70 group-hover:bg-ink-soft'
                          }`}
                        />
                        <span className="line-clamp-2 leading-relaxed">{item.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
