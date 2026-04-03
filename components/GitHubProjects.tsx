'use client';

import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Code, Search, X, ExternalLink, Share2, Mail, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export default function GitHubProjects({ isEmbedded = false, limit }: { isEmbedded?: boolean, limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [languages, setLanguages] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setShareMenuOpen(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/myself-aas/repos?sort=updated')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub projects');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
          const uniqueLanguages = Array.from(
            new Set(data.map((repo: any) => repo.language).filter(Boolean))
          ) as string[];
          setLanguages(['All', ...uniqueLanguages]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch GitHub projects:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesLanguage = filter === 'All' || project.language === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLanguage && matchesSearch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  if (loading) return <div className="py-10 text-center text-gray-500">Loading projects...</div>;

  const content = (
    <>
      {!isEmbedded && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Open source contributions and personal projects</p>
        </div>
      )}

      {/* Search Bar - Only show if not limited (i.e., on main projects page) */}
      {!limit && (
        <div className={`mx-auto mb-8 max-w-md ${isEmbedded ? 'px-4' : ''}`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl leading-5 bg-white/50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out dark:bg-black/50 dark:border-white/10 dark:text-white shadow-sm backdrop-blur-sm"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filter Buttons - Only show if not limited */}
      {!limit && (
        <div className={`mb-8 flex flex-wrap justify-center gap-2 ${isEmbedded ? 'px-4' : ''}`}>
          {languages.map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setFilter(lang)}
              animate={{ 
                scale: filter === lang ? 1.05 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all backdrop-blur-sm border ${
                filter === lang
                  ? 'bg-blue-600/90 text-white dark:bg-blue-500/90 shadow-md border-transparent'
                  : 'bg-white/40 text-gray-700 hover:bg-white/60 dark:bg-black/40 dark:text-gray-300 dark:hover:bg-black/60 border-white/20 dark:border-white/10'
              }`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="flex cursor-pointer flex-col justify-between rounded-2xl border border-white/20 bg-white/40 p-5 shadow-sm transition-all hover:shadow-md backdrop-blur-md dark:border-white/10 dark:bg-black/40 overflow-hidden"
            >
              <div className="overflow-hidden">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Github className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-2 leading-tight">{project.name}</span>
                </h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
                  {project.description || 'No description provided.'}
                </p>
                
                {project.topics && project.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.topics.slice(0, 2).map(topic => (
                      <span key={topic} className="rounded-full bg-blue-50/50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 backdrop-blur-sm">
                        {topic}
                      </span>
                    ))}
                    {project.topics.length > 2 && (
                      <span className="rounded-full bg-gray-100/50 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 backdrop-blur-sm">
                        +{project.topics.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3 dark:border-white/10">
                <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {project.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {project.forks_count}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.language && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-blue-600 dark:text-blue-400">
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
                      className="p-1.5 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                    >
                      <Share2 className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                    </button>
                    {shareMenuOpen === project.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-32 rounded-xl border border-white/20 bg-white/90 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/90 z-20">
                        <a
                          href={`mailto:?subject=Check out this project: ${project.name}&body=Check out this project: ${project.html_url}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-3 w-3" /> Email
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.html_url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
      {isEmbedded ? (
        <div className="p-6">{content}</div>
      ) : (
        <section id="projects" className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            {content}
          </div>
        </section>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/80"
            >
              <div className="flex items-center justify-between border-b border-white/20 px-6 py-4 dark:border-white/10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Github className="h-6 w-6" />
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-white/50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-black/50 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.description || 'No detailed description provided for this repository.'}
                </p>

                {selectedProject.topics && selectedProject.topics.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Topics & Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.topics.map(topic => (
                        <span key={topic} className="rounded-full bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50 backdrop-blur-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-6 mb-8">
                  {selectedProject.language && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Primary Language</h4>
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Code className="h-4 w-4" />
                        {selectedProject.language}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Stats</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {selectedProject.stargazers_count} Stars
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {selectedProject.forks_count} Forks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gray-900/90 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white/90 dark:text-gray-900 dark:hover:bg-gray-100 transition-all backdrop-blur-sm"
                  >
                    <Github className="h-4 w-4" />
                    View Source
                  </a>
                  {selectedProject.homepage && (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/50 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/70 dark:border-white/10 dark:bg-black/50 dark:text-gray-300 dark:hover:bg-black/70 transition-all backdrop-blur-sm"
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
