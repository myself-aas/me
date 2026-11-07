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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function ProfileDetails() {
  return (
    <div className="p-6 bg-blue-50/30 dark:bg-blue-900/10">
      <div className="flex items-center gap-2 mb-4 text-blue-500 text-xs font-bold uppercase tracking-wider">
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
              <span className="w-16 shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300">
                {entry.name}
              </span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200/70 dark:bg-white/10">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(entry.value / 40) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="block h-full rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-xs tabular-nums text-gray-500 dark:text-gray-400">
                {entry.value}
              </span>
            </li>
          ))}
        </ul>
      </figure>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Important Links</h2>
        <div className="flex flex-col gap-2">
          <a href="https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en&oi=sra" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Google Scholar profile
          </a>
          <a href="https://github.com/myself-aas" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            GitHub profile
          </a>
        </div>
      </div>
    </div>
  );
}
