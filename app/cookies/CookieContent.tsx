'use client';

import { motion } from 'motion/react';

export default function CookieContent() {
  return (
    <div className="p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Cookie Policy</h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>This website uses cookies to improve your experience while you navigate through the website.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. What are Cookies?</h2>
          <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. How I Use Cookies</h2>
          <p>I use cookies for several reasons, such as providing a better user experience, understanding how the website performs, and keeping the website secure.</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Managing Cookies</h2>
          <p>You can manage your cookie preferences through your browser settings. However, disabling some cookies may affect your browsing experience.</p>
        </div>
      </motion.div>
    </div>
  );
}
