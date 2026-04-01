'use client';

import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <div className="p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Terms of Service</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>Welcome to my portfolio. By accessing this website, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Disclaimer</h2>
          <p>The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Limitations</h2>
          <p>In no event shall I or my suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.</p>
        </div>
      </motion.div>
    </div>
  );
}
