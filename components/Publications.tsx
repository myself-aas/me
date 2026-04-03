'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ExternalLink, FileText, Share2, Linkedin, Link as LinkIcon, Filter, ArrowUpDown, Quote, Copy, Check } from 'lucide-react';

interface Publication {
  title: string;
  year: string;
  url: string;
  source: string;
  authors?: string;
  impactFactor?: number;
  type?: string;
  doi?: string;
}

const manualPublications: Publication[] = [
  {
    title: 'EinsteinNet and State-of-the-Art ML Models for Android-Based Orange Classification: Integration, Evaluation, and Deployment',
    year: '2025',
    url: 'https://doi.org/10.1016/j.atech.2025.101072',
    source: 'Smart Agricultural Technology',
    authors: 'Shuvo, Ashif Ahmed, Bhuian, Wahada Jinnat Oishy, Rahman, Afzal, Iqbal, Abdullah',
    impactFactor: 5.7,
    type: 'Journal Article',
    doi: '10.1016/j.atech.2025.101072'
  },
  {
    title: 'Comparative Analysis of Regression Models for Commodity Price Prediction',
    year: '2025',
    url: 'https://doi.org/10.2139/ssrn.5248271',
    source: 'SSRN',
    authors: 'Shuvo, Ashif Ahmed',
    impactFactor: 0,
    type: 'Preprint',
    doi: '10.2139/ssrn.5248271'
  },
  {
    title: 'Integration of Machine Learning in an Android Application for Automated Orange Identification and Classification',
    year: '2025',
    url: 'https://doi.org/10.2139/ssrn.5183017',
    source: 'SSRN',
    authors: 'Shuvo, Ashif Ahmed, Bhuian, Wahada Jinnat Oishy, Rahman, Afzal and Iqbal, Abdullah',
    impactFactor: 0,
    type: 'Preprint',
    doi: '10.2139/ssrn.5183017'
  },
  {
    title: 'Forecasting Wheat Flour Prices in Bangladesh to 2030: A Bayesian-Optimized XGBoost Framework with Structural Break Detection, Ensemble Methods, and Comprehensive Robustness Validation',
    year: '2026',
    url: '#',
    source: 'Manuscript under preparation',
    authors: 'Shuvo, Ashif Ahmed, Monika, Subrina Afrin, Turza, Mahadi Abser, Iqbal, Md. Asif, Begum, Ismat Ara, Alam, Mohammad Jahangir',
    impactFactor: 0,
    type: 'Manuscript'
  },
  {
    title: 'Deep Learning-Based Weight Prediction for Indigenous Pabna Cattle: A Comparative Analysis of Seven CNN Architectures with TensorFlow.js Deployment and Metabolically-Scaled Phytogenic Supplement Integration (Smart-Herbo)',
    year: '2026',
    url: '#',
    source: 'Manuscript under preparation',
    authors: 'Shuvo, Ashif Ahmed, Hasan, Sakibul, Anjum, Abir, Shahed, Asaduzzaman, Al-Mamun, Mohammad, Al-Mamun, Mohammad',
    impactFactor: 0,
    type: 'Manuscript'
  },
];

export default function Publications({ isEmbedded = false, limit }: { isEmbedded?: boolean, limit?: number }) {
  const [orcidPubs, setOrcidPubs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'year' | 'impactFactor'>('impactFactor');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [activeShare, setActiveShare] = useState<number | null>(null);
  const [activeCite, setActiveCite] = useState<number | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrcid = async () => {
      try {
        const res = await fetch('https://pub.orcid.org/v3.0/0009-0003-5734-1519/works', {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch ORCID data');
        const data = await res.json();
        
        if (data && data.group) {
          const fetchedPubs: Publication[] = data.group.map((group: any) => {
            const workSummary = group['work-summary'][0];
            const extIds = workSummary['external-ids']?.['external-id'] || [];
            const doiObj = extIds.find((id: any) => id['external-id-type'] === 'doi');
            const doi = doiObj ? doiObj['external-id-value'] : undefined;

            return {
              title: workSummary.title?.title?.value || 'Untitled',
              year: workSummary['publication-date']?.year?.value || 'Unknown',
              url: workSummary.url?.value || (doi ? `https://doi.org/${doi}` : '#'),
              source: workSummary['journal-title']?.value || 'ORCID',
              type: workSummary.type || 'Journal Article',
              doi: doi,
              impactFactor: 0, // ORCID doesn't provide IF natively
              authors: 'Ashif Ahmed Shuvo et al.',
            };
          });
          setOrcidPubs(fetchedPubs);
        }
      } catch (error) {
        console.error('Failed to fetch ORCID data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrcid();
  }, []);

  // Merge ORCID pubs with manual ones, avoiding duplicates by title
  const combinedPubs = [...orcidPubs];
  manualPublications.forEach((manualPub) => {
    const exists = combinedPubs.some((p) => p.title.toLowerCase() === manualPub.title.toLowerCase());
    if (!exists) {
      combinedPubs.push(manualPub);
    } else {
      // If it exists in ORCID, update it with our rich manual metadata (like IF and authors)
      const index = combinedPubs.findIndex((p) => p.title.toLowerCase() === manualPub.title.toLowerCase());
      combinedPubs[index] = { ...combinedPubs[index], ...manualPub };
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
      return parseInt(b.year) - parseInt(a.year);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isEmbedded && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Publications & Writings</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Automatically synced with ORCID (0009-0003-5734-1519)
          </p>
        </div>
      )}

      {/* Controls: Filter & Sort - Hide if limited */}
      {!limit && (
        <div className={`mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row glass-card p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm flex-wrap ${isEmbedded ? 'mx-4' : ''}`}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none dark:text-gray-300 cursor-pointer"
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type} className="dark:bg-gray-900">{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-white/20 dark:border-white/10 pl-4">
              <span className="text-sm text-gray-500">Year:</span>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none dark:text-gray-300 cursor-pointer"
              >
                {uniqueYears.map(year => (
                  <option key={year} value={year} className="dark:bg-gray-900">{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'year' | 'impactFactor')}
              className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none dark:text-gray-300 cursor-pointer"
            >
              <option value="impactFactor" className="dark:bg-gray-900">Sort by Impact Factor</option>
              <option value="year" className="dark:bg-gray-900">Sort by Year (Newest)</option>
            </select>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading publications...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {displayedPubs.map((pub, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col rounded-2xl border border-white/20 bg-white/40 p-6 shadow-sm transition hover:shadow-md backdrop-blur-md dark:border-white/10 dark:bg-black/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <BookOpen className="h-3 w-3" />
                        {pub.type || 'Publication'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">• {pub.year}</span>
                      {pub.impactFactor && pub.impactFactor > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          IF: {pub.impactFactor}
                        </span>
                      ) : null}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2">
                      {pub.title}
                    </h3>
                    
                    {pub.authors && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {pub.authors}
                      </p>
                    )}
                    
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      {pub.source}
                    </div>
                    {pub.doi && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
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
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors dark:hover:bg-green-900/30 dark:hover:text-green-400"
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
                            className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900 z-20"
                          >
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 mb-1">
                              Copy Citation
                            </div>
                            {(['APA', 'MLA', 'BibTeX'] as const).map((format) => (
                              <button 
                                key={format}
                                onClick={() => copyCitation(pub, format)} 
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                              >
                                <span>{format}</span>
                                {copiedCitation === format ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-400" />
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
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
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
                            className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900 z-10"
                          >
                            <button onClick={() => handleShare('linkedin', pub)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                              <Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn
                            </button>
                            <button onClick={() => handleShare('copy', pub)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                              <LinkIcon className="h-4 w-4 text-gray-500" /> Copy Link
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
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                      >
                        Read Paper
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
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
      )}
    </motion.div>
  );

  return (
    <>
      {isEmbedded ? (
        <div className="p-6">{content}</div>
      ) : (
        <section id="publications" className="bg-gray-100 py-20 dark:bg-gray-900/50 min-h-screen">
          <div className="container mx-auto max-w-5xl px-4">
            {content}
          </div>
        </section>
      )}
    </>
  );
}
