'use client';

import { motion } from 'motion/react';

export default function AdsInfoContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Ads Info</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>This website does not currently display third-party advertisements.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Advertising Policy</h2>
          <p>I am committed to providing a clean and professional user experience, which is why I have chosen not to display ads on this website.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Future Changes</h2>
          <p>If I decide to display ads in the future, I will update this policy to explain how ads are served and how your data is used for advertising purposes.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Transparency</h2>
          <p>I am committed to transparency and will always provide clear information about any advertising or promotional content on this website.</p>
        </div>
      </motion.div>
    </div>
  );
}
