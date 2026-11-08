'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ORCID_ID, ORCID_PROFILE, type Publication } from '@/lib/sources/orcid';
import { BookOpen, ExternalLink, FileText, Share2, Linkedin, Link as LinkIcon, Filter, ArrowUpDown, Quote, Copy, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const manualPublications: Publication[] = [
  {
    title: 'HEART-Net: An ultra-lightweight multimodal neural network for on-device cattle live-weight estimation and precision phytogenic dosing',
    year: '2026',
    url: 'https://doi.org/10.1016/j.atech.2026.102587',
    source: 'Smart Agricultural Technology',
    authors: 'Ashif Ahmed Shuvo, Sakibul Hasan, Abir Anjum, Asaduzzaman Shahed, Mohammad Al-Mamun',
    impactFactor: 7.2,
    type: 'Journal article',
    doi: '10.1016/j.atech.2026.102587'
  },
  {
    title: 'EinsteinNet and State-of-the-Art ML Models for Android-Based Orange Classification: Integration, Evaluation, and Deployment',
    year: '2025',
    url: 'https://doi.org/10.1016/j.atech.2025.101072',
    source: 'Smart Agricultural Technology',
    authors: 'Ashif Ahmed Shuvo, Wahada Jinnat Oishy Bhuian, Afzal Rahman, Abdullah Iqbal',
    impactFactor: 7.2,
    type: 'Journal article',
    doi: '10.1016/j.atech.2025.101072'
  },
  {
    title: 'Comparative Analysis of Regression Models for Commodity Price Prediction',
    year: '2025',
    url: 'https://doi.org/10.2139/ssrn.5248271',
    source: 'SSRN',
    authors: 'Ashif Ahmed Shuvo',
    impactFactor: 0,
    type: 'Preprint',
    doi: '10.2139/ssrn.5248271'
  },
  {
    title: 'Integration of Machine Learning in an Android Application for Automated Orange Identification and Classification',
    year: '2025',
    url: 'https://doi.org/10.2139/ssrn.5183017',
    source: 'SSRN',
    authors: 'Ashif Ahmed Shuvo, Wahada Jinnat Oishy Bhuian, Afzal Rahman, Abdullah Iqbal',
    impactFactor: 0,
    type: 'Preprint',
    doi: '10.2139/ssrn.5183017'
  },
  {
    title: 'Orange Fruit Image Dataset for Classification',
    year: '2026',
    url: 'https://data.mendeley.com/datasets/zk4hzhtcdd/2',
    source: 'Mendeley Data',
    authors: 'Ashif Shuvo, Most.Subrina Afrin Monika, Wahada Jinnat Oishy Bhuian',
    impactFactor: 0,
    type: 'Dataset',
    doi: '10.17632/ZK4HZHTCDD.2'
  },
  {
    title: 'Retail Market Price Dataset for Wheat Flour and Macroeconomic Indicators in Bangladesh',
    year: '2026',
    url: 'https://data.mendeley.com/datasets/5m4d33mxrs/1',
    source: 'Mendeley Data',
    authors: 'Ashif Ahmed Shuvo, Subrina Afrin Monika, Mahadi Abser Turza, Md. Asif Iqbal, Ismat Ara Begum, Mohammad Jahangir Alam',
    impactFactor: 0,
    type: 'Dataset',
    doi: '10.17632/5M4D33MXRS.1'
  },
  {
    title: 'CatalystLab: AI-Powered Research Brainstorming and Parallel Literature Discovery Platform',
    year: '2026',
    url: 'https://github.com/myself-aas/CatalystLab',
    source: 'Github',
    authors: 'Ashif Ahmed Shuvo',
    impactFactor: 0,
    type: 'Software',
    doi: '10.5281/ZENODO.19362937'
  },
  {
    title: 'SmartHerbo: A Privacy-First, On-Device Hybrid Neural-Biometric System for Precision Bovine Weight Estimation and Metabolic Nutritional Scaling',
    year: '2026',
    url: 'https://github.com/myself-aas/Smart-Herbo',
    source: 'Github',
    authors: 'Ashif Ahmed Shuvo',
    impactFactor: 0,
    type: 'Software',
    doi: '10.5281/ZENODO.19362814'
  },
  {
    title: 'Forecasting Wheat Flour Prices in Bangladesh to 2030: A Bayesian-Optimized XGBoost Framework with Structural Break Detection, Ensemble Methods, and Comprehensive Robustness Validation',
    year: '2026',
    url: '#',
    source: 'Manuscript under preparation',
    authors: 'Ashif Ahmed Shuvo, Subrina Afrin Monika, Mahadi Abser Turza, Md. Asif Iqbal, Ismat Ara Begum, Mohammad Jahangir Alam',
    impactFactor: 0,
    type: 'Manuscript'
  },
];

export default function Publications({
  works,
  limit,
  readAt = null,
}: {
  /** Every work on the ORCID record, read at build time. */
  works: Publication[];
  limit?: number;
  /** When the record was read; null when it could not be. */
  readAt?: string | null;
}) {
  const orcidPubs = works;

  const [sortBy, setSortBy] = useState<'year' | 'impactFactor'>('impactFactor');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [activeShare, setActiveShare] = useState<number | null>(null);
  const [activeCite, setActiveCite] = useState<number | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  // Helper to normalize title for fuzzy matching between ORCID and manual record
  const normalizeTitle = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Merge ORCID pubs with manual ones, avoiding duplicates by normalized title
  const combinedPubs = [...orcidPubs];
  manualPublications.forEach((manualPub) => {
    const manualNorm = normalizeTitle(manualPub.title);
    const existingIndex = combinedPubs.findIndex((p) => {
      const pNorm = normalizeTitle(p.title);
      return pNorm === manualNorm || (p.doi && manualPub.doi && p.doi.toLowerCase() === manualPub.doi.toLowerCase());
    });

    if (existingIndex === -1) {
      combinedPubs.push(manualPub);
    } else {
      // Keep ORCID live data and overlay rich manual metadata (e.g. Impact Factor or refined authors if missing)
      const existing = combinedPubs[existingIndex];
      combinedPubs[existingIndex] = {
        ...existing,
        ...manualPub,
        // Prefer live ORCID authors if available, fallback to manual authors
        authors: existing.authors || manualPub.authors,
        // Ensure impactFactor from manual record is preserved
        impactFactor: manualPub.impactFactor || existing.impactFactor || 0,
      };
    }
  });

  // Extract unique types and years for filtering
  const uniqueTypes = ['All', ...Array.from(new Set(combinedPubs.map(p => p.type).filter(Boolean))) as string[]];
  const uniqueYears = ['All', ...Array.from(new Set(combinedPubs.map(p => p.year).filter(Boolean))).sort((a, b) => parseInt(b) - parseInt(a)) as string[]];

  // Filter and Sort
  const filteredAndSortedPubs = combinedPubs
    .filter(pub => filterType === 'All' || pub.type === filterType)
    .filter(pub => filterYear === 'All' || pub.year === filterYear)
    .sort((a, b) => {
      if (sortBy === 'impactFactor') {
        return (b.impactFactor || 0) - (a.impactFactor || 0);
      }
      // Undated works sort last rather than producing NaN comparisons.
      const year = (publication: Publication) => Number.parseInt(publication.year, 10) || 0;
      return year(b) - year(a);
    });

  const displayedPubs = limit ? filteredAndSortedPubs.slice(0, limit) : filteredAndSortedPubs;

  const generateCitation = (pub: Publication, format: 'APA' | 'MLA' | 'BibTeX') => {
    const authors = pub.authors || 'Shuvo, Ashif Ahmed et al.';
    const year = pub.year || new Date().getFullYear().toString();
    const title = pub.title;
    const source = pub.source || 'Journal';
    const doi = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;

    switch (format) {
      case 'APA':
        return `${authors} (${year}). ${title}. ${source}. ${doi}`;
      case 'MLA':
        return `${authors}. "${title}." ${source}, ${year}. ${doi}`;
      case 'BibTeX':
        return `@article{shuvo${year}${title.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')},
  title={${title}},
  author={${authors}},
  journal={${source}},
  year={${year}},
  url={${doi}}
}`;
      default:
        return '';
    }
  };

  const copyCitation = (pub: Publication, format: 'APA' | 'MLA' | 'BibTeX') => {
    const citation = generateCitation(pub, format);
    navigator.clipboard.writeText(citation);
    setCopiedCitation(format);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const handleShare = (platform: string, pub: Publication) => {
    const text = `Check out this publication: ${pub.title}`;
    const url = pub.url !== '#' ? pub.url : window.location.href;

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
    setActiveShare(null);
  };

  const content = (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!limit && (
        <p className="datum mb-6 max-w-[62ch]">
          {readAt ? (
            <>
              Read from{' '}
              <a
                href={ORCID_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline"
              >
                ORCID {ORCID_ID}
              </a>{' '}
              on {formatDate(readAt, 'gb')}
              : {combinedPubs.length} {combinedPubs.length === 1 ? 'work' : 'works'} on the record —{' '}
              everything ORCID publishes. Works set to limited visibility stay private and cannot
              appear here.
            </>
          ) : (
            <>
              The ORCID record could not be read when this page was built, so only the curated list
              is shown. Everything on the record is at{' '}
              <a
                href={ORCID_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline"
              >
                orcid.org/{ORCID_ID}
              </a>
              .
            </>
          )}
        </p>
      )}

      {/* Controls: Filter & Sort - Hide if limited */}
      {!limit && (
        <div className={`mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sheet-panel p-4 rounded-[2px] border border-rule flex-wrap `}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-ink-soft" aria-hidden="true" />
              <label htmlFor="publication-type-filter" className="sr-only">
                Filter publications by type
              </label>
              <select
                id="publication-type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-sm font-medium text-ink focus:outline-none cursor-pointer"
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type} className="bg-paper text-ink">{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-rule pl-4">
              <label htmlFor="publication-year-filter" className="text-sm text-ink-soft">
                Year:
              </label>
              <select
                id="publication-year-filter"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="bg-transparent text-sm font-medium text-ink focus:outline-none cursor-pointer"
              >
                {uniqueYears.map(year => (
                  <option key={year} value={year} className="bg-paper text-ink">{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-ink-soft" aria-hidden="true" />
            <label htmlFor="publication-sort" className="sr-only">
              Sort publications
            </label>
            <select
              id="publication-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'year' | 'impactFactor')}
              className="bg-transparent text-sm font-medium text-ink focus:outline-none cursor-pointer"
            >
              <option value="impactFactor" className="bg-paper text-ink">Sort by Impact Factor</option>
              <option value="year" className="bg-paper text-ink">Sort by Year (Newest)</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {displayedPubs.map((pub, index) => (
              <motion.div
                key={index}
                layout
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col rounded-[2px] border border-rule bg-band p-6 transition dark:border-rule"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
                      <span className="inline-flex items-center gap-1 rounded-[2px] bg-signal-wash px-2.5 py-1 text-signal">
                        <BookOpen className="h-3 w-3" />
                        {pub.type || 'Publication'}
                      </span>
                      <span className="text-ink-soft dark:text-ink-soft">• {pub.year}</span>
                      {pub.impactFactor && pub.impactFactor > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-[2px] bg-band px-2.5 py-1 text-teal">
                          IF: {pub.impactFactor}
                        </span>
                      ) : null}
                    </div>
                    
                    <h2 className="text-lg font-semibold text-ink leading-tight mb-2">
                      {pub.title}
                    </h2>
                    
                    {pub.authors && (
                      <p className="text-sm text-ink-soft mb-3">
                        {pub.authors}
                      </p>
                    )}
                    
                    <div className="text-sm font-medium text-ink">
                      {pub.source}
                    </div>
                    {pub.doi && (
                      <div className="text-xs text-ink-soft dark:text-ink-soft mt-1">
                        DOI: {pub.doi}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    {/* Cite Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setActiveCite(activeCite === index ? null : index);
                          setActiveShare(null);
                        }}
                        className="p-2 text-ink-soft hover:text-teal hover:bg-band rounded-[2px] transition-colors"
                        aria-label="Cite"
                        title="Cite this publication"
                      >
                        <Quote className="h-5 w-5" />
                      </button>
                      
                      <AnimatePresence>
                        {activeCite === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-56 rounded-[2px] border border-rule bg-paper p-2 bg-band z-20"
                          >
                            <div className="datum mb-1 border-b border-rule px-3 py-2">
                              Copy Citation
                            </div>
                            {(['APA', 'MLA', 'BibTeX'] as const).map((format) => (
                              <button 
                                key={format}
                                onClick={() => copyCitation(pub, format)} 
                                className="flex w-full items-center justify-between rounded-[2px] px-3 py-2 text-sm text-ink hover:bg-band"
                              >
                                <span>{format}</span>
                                {copiedCitation === format ? (
                                  <Check className="h-4 w-4 text-teal" />
                                ) : (
                                  <Copy className="h-4 w-4 text-ink-soft" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Share Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setActiveShare(activeShare === index ? null : index);
                          setActiveCite(null);
                        }}
                        className="p-2 text-ink-soft hover:text-signal hover:bg-signal-wash rounded-[2px] transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                      
                      <AnimatePresence>
                        {activeShare === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 rounded-[2px] border border-rule bg-paper p-2 bg-band z-10"
                          >
                            <button onClick={() => handleShare('linkedin', pub)} className="flex w-full items-center gap-2 rounded-[2px] px-3 py-2 text-sm text-ink hover:bg-band">
                              <Linkedin className="h-4 w-4 text-signal-deep" /> LinkedIn
                            </button>
                            <button onClick={() => handleShare('copy', pub)} className="flex w-full items-center gap-2 rounded-[2px] px-3 py-2 text-sm text-ink hover:bg-band">
                              <LinkIcon className="h-4 w-4 text-ink-soft" /> Copy Link
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {pub.url !== '#' ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-[2px] bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal hover:text-paper"
                      >
                        Read Paper
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-[2px] bg-band px-5 py-2.5 text-sm font-medium text-ink-soft dark:text-ink-soft">
                        <FileText className="h-4 w-4" />
                        In Prep
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
      </div>
    </motion.div>
  );

  return content;
}
