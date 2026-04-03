'use client';

import { 
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  User,
  Wrench,
  Folder,
  BookOpen,
  Briefcase,
  Mail,
  TrendingUp,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import About from './About';
import Skills from './Skills';
import GitHubProjects from './GitHubProjects';
import Publications from './Publications';
import Experience from './Experience';
import Contact from './Contact';
import ProfileDetails from './ProfileDetails';
import BlueskyFeed from './BlueskyFeed';

const PortfolioSection = ({ 
  children, 
  title, 
  icon: Icon,
  id,
  viewMoreHref,
  viewMoreLabel
}: { 
  children: React.ReactNode, 
  title: string, 
  icon: any,
  id?: string,
  viewMoreHref?: string,
  viewMoreLabel?: string
}) => (
  <section id={id} className="py-12 px-6 border-b border-gray-100 dark:border-gray-900 last:border-0 scroll-mt-16">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black/40 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-sm overflow-hidden"
    >
      {children}
      {viewMoreHref && (
        <div className="border-t border-gray-100 dark:border-gray-900 p-4 bg-gray-50/30 dark:bg-white/5 flex justify-center">
          <Link 
            href={viewMoreHref}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            {viewMoreLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </motion.div>
  </section>
);

export default function HomeFeed() {
  return (
    <div className="flex flex-col bg-white dark:bg-black">
      {/* Introduction */}
      <div className="px-6 py-12 border-b border-gray-100 dark:border-gray-900 bg-blue-50/30 dark:bg-blue-900/5">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Research & Innovation in AI</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to my research portfolio. I am dedicated to bridging the gap between advanced artificial intelligence and practical applications in precision agriculture. My work focuses on developing robust computer vision models and data-driven systems that empower sustainable farming practices.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/publications" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-all">
              View Publications <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
              Explore Projects
            </a>
          </div>
        </div>
      </div>

      <PortfolioSection title="About Me" icon={User} id="about">
        <About isEmbedded={true} />
      </PortfolioSection>

      <PortfolioSection 
        title="Technical Analytics & Skills" 
        icon={TrendingUp} 
        id="skills"
        viewMoreHref="/skills"
        viewMoreLabel="Query More"
      >
        <div className="flex flex-col">
          <ProfileDetails isEmbedded={true} />
          <div className="border-t border-gray-100 dark:border-gray-900">
            <Skills isEmbedded={true} />
          </div>
        </div>
      </PortfolioSection>

      <PortfolioSection 
        title="Research Projects" 
        icon={Folder} 
        id="projects"
        viewMoreHref="/projects"
        viewMoreLabel="Project Universe"
      >
        <GitHubProjects isEmbedded={true} />
      </PortfolioSection>

      <PortfolioSection 
        title="Academic Publications" 
        icon={BookOpen} 
        id="publications"
        viewMoreHref="/publications"
        viewMoreLabel="Complete Records"
      >
        <Publications isEmbedded={true} />
      </PortfolioSection>

      <PortfolioSection 
        title="Professional Experience" 
        icon={Briefcase} 
        id="experience"
        viewMoreHref="/experience"
        viewMoreLabel="Evolution of Work"
      >
        <Experience isEmbedded={true} />
      </PortfolioSection>

      <PortfolioSection 
        title="Research Feed & Updates" 
        icon={TrendingUp} 
        id="feed"
        viewMoreHref="/feed"
        viewMoreLabel="Initialize Full View"
      >
        <BlueskyFeed />
      </PortfolioSection>

      <PortfolioSection title="Contact & Collaboration" icon={Mail} id="contact">
        <Contact isEmbedded={true} />
      </PortfolioSection>
    </div>
  );
}
