'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function AccessibilityContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Accessibility</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            This portfolio is a working notebook as much as a calling card, so it should be usable by everyone who
            arrives at it. I aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, the standard
            most public institutions and universities are held to.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. What is in place today</h2>
          <p>
            Every page can be reached and operated with a keyboard alone. Focus states stay visible on links, buttons
            and form fields. Colour pairings for body text are checked against both the light and dark themes, and the
            layout reflows down to a 320 pixel viewport without horizontal scrolling.
          </p>
          <p>
            Icons that carry meaning are either paired with a visible label or given an accessible name, so a screen
            reader announces what a control does instead of reading out a file name. Images that convey information
            have descriptive alternative text. Animated elements respect the operating system&apos;s reduced-motion
            preference, and no content flashes more than three times per second.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Known limitations</h2>
          <p>
            Some content is loaded from third parties: GitHub repositories, an ORCID record, Bluesky posts and a live
            weather panel. Their markup is outside my control, so a change upstream can introduce a barrier before I
            notice. Where an embed fails to load, the surrounding page still reads correctly and the same information
            is available through the links on the{" "}
            <Link href="/projects" className="text-blue-600 hover:underline dark:text-blue-400">
              projects page
            </Link>{" "}
            and the{" "}
            <Link href="/publications" className="text-blue-600 hover:underline dark:text-blue-400">
              publications page
            </Link>
            .
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Reporting a barrier</h2>
          <p>
            If something here is difficult or impossible to use with your setup, write to me through the{" "}
            <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
              contact form
            </Link>{" "}
            and describe the page, the browser or assistive technology you used, and what you expected to happen. I aim
            to reply within ten working days and to fix genuine barriers in the next content update. If you need a
            document from this site in another format, ask and I will produce it.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Related policies</h2>
          <p>
            How the site handles data is described in the{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              privacy policy
            </Link>
            ; the storage it sets is listed in the{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
              cookie policy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
