'use client';

import { useEffect, useMemo, useState } from 'react';
import { Github, Star, GitFork, Code, Search, X, ExternalLink, Share2, Mail, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRemote } from '@/lib/remote';
import { loadProjects, type Project } from '@/lib/sources/github';

const NO_PROJECTS: Project[] = [];

export default function GitHubProjects({ limit }: { limit?: number }) {
  const remote = useRemote(loadProjects);
  const projects = remote.status === 'ready' ? remote.data : NO_PROJECTS;

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

  const filteredProjects = projects.filter(project => {
    const matchesLanguage = filter === 'All' || project.language === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLanguage && matchesSearch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  if (remote.status === 'pending') {
    return (
      <p className="py-10 text-center text-ink-soft" role="status">
        Loading projects from GitHub…
      </p>
    );
  }

  const content = (
    <>
      {/* Search Bar - Only show if not limited (i.e., on main projects page) */}
      {!limit && (
        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-ink-soft" />
            </div>
            <input
              type="search"
              aria-label="Search projects by name, description or language"
              className="block w-full pl-10 pr-3 py-3 border border-rule rounded-[2px] leading-5 bg-band placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-signal focus:border-signal sm:text-sm transition duration-150 ease-in-out dark:border-rule dark:text-paper"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filter Buttons - Only show if not limited */}
      {!limit && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {languages.map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setFilter(lang)}
              animate={{ 
                scale: filter === lang ? 1.05 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-[2px] px-4 py-1.5 text-xs font-medium transition-all border ${
                filter === lang
                  ? 'bg-signal text-paper bg-signal border-transparent'
                  : 'bg-band text-ink hover:bg-band bg-band text-ink hover:bg-band border-rule'
              }`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-4">
        <AnimatePresence initial={false}>
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="flex cursor-pointer flex-col justify-between rounded-[2px] border border-rule bg-band p-5 transition-all dark:border-rule overflow-hidden"
            >
              <div className="overflow-hidden">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
                  <Github className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-2 leading-tight">{project.name}</span>
                </h2>
                <p className="mt-2 text-xs text-ink-soft line-clamp-3 break-words">
                  {project.description || 'No description provided.'}
                </p>
                
                {project.topics && project.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.topics.slice(0, 2).map(topic => (
                      <span key={topic} className="rounded-[2px] bg-signal-wash/50 px-2 py-0.5 text-[10px] font-medium text-signal bg-signal-wash">
                        {topic}
                      </span>
                    ))}
                    {project.topics.length > 2 && (
                      <span className="rounded-[2px] bg-band/50 px-2 py-0.5 text-[10px] font-medium text-ink-soft dark:text-ink-soft">
                        +{project.topics.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 dark:border-rule">
                <div className="flex items-center gap-3 text-[10px] text-ink-soft dark:text-ink-soft">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {project.forks}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.language && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-signal">
                      <Code className="h-3 w-3" />
                      {project.language}
                    </span>
                  )}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareMenuOpen(shareMenuOpen === project.id ? null : project.id);
                      }}
                      className="p-1.5 rounded-[2px] hover:bg-band dark:hover:bg-paper/10 transition-colors"
                    >
                      <Share2 className="h-3 w-3 text-ink-soft dark:text-ink-soft" />
                    </button>
                    {shareMenuOpen === project.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-32 rounded-[2px] border border-rule bg-paper p-2 dark:border-rule z-20">
                        <a
                          href={`mailto:?subject=Check out this project: ${project.name}&body=Check out this project: ${project.url}`}
                          className="flex items-center gap-2 rounded-[2px] px-3 py-2 text-xs text-ink hover:bg-band"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-3 w-3" /> Email
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-[2px] px-3 py-2 text-xs text-ink hover:bg-band"
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
    </>
  );

  return (
    <>
      {content}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-band"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2px] border border-rule bg-paper dark:border-rule"
            >
              <div className="flex items-center justify-between border-b border-rule px-6 py-4 dark:border-rule">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <Github className="h-6 w-6" />
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-[2px] p-2 text-ink-soft hover:bg-band hover:text-ink dark:text-ink-soft transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-base text-ink mb-6">
                  {selectedProject.description || 'No detailed description provided for this repository.'}
                </p>

                {selectedProject.topics && selectedProject.topics.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-ink mb-3">Topics & Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.topics.map(topic => (
                        <span key={topic} className="rounded-[2px] bg-signal-wash/50 px-3 py-1 text-sm font-medium text-signal bg-signal-wash border border-rule">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-6 mb-8">
                  {selectedProject.language && (
                    <div>
                      <h4 className="text-sm font-semibold text-ink mb-1">Primary Language</h4>
                      <span className="flex items-center gap-1 text-sm text-ink-soft">
                        <Code className="h-4 w-4" />
                        {selectedProject.language}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-1">Stats</h4>
                    <div className="flex items-center gap-4 text-sm text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {selectedProject.stars} Stars
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {selectedProject.forks} Forks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-[2px] bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink dark:bg-paper dark:text-ink dark:hover:bg-band transition-all"
                  >
                    <Github className="h-4 w-4" />
                    View Source
                  </a>
                  {selectedProject.homepage && (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-[2px] border border-rule bg-band px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper/70 dark:border-rule hover:bg-band transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
