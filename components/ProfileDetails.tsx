'use client';

import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

/**
 * Static proficiency bars.
 *
 * Previously rendered with recharts, which pulled a ~385 KB chart bundle into
 * the first load of the home page for five bars. Plain markup keeps the same
 * information at no JavaScript cost and gives assistive technology real text.
 */
const data = [
  { name: 'Python', value: 40 },
  { name: 'R', value: 30 },
  { name: 'Java', value: 20 },
  { name: 'C++', value: 15 },
  { name: 'SQL', value: 25 },
];

const COLORS = ['#AE1454', '#8A5F19', '#17585C', '#55605A', '#1A211C'];

export default function ProfileDetails() {
  return (
    <div className="p-6 bg-signal-wash/30 bg-signal-wash">
      <div className="datum mb-4 flex items-center gap-2 text-signal">
        <TrendingUp className="w-4 h-4" aria-hidden="true" /> Featured: Skill Analytics
      </div>
      <h2 className="text-lg font-bold mb-4">Technical Proficiency</h2>

      <figure className="mb-6">
        <figcaption className="sr-only">
          Relative proficiency across the five most used languages, scaled 0 to 40.
        </figcaption>
        <ul className="space-y-3">
          {data.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-sm font-medium text-ink">
                {entry.name}
              </span>
              <span className="h-3 flex-1 overflow-hidden rounded-[2px] bg-band bg-ink/10">
                <span
                  className="block h-full rounded-[2px]"
                  style={{
                    width: `${(entry.value / 40) * 100}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-xs tabular-nums text-ink-soft dark:text-ink-soft">
                {entry.value}
              </span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
