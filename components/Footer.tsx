import Link from 'next/link';
import { SocialIconBar } from './SocialLinks';

const POLICIES = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/ads-info', label: 'Ads' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule px-5 py-8 md:px-10 text-center">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
        {POLICIES.map((policy) => (
          <li key={policy.href}>
            <Link
              href={policy.href}
              className="rail-link text-ink-soft transition-colors hover:text-signal text-xs"
            >
              {policy.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="datum text-center max-w-[62ch] mx-auto text-ink-soft mb-6 leading-relaxed">
        © {currentYear} Ashif Ahmed Shuvo. All research work, preprints & code assets licensed for open science checkability.
      </p>

      {/* Single social media icon bar below copyright claims in centered alignment */}
      <div className="flex justify-center pt-4 border-t border-rule/40">
        <SocialIconBar size="md" className="justify-center" />
      </div>
    </footer>
  );
}
