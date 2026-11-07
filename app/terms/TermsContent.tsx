'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function TermsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sheet-panel p-8 rounded-[2px] border border-rule"
    >
      <div className="space-y-4 text-ink-soft leading-relaxed">
        <h2 className="text-xl font-bold text-ink mt-8">1. What this site is</h2>
        <p>
          A personal research portfolio: a description of my background, a list of publications and projects, and a
          way to get in touch. Nothing here is offered as professional advice, and no service is sold through the
          site.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">2. Reuse of content</h2>
        <p>
          Text, figures and code samples written by me may be quoted and reused for teaching, review or research with
          attribution and a link back to the page you took them from. Wholesale republication, scraping for an
          ad-supported mirror, and resale of the content are not permitted. Third-party material keeps its own
          licence: repository code follows the licence in its GitHub repository, and papers follow the publisher&apos;s
          terms.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">3. Accuracy</h2>
        <p>
          Publication lists, project cards and live panels are assembled from external APIs and refreshed
          automatically, so a detail can be stale or wrong between updates. Metrics such as stars, citation counts and
          impact factors are point-in-time values rather than guarantees.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">4. Acceptable use</h2>
        <p>
          Please do not attempt to break the site, flood the contact form, or use it to send unsolicited commercial
          messages. Automated crawling is welcome for search engines and research agents at a reasonable rate; bulk
          scraping that degrades availability is not.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">5. Limitation of liability</h2>
        <p>
          The material is provided on an &quot;as is&quot; basis without warranties of any kind. To the extent the law
          allows, I am not liable for loss arising from use of the site or reliance on its content. Nothing in these
          terms limits liability for fraud or for anything else that cannot lawfully be excluded.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">6. Changes and governing law</h2>
        <p>
          These terms may be updated as the site changes; the version published here applies. They are governed by
          the laws of Bangladesh, without prejudice to consumer protections you enjoy where you live.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">7. Related policies</h2>
        <p>
          See the{" "}
          <Link href="/privacy" className="text-signal hover:underline">
            privacy policy
          </Link>{" "}
          for data handling, the{" "}
          <Link href="/cookies" className="text-signal hover:underline">
            cookie policy
          </Link>{" "}
          for device storage, and the{" "}
          <Link href="/contact" className="text-signal hover:underline">
            contact page
          </Link>{" "}
          for licensing questions.
        </p>
      </div>
    </motion.div>
  );
}
