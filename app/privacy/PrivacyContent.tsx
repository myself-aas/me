'use client';

import { motion } from 'motion/react';

export default function PrivacyContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Privacy Policy</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>Your privacy is important to me. This policy explains how I handle any information collected on this website.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Information Collection</h2>
          <p>I only collect information about you if I have a reason to do so—for example, to provide services, to communicate with you, or to make my website better.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Use of Information</h2>
          <p>I use the information I collect to provide, maintain, and improve the website, as well as to communicate with you about updates and other information.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Data Security</h2>
          <p>I implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Third-Party Disclosure</h2>
          <p>I do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless I provide users with advance notice.</p>
        </div>
      </motion.div>
    </div>
  );
}
