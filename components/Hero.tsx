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
    value: 'Agrometeorology (M.Sc.) & Food Engineering (B.Sc.) at Bangladesh Agricultural University',
  },
  {
    label: 'Instruments',
    value: 'RGB cameras, spatio-temporal series, satellite indices, PyTorch, NIR spectroscopy',
  },
  {
    label: 'Records',
    value: 'Peer-reviewed journals (Smart Agricultural Technology), SSRN preprints, Mendeley datasets, GitHub platforms',
  },
  {
    label: 'Coordinates',
    value: '24.75° N, 90.40° E · Mymensingh, Bangladesh',
  },
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
          Agrometeorologist & Food Engineer specializing in computer vision, spatio-temporal modeling,
          and machine learning for precision agriculture and food systems. From predicting commodity prices
          to on-device bovine weight estimation, my focus is building actionable models for real-world field conditions.
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

        <div className="mt-9 flex items-center gap-5 pt-2 border-t border-rule/40">
          <Link
            href="/contact"
            className="rail-link text-signal font-medium underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
          >
            Write to me
          </Link>
          <a
            href="/Ashif_Ahmed_Shuvo_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rail-link text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
          >
            Résumé
          </a>
        </div>
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
