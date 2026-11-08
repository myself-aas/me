'use client';

import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { SOCIAL_PROFILES, type SocialProfile } from '@/lib/socials';

export function SocialIcon({ id, className = 'w-4 h-4' }: { id: string; className?: string }) {
  switch (id) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'email':
      return <Mail className={className} />;
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case 'scholar':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-2a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM5.242 8.009l1.494-1.12.001 7.151a1 1 0 0 1-1.6.8l-4.5-3.375a1 1 0 0 1 0-1.6l4.605-3.856zm13.516 0l4.605 3.856a1 1 0 0 1 0 1.6l-4.5 3.375a1 1 0 0 1-1.6-.8l.001-7.151 1.494 1.12zM12 0l11.4 6.84a1 1 0 0 1 0 1.72L12 15.4 0.6 8.56a1 1 0 0 1 0-1.72L12 0z" />
        </svg>
      );
    case 'researchgate':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M19.586 0c-.818 0-1.508.23-2.071.69-.563.46-.844 1.123-.844 1.99 0 .825.27 1.488.81 1.99.54.502 1.22.753 2.04.753.864 0 1.565-.246 2.102-.738.537-.492.805-1.168.805-2.028 0-.846-.275-1.503-.825-1.972C21.053.217 20.366 0 19.586 0zM1.465 6.012v17.988h3.396V6.012H1.465zm7.367 0v17.988h3.396v-8.243c0-1.892.385-3.268 1.155-4.128.77-.86 1.83-1.29 3.18-1.29 1.134 0 2.022.316 2.664.948.642.632.963 1.564.963 2.796v9.917h3.396V13.5c0-2.225-.563-3.95-1.688-5.176C20.77 7.098 19.167 6.485 17.067 6.485c-1.815 0-3.284.582-4.407 1.746V6.012H8.832z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'kaggle':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M18.825 23.859h-3.48l-5.714-8.087-2.614 2.446v5.641H4.01V.141h3.007v12.22l7.697-12.22h3.805l-7.79 11.517 8.106 12.201z" />
        </svg>
      );
    case 'huggingface':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 17.5c-2.33 0-4.31-1.47-5.1-3.5h10.2c-.79 2.03-2.77 3.5-5.1 3.5z" />
        </svg>
      );
    case 'bluesky':
      return (
        <svg viewBox="0 0 568 501" className={`${className} fill-current`} aria-hidden="true">
          <path d="M123.121 33.664c50.254 37.766 104.28 114.619 160.879 174.654 56.6-60.035 110.625-136.888 160.879-174.654 36.196-27.199 94.752-48.242 94.752 18.232 0 13.332-7.664 109.844-12.164 125.864-15.652 55.782-72.774 70.078-123.633 61.426 89.289 15.223 112.012 65.176 62.91 115.547-93.18 95.602-140.719-23.98-158.744-61.426-3.859-8.024-4.887-10.156-4.004-8.024-18.024 37.446-65.563 157.028-158.744 61.426-49.102-50.371-26.379-100.324 62.91-115.547-50.859 8.652-107.981-5.644-123.633-61.426C18.672 161.74 11.008 65.228 11.008 51.896c0-66.474 58.556-45.431 94.752-18.232z" />
        </svg>
      );
    case 'orcid':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.8 5.016-5.353 5.016h-3.891V7.416zm1.444 1.303v7.434h2.363c2.475 0 3.825-1.5 3.825-3.713 0-2.072-1.209-3.721-3.76-3.721h-2.428z" />
        </svg>
      );
    default:
      return <GraduationCap className={className} />;
  }
}

/**
 * Minimalist favicon icon-only bar for social and research platforms.
 * Completely eliminates heavy/dense components and text blocks.
 */
export function SocialIconBar({
  className = '',
  size = 'md',
  profiles = SOCIAL_PROFILES,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  profiles?: SocialProfile[];
}) {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const containerPadding = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {profiles.map((profile) => (
        <a
          key={profile.id}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${profile.name} (${profile.handle})`}
          aria-label={`${profile.name} (${profile.handle})`}
          className={`group relative flex items-center justify-center rounded-[2px] border border-rule/60 bg-band/70 text-ink-soft hover:border-signal hover:bg-signal/15 hover:text-signal transition-all ${containerPadding[size]}`}
        >
          <SocialIcon id={profile.id} className={`${iconSizes[size]} transition-transform duration-150 group-hover:scale-110`} />
        </a>
      ))}
    </div>
  );
}

/**
 * Clean, minimal favicon badge list with subtle text handle pills — no dense cards or heavy text.
 */
export function SocialProfilesGrid({ profiles = SOCIAL_PROFILES }: { profiles?: SocialProfile[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 my-4">
      {profiles.map((profile) => (
        <a
          key={profile.id}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${profile.name} (${profile.handle})`}
          className="group flex items-center gap-2.5 rounded-[2px] border border-rule/60 bg-band/60 px-3 py-2 transition-all hover:border-signal hover:bg-band hover:shadow-xs"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-paper text-ink-soft border border-rule/50 group-hover:bg-signal group-hover:text-paper group-hover:border-signal transition-colors">
            <SocialIcon id={profile.id} className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="font-sans text-xs font-medium text-ink block truncate group-hover:text-signal transition-colors">
              {profile.name}
            </span>
            <span className="font-mono text-[10px] text-ink-soft/80 block truncate">
              {profile.handle}
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-ink-soft/40 group-hover:text-signal transition-colors shrink-0" />
        </a>
      ))}
    </div>
  );
}

/**
 * Backwards compatible export for SocialLinksRow.
 */
export const SocialLinksRow = SocialIconBar;
