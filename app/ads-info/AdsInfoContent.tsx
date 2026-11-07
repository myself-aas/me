'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function AdsInfoContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Ads Info</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            This website does not display third-party advertisements and does not run an ad network, an affiliate
            script or a retargeting pixel. There is nothing on the page that earns money from your attention while you
            read.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Why there are no ads</h2>
          <p>
            The site exists to document research and to make collaboration easier, not to generate impressions.
            Advertising would mean adding tracking scripts, a consent flow and a privacy notice far heavier than the
            rest of the page, and it would slow down pages that are mostly text.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Outbound links and embeds</h2>
          <p>
            Links to GitHub, ORCID, Google Scholar, LinkedIn, Bluesky and publisher websites are there because they are
            the primary sources, not because they pay for placement. None of them currently carries a referral or
            commission parameter. External services embedded in the sidebar, such as the live weather panel or the
            Bluesky feed, fetch their own data when the page loads; those requests are governed by the provider&apos;s
            own terms rather than by mine.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. If that changes</h2>
          <p>
            Should the site ever carry sponsorship or advertising, this page will say so before anything is shown.
            Sponsored items will be labelled as sponsored in the place where they appear, editorial choices about
            publications and projects will stay independent of any sponsor, and no personal data will be shared with an
            advertiser without your explicit consent. Any change will be announced on the{" "}
            <Link href="/feed" className="text-blue-600 hover:underline dark:text-blue-400">
              research feed
            </Link>{" "}
            as well as here.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Related policies</h2>
          <p>
            The{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              privacy policy
            </Link>{" "}
            covers the data this site does collect, the{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
              cookie policy
            </Link>{" "}
            lists what is stored on your device, and the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
              terms of service
            </Link>{" "}
            set out how the content may be reused.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
