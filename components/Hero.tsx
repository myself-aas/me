'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

/**
 * The masthead, set as a specimen label: who, what the work claims, and the
 * four records that make the claim checkable.
 *
 * This is the one place the page moves on arrival — the rules sweep out and the
 * records settle behind them. Everything below is still.
 */

const RECORDS = [
  {
    label: 'Field',
    value: 'Food engineering, then agro-meteorology at Bangladesh Agricultural University',
  },
  {
    label: 'Instruments',
    value: 'RGB cameras, weather-station series, satellite indices, PyTorch',
  },
  {
    label: 'Records',
    value: 'Five papers and preprints, public repositories, a research log on Bluesky',
  },
  {
    label: 'Coordinates',
    value: '24.75° N, 90.40° E · Mymensingh, Bangladesh',
  },
];

const LINKS = [
  { label: 'Write to me', href: '/contact', external: false },
  { label: 'Résumé', href: '/me/Ashif_Ahmed_Shuvo_Resume.pdf', external: true },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en',
    external: true,
  },
  { label: 'ORCID', href: 'https://orcid.org/0009-0003-5734-1519', external: true },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-rule">
      <div className="px-5 pb-10 pt-8 md:px-10 md:pt-12">
        <div className="flex items-start justify-between gap-8">
          <motion.h1
            className="max-w-[21ch]"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="datum block">Ashif Ahmed Shuvo</span>
            <span className="mt-4 block font-serif text-[clamp(2.3rem,5.6vw,3.5rem)] font-[560] leading-[1.03] tracking-[-0.025em] text-ink">
              Models that hold up in a field, not just on a benchmark.
            </span>
          </motion.h1>

          <Image
            src="https://github.com/myself-aas.png"
            alt="Portrait of Ashif Ahmed Shuvo"
            width={208}
            height={208}
            priority
            className="hidden h-[104px] w-[104px] shrink-0 border border-rule object-cover grayscale sm:block"
          />
        </div>

        <motion.p
          className="measure mt-6 text-[1.0625rem] leading-[1.6] text-ink-soft"
          initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Uneven light, overlapping leaves, cheap cameras, small labelled sets: that is the working
          condition for the models I build. The same habit goes into predicting the price of wheat
          flour or the weight of cattle from a photograph — the output has to answer a question
          someone can act on.
        </motion.p>

        <dl className="mt-10 border-b border-rule">
          {RECORDS.map((record, index) => (
            <div
              key={record.label}
              className="relative grid grid-cols-1 gap-x-8 border-t border-rule py-3 sm:grid-cols-[8rem_1fr]"
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-rule"
                initial={reduceMotion ? undefined : { scaleX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.08,
                  ease: [0.3, 0.6, 0.2, 1],
                }}
              />
              <dt className="datum">{record.label}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-[1.5] text-ink sm:mt-0">{record.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-9 flex flex-wrap items-baseline gap-x-7 gap-y-3">
          {LINKS.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail-link text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="rail-link text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-rule px-5 py-4 md:px-10">
        <Image
          src="https://ghchart.rshah.org/myself-aas.svg"
          alt="GitHub contribution graph for myself-aas: commits across public repositories over the last twelve months"
          width={1200}
          height={120}
          className="h-14 w-full object-contain object-left opacity-70 [filter:grayscale(1)_contrast(1.2)]"
        />
        <p className="datum mt-2">
          Commits to public repositories over the last twelve months. The rest of the record is
          below.
        </p>
      </div>
    </div>
  );
}
