'use client';

import {
  ArrowRight,
  User,
  Folder,
  BookOpen,
  Briefcase,
  Mail,
  TrendingUp,
} from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import Section from './Section';
import About from './About';
import Skills from './Skills';
import GitHubProjects from './GitHubProjects';
import Publications from './Publications';
import Experience from './Experience';
import Contact from './Contact';
import ProfileDetails from './ProfileDetails';
import BlueskyFeed from './BlueskyFeed';

export default function HomeFeed() {
  // Section anchors on the home feed are replaced with clean paths on load.
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

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
            <Link href="/publications" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-all">
              View Publications <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      <Section feed={{ title: 'About Me', icon: User, id: 'about' }}>
        <About />
      </Section>

      <Section
        feed={{
          title: 'Technical Analytics & Skills',
          icon: TrendingUp,
          id: 'skills',
          viewMore: { href: '/skills', label: 'Explore all technical skills' },
        }}
        padded={false}
      >
        <div className="flex flex-col">
          <ProfileDetails />
          <div className="border-t border-gray-100 dark:border-gray-900 p-6">
            <Skills limit={4} />
          </div>
        </div>
      </Section>

      <Section
        feed={{
          title: 'Research Projects',
          icon: Folder,
          id: 'projects',
          viewMore: { href: '/projects', label: 'Browse all research projects' },
        }}
      >
        <GitHubProjects limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Academic Publications',
          icon: BookOpen,
          id: 'publications',
          viewMore: { href: '/publications', label: 'See all publications' },
        }}
      >
        <Publications limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Professional Experience',
          icon: Briefcase,
          id: 'experience',
          viewMore: { href: '/experience', label: 'See full experience and education' },
        }}
      >
        <Experience limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Research Feed & Updates',
          icon: TrendingUp,
          id: 'feed',
          viewMore: { href: '/feed', label: 'Read the full research feed' },
        }}
      >
        <BlueskyFeed limit={3} />
      </Section>

      <Section feed={{ title: 'Contact & Collaboration', icon: Mail, id: 'contact' }} card={false}>
        <Contact />
      </Section>
    </div>
  );
}
