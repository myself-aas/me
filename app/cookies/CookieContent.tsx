'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function CookieContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sheet-panel p-8 rounded-[2px] border border-rule"
    >
      <div className="space-y-4 text-ink-soft leading-relaxed">
        <h2 className="text-xl font-bold text-ink mt-8">1. What a cookie is</h2>
        <p>
          A cookie is a small text file that a site asks your browser to keep and hand back on the next request. The
          storage API in the browser, which this site uses for your colour theme, works in a similar way: a value
          tied to this origin, read by the page, and cleared when you clear site data.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">2. What is stored</h2>
        <p>
          One preference is stored: your chosen colour scheme (light, dark or follow the system). It is written to
          local storage under a single key by the theme provider and is read on the next visit so the page does not
          flash the wrong colours before it settles. The value is a short string such as &quot;dark&quot; and nothing
          that identifies you or your device.
        </p>
        <p>
          No cookie is set for tracking, profiling or advertising, and no third-party script here reads or writes one
          of its own. The contact form posts directly to its form provider, which may set a protection cookie during
          that submission only, and the embedded panels in the sidebar do not set anything.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">3. Third-party content</h2>
        <p>
          Several panels load data from other services: GitHub repositories, an ORCID record, Bluesky posts, a
          weather forecast and a museum collection sampler. Those requests are made from your browser to the
          provider, so the provider can see your IP address and user agent and may apply its own policy. Nothing on
          the page passes them an identifier or links two visits together.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">4. Removing or blocking storage</h2>
        <p>
          Every major browser lets you view, block and delete site data from its settings, usually under privacy or
          developer tools. Clearing storage for this origin resets the colour preference to the system default; the
          rest of the site keeps working. Blocking storage entirely is also safe, and the theme simply follows your
          operating system.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">5. Related policies</h2>
        <p>
          The{" "}
          <Link href="/privacy" className="text-signal hover:underline">
            privacy policy
          </Link>{" "}
          describes the personal data this site handles, and the{" "}
          <Link href="/ads-info" className="text-signal hover:underline">
            advertising policy
          </Link>{" "}
          explains why no ad network is present.
        </p>
      </div>
    </motion.div>
  );
}
