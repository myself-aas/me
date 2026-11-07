'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function AdsInfoContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sheet-panel p-8 rounded-[2px] border border-rule"
    >
      <div className="space-y-4 text-ink-soft leading-relaxed">
        <h2 className="text-xl font-bold text-ink mt-8">1. Why there are no ads</h2>
        <p>
          The site exists to document research and to make collaboration easier, not to generate impressions.
          Advertising would mean adding tracking scripts, a consent flow and a privacy notice far heavier than the
          rest of the page, and it would slow down pages that are mostly text.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">2. Outbound links and embeds</h2>
        <p>
          Links to GitHub, ORCID, Google Scholar, LinkedIn, Bluesky and publisher websites are there because they are
          the primary sources, not because they pay for placement. None of them currently carries a referral or
          commission parameter. External services embedded in the sidebar, such as the live weather panel or the
          Bluesky feed, fetch their own data when the page loads; those requests are governed by the provider&apos;s
          own terms rather than by mine.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">3. If that changes</h2>
        <p>
          Should the site ever carry sponsorship or advertising, this page will say so before anything is shown.
          Sponsored items will be labelled as sponsored in the place where they appear, editorial choices about
          publications and projects will stay independent of any sponsor, and no personal data will be shared with an
          advertiser without your explicit consent. Any change will be announced on the{" "}
          <Link href="/feed" className="text-signal hover:underline">
            research feed
          </Link>{" "}
          as well as here.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">4. Related policies</h2>
        <p>
          The{" "}
          <Link href="/privacy" className="text-signal hover:underline">
            privacy policy
          </Link>{" "}
          covers the data this site does collect, the{" "}
          <Link href="/cookies" className="text-signal hover:underline">
            cookie policy
          </Link>{" "}
          lists what is stored on your device, and the{" "}
          <Link href="/terms" className="text-signal hover:underline">
            terms of service
          </Link>{" "}
          set out how the content may be reused.
        </p>
      </div>
    </motion.div>
  );
}
