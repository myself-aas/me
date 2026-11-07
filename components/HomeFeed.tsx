'use client';

import { useEffect } from 'react';
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
    <div className="flex flex-col">
      <Section feed={{ title: 'About the work', id: 'about' }}>
        <About />
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
        <Publications limit={3} />
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
          title: 'Research log',
          id: 'feed',
          viewMore: { href: '/feed', label: 'Full log' },
        }}
      >
        <BlueskyFeed limit={3} />
      </Section>

      <Section feed={{ title: 'Write to me', id: 'contact' }}>
        <Contact />
      </Section>
    </div>
  );
}
