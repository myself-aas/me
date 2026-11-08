'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SubscribeThoughts() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="my-14 rounded-[2px] border border-rule bg-band p-6 sm:p-8 shadow-xs">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 rounded-[2px] bg-signal-wash px-2.5 py-1 text-xs font-sans font-medium text-signal mb-3 border border-signal/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Research Dispatch</span>
        </div>

        <h3 className="font-serif text-2xl font-[560] text-ink mb-2">
          Subscribe to New Thoughts
        </h3>

        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-6">
          Receive occasional field notes, computer vision notes, and agro-meteorological research write-ups directly in your inbox. No spam. Unsubscribe anytime.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 bg-paper/55 border border-rule rounded-[2px]"
            >
              <CheckCircle2 className="h-8 w-8 text-teal mb-2" />
              <h4 className="font-serif text-base font-semibold text-ink">You are subscribed!</h4>
              <p className="text-xs text-ink-soft mt-1">
                Thank you for subscribing. You will be notified when new research notes are published.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-ink-soft" />
                </div>
                <input
                  type="email"
                  required
                  aria-label="Email address for research notes subscription"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-rule rounded-[2px] leading-5 bg-paper placeholder:text-ink-soft text-ink focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal text-xs sm:text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-signal px-5 py-2.5 text-xs sm:text-sm font-sans font-medium text-paper hover:bg-signal-deep transition-colors disabled:opacity-70 cursor-pointer shrink-0"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
