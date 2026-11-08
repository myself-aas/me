'use client';

import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CopyLinkButtonProps {
  url?: string;
  className?: string;
}

export default function CopyLinkButton({ url, className = '' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      const linkToCopy = url || (typeof window !== 'undefined' ? window.location.href : '');
      if (!linkToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(linkToCopy);
      } else {
        // Fallback for non-HTTPS or legacy browsers
        const textarea = document.createElement('textarea');
        textarea.value = linkToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setShowToast(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);

      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    } catch {
      console.error('Failed to copy URL');
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-xs font-sans font-medium transition-all cursor-pointer ${
          copied
            ? 'border-teal bg-teal/10 text-teal'
            : 'border-rule bg-band text-ink-soft hover:border-signal hover:text-signal hover:bg-band/80'
        }`}
        title="Copy article link to clipboard"
        aria-label="Copy article link to clipboard"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-teal shrink-0" />
            <span>Link Copied</span>
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5 shrink-0" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Temporary Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="status"
            aria-live="polite"
            className="absolute right-0 top-full mt-2 z-30 flex items-center gap-2 whitespace-nowrap rounded-[2px] border border-teal/50 bg-paper px-3 py-1.5 text-xs font-sans text-ink shadow-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
