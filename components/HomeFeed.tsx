'use client';

import { useEffect } from 'react';
import Section from './Section';
import About from './About';
import LiveProjectsShowcase from './LiveProjectsShowcase';
import Skills from './Skills';
import GitHubProjects from './GitHubProjects';
import Publications from './Publications';
import Experience from './Experience';
import Contact from './Contact';
import ProfileDetails from './ProfileDetails';
import UnifiedSocialFeed from './UnifiedSocialFeed';
import ThoughtsSection from './ThoughtsSection';
import type { Publication } from '@/lib/sources/orcid';
import type { Thought } from '@/lib/thoughts';

export default function HomeFeed({
  publications,
  thoughts = [],
}: {
  publications: Publication[];
  thoughts?: Thought[];
}) {
  // Section anchors on the home feed are replaced with clean paths on load.
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <Section feed={{ title: 'About the work', id: 'about' }}>
        <About />
      </Section>

      <Section feed={{ title: 'Live applications', id: 'live-projects' }}>
        <LiveProjectsShowcase />
      </Section>

      <Section
        feed={{
          title: 'Thoughts',
          id: 'thoughts',
          viewMore: { href: '/thoughts', label: 'All thoughts' },
        }}
      >
        <ThoughtsSection initialThoughts={thoughts} limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Tools and skills',
          id: 'skills',
          viewMore: { href: '/skills', label: 'All skills' },
        }}
      >
        <div className="flex flex-col">
          <ProfileDetails />
          <div className="border-t border-rule">
            <Skills limit={4} />
          </div>
        </div>
      </Section>

      <Section
        feed={{
          title: 'Code and projects',
          id: 'projects',
          viewMore: { href: '/projects', label: 'All projects' },
        }}
      >
        <GitHubProjects limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Publications',
          id: 'publications',
          viewMore: { href: '/publications', label: 'All publications' },
        }}
      >
        <Publications works={publications} limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Experience and education',
          id: 'experience',
          viewMore: { href: '/experience', label: 'Full record' },
        }}
      >
        <Experience limit={3} />
      </Section>

      <Section
        feed={{
          title: 'Research log & social dispatches',
          id: 'feed',
          viewMore: { href: '/feed', label: 'Full feed' },
        }}
      >
        <UnifiedSocialFeed limit={3} />
      </Section>

      <Section feed={{ title: 'Write to me', id: 'contact' }}>
        <Contact />
      </Section>
    </div>
  );
}
