'use client';

import { useEffect, useMemo, useState } from 'react';
import { Github, Star, GitFork, Code, Search, ExternalLink, Share2, Mail, Linkedin, Globe, Radio, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRemote } from '@/lib/remote';
import { loadProjects, FEATURED_LIVE_PROJECTS, type Project } from '@/lib/sources/github';

const NO_PROJECTS: Project[] = [];

export default function GitHubProjects({ limit }: { limit?: number }) {
  const remote = useRemote(loadProjects);
  const projects = remote.status === 'ready' && remote.data.length > 0 ? remote.data : FEATURED_LIVE_PROJECTS;

  const languages = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((repo) => repo.language).filter(Boolean)))],
    [projects],
  );

  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setShareMenuOpen(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesLanguage = filter === 'All' || project.language === filter;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.homepage && project.homepage.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.topics && project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesLanguage && matchesSearch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  if (remote.status === 'pending') {
    return (
      <p className="py-10 text-center text-ink-soft" role="status">
        Loading live projects and repositories…
      </p>
    );
  }

  return (
    <>
      {/* Featured Live Web Applications Banner - Only show on full projects page (!limit) */}
      {!limit && (
        <section className="mb-10 rounded-[2px] border border-rule bg-band/50 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-rule/60 pb-3">
            <div>
              <h2 className="font-serif text-lg font-[560] text-ink flex items-center gap-2">
                <Radio className="h-4 w-4 text-emerald-500 animate-pulse" />
                <span>Live Web Applications</span>
              </h2>
              <p className="text-xs text-ink-soft mt-0.5">
                Deployed production systems and active web platforms
              </p>
            </div>
            <span className="rounded-[2px] bg-emerald-500/10 px-2.5 py-1 text-[11px] font-sans font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              4 Production Apps Online
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURED_LIVE_PROJECTS.map((liveApp) => (
              <a
                key={liveApp.id}
                href={liveApp.homepage || liveApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-[2px] border border-rule bg-band p-3.5 transition-all hover:border-signal hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-1.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                      {liveApp.domainName}
                    </span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="font-serif text-sm font-[560] text-ink group-hover:text-signal transition-colors line-clamp-1">
                    {liveApp.name}
                  </h3>
                  <p className="text-[11px] text-ink-soft line-clamp-2 mt-1 leading-relaxed">
                    {liveApp.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-rule/40 flex items-center justify-between text-[10px] text-ink-soft">
                  <span className="font-mono text-signal">{liveApp.language}</span>
                  <span className="font-medium text-ink group-hover:text-signal transition-colors">
                    Launch App ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search Bar & Filters */}
      {!limit && (
        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-ink-soft" />
            </div>
            <input
              type="search"
              aria-label="Search projects by name, description or language"
              className="block w-full pl-10 pr-3 py-2.5 border border-rule rounded-[2px] leading-5 bg-band placeholder:text-ink-soft text-ink focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal text-sm transition-all"
              placeholder="Search projects by name, domain or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {!limit && languages.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {languages.map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setFilter(lang)}
              animate={{ scale: filter === lang ? 1.05 : 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-[2px] px-3.5 py-1 text-xs font-medium transition-all border ${
                filter === lang
                  ? 'bg-signal text-paper border-transparent'
                  : 'bg-band text-ink hover:border-ink border-rule'
              }`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence initial={false}>
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer flex-col justify-between rounded-[2px] border border-rule bg-band p-5 transition-all hover:border-signal"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="flex items-center gap-2 font-serif text-lg font-[560] text-ink group-hover:text-signal transition-colors">
                    <Github className="h-4 w-4 shrink-0 text-ink-soft" />
                    <span className="line-clamp-1">{project.name}</span>
                  </h3>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 rounded-[2px] bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 hover:bg-emerald-500/20 transition-colors"
                      title={`Visit ${project.homepage}`}
                    >
                      <Globe className="h-3 w-3" />
                      <span>{project.domainName || 'Live App'}</span>
                    </a>
                  )}
                </div>

                <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed mb-4">
                  {project.description || 'No description provided.'}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-[2px] bg-signal-wash px-2 py-0.5 text-[10px] font-sans font-medium text-signal border border-signal/20"
                      >
                        {topic}
                      </span>
                    ))}
                    {project.topics.length > 3 && (
                      <span className="rounded-[2px] bg-band px-2 py-0.5 text-[10px] font-sans text-ink-soft border border-rule">
                        +{project.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-rule/60 pt-3 text-[11px] text-ink-soft">
                <div className="flex items-center gap-3">
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      {project.stars}
                    </span>
                  )}
                  {project.forks > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {project.forks}
                    </span>
                  )}
                  {project.language && (
                    <span className="flex items-center gap-1 font-mono text-signal">
                      <Code className="h-3 w-3" />
                      {project.language}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-sans font-medium text-signal hover:underline"
                    >
                      <span>Live App</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareMenuOpen(shareMenuOpen === project.id ? null : project.id);
                      }}
                      className="p-1 rounded-[2px] hover:bg-band text-ink-soft hover:text-ink transition-colors"
                      aria-label="Share project"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    {shareMenuOpen === project.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-32 rounded-[2px] border border-rule bg-paper p-1.5 shadow-md z-20">
                        <a
                          href={`mailto:?subject=Check out ${project.name}&body=Check out ${project.url}`}
                          className="flex items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-xs text-ink hover:bg-band"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-3 w-3" /> Email
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            project.homepage || project.url
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-xs text-ink hover:bg-band"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-3 w-3" /> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2px] border border-rule bg-paper p-6 shadow-xl z-10"
            >
              <div className="flex items-center justify-between border-b border-rule pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-serif font-[560] text-ink flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    {selectedProject.name}
                  </h2>
                  {selectedProject.domainName && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      <Radio className="h-3 w-3 animate-pulse" />
                      <span>{selectedProject.domainName}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-[2px] p-1.5 text-ink-soft hover:bg-band hover:text-ink transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-ink leading-relaxed">
                  {selectedProject.description || 'No detailed description available.'}
                </p>

                {selectedProject.topics && selectedProject.topics.length > 0 && (
                  <div>
                    <h4 className="text-xs font-sans uppercase font-semibold text-ink-soft mb-2">
                      Research Domain & Topics
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-[2px] bg-signal-wash px-2.5 py-1 text-xs font-sans font-medium text-signal border border-signal/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-6 pt-2 border-t border-rule/60 text-xs text-ink-soft">
                  {selectedProject.language && (
                    <div>
                      <span className="block text-[11px] font-sans uppercase text-ink-soft mb-0.5">
                        Language
                      </span>
                      <span className="font-mono text-ink font-medium">{selectedProject.language}</span>
                    </div>
                  )}
                  {selectedProject.stars > 0 && (
                    <div>
                      <span className="block text-[11px] font-sans uppercase text-ink-soft mb-0.5">
                        Stars
                      </span>
                      <span className="font-mono text-ink font-medium">{selectedProject.stars}</span>
                    </div>
                  )}
                  {selectedProject.forks > 0 && (
                    <div>
                      <span className="block text-[11px] font-sans uppercase text-ink-soft mb-0.5">
                        Forks
                      </span>
                      <span className="font-mono text-ink font-medium">{selectedProject.forks}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-rule">
                  {selectedProject.homepage && (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[2px] bg-signal px-5 py-2.5 text-xs font-sans font-medium text-paper hover:bg-signal-deep transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Launch Live Web Application</span>
                    </a>
                  )}
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[2px] border border-rule bg-band px-5 py-2.5 text-xs font-sans font-medium text-ink hover:border-signal transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View GitHub Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
