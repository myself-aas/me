import Link from 'next/link';

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
    <footer className="mt-auto border-t border-rule px-5 py-8 md:px-10">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {POLICIES.map((policy) => (
          <li key={policy.href}>
            <Link
              href={policy.href}
              className="rail-link text-ink-soft transition-colors hover:text-signal"
            >
              {policy.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="datum mt-5 max-w-[58ch]">
        © {currentYear} Ashif Ahmed Shuvo. Papers and code are read live from ORCID, GitHub and
        Bluesky; the instruments rail shows what those services returned.
      </p>
    </footer>
  );
}
