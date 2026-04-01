'use client';

import { motion } from 'motion/react';

export default function AccessibilityContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Accessibility</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>I am committed to making this website accessible to everyone, including people with disabilities.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Commitment</h2>
          <p>I strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which are the industry standard for web accessibility.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Features</h2>
          <p>I have implemented features such as keyboard navigation, screen reader compatibility, and high-contrast styling to improve accessibility.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Feedback</h2>
          <p>If you have any feedback or encounter any accessibility barriers on this website, please contact me through the contact form.</p>
        </div>
      </motion.div>
    </div>
  );
}
