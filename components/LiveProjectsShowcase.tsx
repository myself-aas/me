'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Radio, ArrowUpRight, Github, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export interface LiveProjectItem {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  url: string;
  githubUrl: string;
  coverImage: string;
  description: string;
  badgeText: string;
  metric1Label: string;
  metric1Val: string;
  metric2Label: string;
  metric2Val: string;
  techStack: string;
}

export const LIVE_PROJECTS: LiveProjectItem[] = [
  {
    id: 'hazardnet',
    name: 'HazardNet',
    tagline: 'Multi-Hazard Early Warning System',
    domain: 'hazardnet.live',
    url: 'https://hazardnet.live',
    githubUrl: 'https://github.com/myself-aas/HazardNet',
    coverImage: '/images/projects/hazardnet_cover.jpg',
    description:
      "Dated continuous 15-day daily hazard outlooks for Bangladesh's 64 districts: agricultural disaster risk reduction, open validation scorecard, and real-time climate alerts.",
    badgeText: '⭐ Featured Prime Pick',
    metric1Label: 'Coverage',
    metric1Val: '64 Districts',
    metric2Label: 'Forecast',
    metric2Val: '15-Day Outlook',
    techStack: 'Vite • React • PWA',
  },
  {
    id: 'catalystlab',
    name: 'CatalystLab',
    tagline: 'Six-Dimension Website & AI Health Audit',
    domain: 'catalystlab.tech',
    url: 'https://catalystlab.tech',
    githubUrl: 'https://github.com/myself-aas/CatalystLab',
    coverImage: '/images/projects/catalystlab_cover.jpg',
    description:
      'Automated site health audit across rendering efficiency, latency, security headers, carbon emissions, and AI readiness metrics with granular measurements.',
    badgeText: '⚡ AI Readiness Audit',
    metric1Label: 'Analysis',
    metric1Val: '6 Dimensions',
    metric2Label: 'Audit Speed',
    metric2Val: '< 28ms Latency',
    techStack: 'TypeScript • Gemini AI',
  },
  {
    id: 'researchwithme',
    name: 'ResearchWithMe',
    tagline: 'Open-Access Scholarly Reviews & Teardowns',
    domain: 'researchwith.me',
    url: 'https://researchwith.me',
    githubUrl: 'https://github.com/myself-aas/researchwithme',
    coverImage: '/images/projects/researchwithme_cover.jpg',
    description:
      'Open-access scholarly essays, reproducible paper reviews, citation network graphs, and rigorous repository teardowns from verified domain experts.',
    badgeText: '📚 Open Science Hub',
    metric1Label: 'Access',
    metric1Val: '100% Open',
    metric2Label: 'Standards',
    metric2Val: 'Reproducible',
    techStack: 'Next.js • Tailwind CSS',
  },
  {
    id: 'smartherbo',
    name: 'SmartHerbo',
    tagline: 'Neural Biometric Bovine Weight Scanner',
    domain: 'smartherbo.vercel.app',
    url: 'https://smartherbo.vercel.app',
    githubUrl: 'https://github.com/myself-aas/Smart-Herbo',
    coverImage: '/images/projects/smartherbo_cover.jpg',
    description:
      'Privacy-first, on-device hybrid neural-biometric system (HEART-Net) for single-view cattle live-weight estimation and metabolic phytogenic dosage scaling.',
    badgeText: '🌾 Precision Ag Tool',
    metric1Label: 'Field MAE',
    metric1Val: '5.1 kg (99.6%)',
    metric2Label: 'On-Device',
    metric2Val: '38ms INT8',
    techStack: 'Kotlin • PyTorch • TFLite',
  },
];

export default function LiveProjectsShowcase() {
  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule/70 pb-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-[560] text-ink flex items-center gap-2.5">
            <Radio className="h-5 w-5 text-emerald-500 animate-pulse" />
            <span>Live Deployed Applications</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink-soft mt-1">
            Production web apps, climate alert platforms, and research tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-emerald-500/10 px-3 py-1 text-xs font-sans font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            4 Live Production Systems
          </span>
        </div>
      </div>

      {/* Cards Grid - Styled directly inspired by the user's uploaded reference image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LIVE_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rule/80 bg-band shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-2xl"
          >
            {/* Visual Cover Banner Image Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
              <Image
                src={project.coverImage}
                alt={`${project.name} live application preview cover`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Dark Overlay Scrim Fading into Card Base */}
              <div className="absolute inset-0 bg-gradient-to-t from-band via-band/50 to-transparent" />

              {/* Floating Top Badge (Top-Left) */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-band/80 backdrop-blur-md px-3 py-1 text-xs font-sans font-medium text-ink border border-rule/80 shadow-xs">
                  {project.badgeText}
                </span>
              </div>

              {/* Top-Right Quick Visit Button */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name} at ${project.domain}`}
                  className="inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-xs font-sans font-medium text-paper shadow-md transition-transform hover:scale-105"
                >
                  <span>Launch</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card Content & Metric Table */}
            <div className="p-5 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
              <div>
                {/* Title & Tagline */}
                <div className="mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-[560] text-ink group-hover:text-signal transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <span className="font-mono text-xs font-normal text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      {project.domain}
                    </span>
                  </h3>
                  <p className="text-xs font-sans font-medium text-ink-soft mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3 mb-5">
                  {project.description}
                </p>
              </div>

              {/* Structured Metrics Grid (Matching attached design card layout) */}
              <div>
                <div className="grid grid-cols-2 gap-3 border-t border-rule/60 pt-4 pb-3">
                  <div className="border-r border-rule/60 pr-3">
                    <span className="block text-[10px] font-sans uppercase tracking-wider text-ink-soft">
                      {project.metric1Label}
                    </span>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {project.metric1Val}
                    </span>
                  </div>
                  <div className="pl-1">
                    <span className="block text-[10px] font-sans uppercase tracking-wider text-ink-soft">
                      {project.metric2Label}
                    </span>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {project.metric2Val}
                    </span>
                  </div>
                </div>

                {/* Card Bottom Attribution Bar */}
                <div className="flex items-center justify-between border-t border-rule/60 pt-3 mt-1 text-xs font-sans">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-medium text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal transition-colors flex items-center gap-1"
                  >
                    <span>{project.domain}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
