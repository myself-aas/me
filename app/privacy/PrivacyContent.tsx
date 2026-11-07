'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function PrivacyContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sheet-panel p-8 rounded-[2px] border border-rule"
    >
      <div className="space-y-4 text-ink-soft leading-relaxed">
        <h2 className="text-xl font-bold text-ink mt-8">1. What is collected</h2>
        <p>
          If you use the contact form, the name, email address and message you type are sent to a form-handling
          provider and forwarded to my inbox. Nothing else is requested: there is no account, no newsletter signup
          and no profile. If you only browse the site, no personal record is created.
        </p>
        <p>
          The site is hosted on GitHub Pages, which records standard web server logs such as the requested page, the
          time and the connecting address. That logging is operated by GitHub under its own privacy statement and I
          do not have access to it beyond aggregate traffic counts.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">2. How it is used</h2>
        <p>
          A message you send is used for one purpose: replying to you. It is not added to a mailing list, not sold,
          not shared with an advertiser and not used to train a model. Correspondence is kept for as long as the
          conversation is useful, then deleted.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">3. Third-party services</h2>
        <p>
          The contact form is delivered by Formspree, which processes the submission on my behalf. Panels in the
          sidebar load public data from GitHub, ORCID, Bluesky, Open-Meteo and the Metropolitan Museum of Art; those
          requests leave your browser for the provider, which will see your address as it would for any site you
          visit. Each provider applies its own policy.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">4. Security</h2>
        <p>
          The site is served over HTTPS. Access to my mailbox and to the repository that publishes these pages is
          protected by two-factor authentication. Because the site is static, there is no database of user records to
          lose.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">5. Your choices</h2>
        <p>
          Write to me at any time to ask what correspondence is held, to have it corrected, or to have it erased. I
          will confirm and action the request within thirty days. If you are in the European Union or the United
          Kingdom, these amount to your rights of access, rectification and erasure under the GDPR, and you may also
          complain to your local supervisory authority.
        </p>

        <h2 className="text-xl font-bold text-ink mt-8">6. Related policies</h2>
        <p>
          The{" "}
          <Link href="/cookies" className="text-signal hover:underline">
            cookie policy
          </Link>{" "}
          lists what is stored on your device, the{" "}
          <Link href="/terms" className="text-signal hover:underline">
            terms of service
          </Link>{" "}
          cover reuse of the content, the{" "}
          <Link href="/accessibility" className="text-signal hover:underline">
            accessibility statement
          </Link>{" "}
          explains the standards this site is built to, and the{" "}
          <Link href="/contact" className="text-signal hover:underline">
            contact page
          </Link>{" "}
          is where to send a request.
        </p>
      </div>
    </motion.div>
  );
}
