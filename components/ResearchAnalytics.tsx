'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Activity, BarChart3, TrendingUp } from 'lucide-react';

const PRODUCTIVITY_DATA = [
  { month: 'Dec 25', publications: 1, thoughts: 1, codeCommits: 14 },
  { month: 'Jan 26', publications: 0, thoughts: 2, codeCommits: 18 },
  { month: 'Feb 26', publications: 2, thoughts: 1, codeCommits: 22 },
  { month: 'Mar 26', publications: 1, thoughts: 2, codeCommits: 29 },
  { month: 'Apr 26', publications: 2, thoughts: 3, codeCommits: 35 },
  { month: 'May 26', publications: 1, thoughts: 2, codeCommits: 24 },
  { month: 'Jun 26', publications: 0, thoughts: 1, codeCommits: 19 },
  { month: 'Jul 26', publications: 1, thoughts: 2, codeCommits: 21 },
  { month: 'Aug 26', publications: 1, thoughts: 1, codeCommits: 28 },
  { month: 'Sep 26', publications: 2, thoughts: 3, codeCommits: 38 },
  { month: 'Oct 26', publications: 1, thoughts: 2, codeCommits: 31 },
  { month: 'Nov 26', publications: 2, thoughts: 3, codeCommits: 42 },
];

export default function ResearchAnalytics() {
  return (
    <div className="my-10 rounded-[2px] border border-rule bg-band p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-rule pb-4">
        <div>
          <h3 className="font-serif text-xl font-[560] text-ink flex items-center gap-2">
            <Activity className="h-5 w-5 text-signal" />
            <span>Research & Publication Velocity</span>
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft mt-1">
            Tracking output frequency across peer-reviewed papers, thought notes, and code repositories over the past 12 months
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-signal inline-block" />
            Publications
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal inline-block" />
            Thought Notes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
            Code & Repos
          </span>
        </div>
      </div>

      <div className="h-72 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PRODUCTIVITY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule)" opacity={0.4} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="currentColor" />
            <YAxis tick={{ fontSize: 11 }} stroke="currentColor" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-paper)',
                borderColor: 'var(--color-rule)',
                color: 'var(--color-ink)',
                borderRadius: '2px',
                fontSize: '12px',
              }}
              itemStyle={{ color: 'var(--color-ink)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '11px' }} />
            <Area
              type="monotone"
              dataKey="codeCommits"
              name="Code Commits & Repos"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="thoughts"
              name="Thought Publications"
              stroke="#17585c"
              fill="#17585c"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="publications"
              name="Peer-Reviewed Works"
              stroke="#ae1454"
              fill="#ae1454"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="rounded-[2px] bg-paper p-3 border border-rule">
          <span className="block text-[10px] uppercase font-sans text-ink-soft">Total Publications</span>
          <span className="font-serif text-xl font-bold text-signal">14</span>
        </div>
        <div className="rounded-[2px] bg-paper p-3 border border-rule">
          <span className="block text-[10px] uppercase font-sans text-ink-soft">Thought Notes Published</span>
          <span className="font-serif text-xl font-bold text-teal">26</span>
        </div>
        <div className="rounded-[2px] bg-paper p-3 border border-rule">
          <span className="block text-[10px] uppercase font-sans text-ink-soft">Active Code Repos</span>
          <span className="font-serif text-xl font-bold text-amber-600 dark:text-amber-400">315+</span>
        </div>
      </div>
    </div>
  );
}
