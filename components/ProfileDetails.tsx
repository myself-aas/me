'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Python', value: 40 },
  { name: 'R', value: 30 },
  { name: 'Java', value: 20 },
  { name: 'C++', value: 15 },
  { name: 'SQL', value: 25 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function ProfileDetails({ isEmbedded = false }: { isEmbedded?: boolean }) {
  return (
    <div className={`${isEmbedded ? 'p-6' : 'p-4 border-b border-gray-200 dark:border-gray-800'} bg-blue-50/30 dark:bg-blue-900/10`}>
      <div className="flex items-center gap-2 mb-4 text-blue-500 text-xs font-bold uppercase tracking-wider">
        <TrendingUp className="w-4 h-4" /> Featured: Skill Analytics
      </div>
      <h3 className="text-lg font-bold mb-4">Technical Proficiency</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
              itemStyle={{ color: '#F9FAFB' }}
            />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Important Links</h3>
        <div className="flex flex-col gap-2">
          <a href="https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en&oi=sra" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Scholar</a>
          <a href="https://github.com/myself-aas" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Profile</a>
        </div>
      </div>
    </div>
  );
}
