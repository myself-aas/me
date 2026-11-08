'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';

interface NewsletterSubscriptionProps {
  variant?: 'banner' | 'compact' | 'inline';
  title?: string;
  description?: string;
  className?: string;
}

export default function NewsletterSubscription({
  variant = 'banner',
  title = 'Subscribe to Research Thoughts',
  description = 'Get notified when new field notes, technical essays, and precision agrometeorology research articles are published.',
  className = '',
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, topic: 'research-thoughts' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setSuccessMessage(data.message || 'Subscribed successfully! Thank you for following the research.');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`rounded-[2px] border border-rule bg-band p-4 ${className}`}>
        <div className="flex items-center gap-2 text-sm font-semibold text-ink mb-1">
          <Mail className="h-4 w-4 text-signal shrink-0" />
          <span>Newsletter Updates</span>
        </div>
        <p className="text-xs text-ink-soft mb-3 leading-relaxed">
          Subscribe for email alerts on new research thoughts.
        </p>

        {status === 'success' ? (
          <div className="rounded-[2px] bg-signal-wash p-3 text-xs text-signal border border-signal/20 space-y-2">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
              <span>Subscribed!</span>
            </div>
            <p className="text-[11px] text-ink-soft leading-tight">{successMessage}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-[10px] font-semibold text-signal underline hover:text-signal-deep cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="email"
                required
                aria-label="Email address for newsletter subscription"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                className="w-full px-3 py-1.5 text-xs rounded-[2px] border border-rule bg-paper text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex w-full items-center justify-center gap-1.5 rounded-[2px] bg-signal px-3 py-1.5 text-xs font-semibold text-paper hover:bg-signal-deep focus:outline-none focus:ring-2 focus:ring-signal disabled:opacity-70 transition-all cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="h-3 w-3" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[2px] border border-rule bg-band p-6 sm:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-[2px] bg-signal-wash px-2.5 py-1 text-xs font-medium text-signal">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Stay Updated</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-[560] text-ink leading-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            {description}
          </p>
        </div>

        <div className="w-full md:w-80 shrink-0">
          {status === 'success' ? (
            <div className="rounded-[2px] bg-signal-wash p-4 text-xs text-signal border border-signal/20 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-medium text-sm text-ink">
                <CheckCircle2 className="h-5 w-5 text-teal shrink-0" />
                <span>Subscription Confirmed!</span>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">{successMessage}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-1 text-xs font-semibold text-signal underline hover:text-signal-deep cursor-pointer"
              >
                Subscribe another email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  aria-label="Email address for research thoughts newsletter"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className="block w-full pl-9 pr-3 py-2.5 text-sm rounded-[2px] border border-rule bg-paper text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400 pl-0.5">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-signal px-5 py-2.5 text-sm font-semibold text-paper hover:bg-signal-deep focus:outline-none focus:ring-2 focus:ring-signal disabled:opacity-70 transition-all cursor-pointer shadow-xs"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe to Updates</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-ink-soft text-center leading-tight">
                No spam. Unsubscribe anytime with one click.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
