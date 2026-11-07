'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Research Assistant',
    organization: 'Bangladesh Agricultural University Research System',
    date: 'Mar 2025 - Present',
    description: 'Developed ML models for division-wise agricultural commodity price forecasting using spatio-temporal data in Bangladesh.',
  },
  {
    type: 'work',
    title: 'Internship, Data Analytics and Visualization Job Simulation',
    organization: 'Accenture',
    date: 'Nov 2024',
    description: 'Successfully completed practical tasks in Project Understanding, Data Cleaning & Modeling, Data Visualization & Storytelling, Present to the Client.',
    certificateUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/T6kdcdKSTfg2aotxT/hzmoNKtzvAzXsEqx8_T6kdcdKSTfg2aotxT_Xy4mT9WvsRry8ZLBN_1732273382997_completion_certificate.pdf', // Replace with actual URL from your resume
  },
  {
    type: 'work',
    title: 'Internship, Data Analytics',
    organization: 'Quantium',
    date: 'Sep 2024 - Nov 2024',
    description: 'Analyzed transaction data to identify benchmark stores and deliver insights for strategic commercial decisions.',
    certificateUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/32A6DqtsbF7LbKdcq/NkaC7knWtjSbi6aYv_32A6DqtsbF7LbKdcq_Xy4mT9WvsRry8ZLBN_1730903583679_completion_certificate.pdf', // Replace with actual URL from your resume
  },
  {
    type: 'work',
    title: 'Internship',
    organization: 'Akij Food and Beverages Ltd., Bangladesh',
    date: 'June 2024 - July 2024',
    description: 'Completed a 15-day internship at AFBL focused on mango pulp, chutney, and mustard oil production, emphasizing HACCP, quality control, and logistics.',
  },
];

const education = [
  {
    type: 'edu',
    title: 'M.Sc. in Agrometeorology',
    organization: 'Bangladesh Agricultural University, Mymensingh',
    date: 'March 2025 - Present',
  },
  {
    type: 'edu',
    title: 'B.Sc. in Food Engineering',
    organization: 'Bangladesh Agricultural University, Mymensingh',
    date: 'Jan 2018 - Oct 2024',
  },
  {
    type: 'edu',
    title: 'Diploma, Python Development Essentials',
    organization: 'Institute of MTF',
    date: 'Oct 2024 - Nov 2024',
    certificateUrl: '#', // Replace with actual URL from your resume
  },
  {
    type: 'edu',
    title: 'Higher Secondary Certificate (HSC)',
    organization: 'Government M. M. College, Jessore',
    date: 'April 2014 - April 2016',
  },
  {
    type: 'edu',
    title: 'Secondary School Certificate (SSC)',
    organization: 'Jessore Zilla School, Jessore',
    date: 'Jan 2006 - Feb 2014',
  },
];

export default function Experience({ limit }: { limit?: number }) {
  const displayedExperiences = limit ? experiences.slice(0, limit) : experiences;
  const displayedEducation = limit ? education.slice(0, limit) : education;

  const content = (
    <motion.div
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-12">
        {/* Experience Column */}
        <div className="sheet-panel p-8 rounded-[2px]">
          <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold text-ink">
            <Briefcase className="h-6 w-6 text-signal" aria-hidden="true" />
            Experience
          </h2>
          <div className="space-y-8 border-l-2 border-rule pl-6 dark:border-rule">
            {displayedExperiences.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-[2px] border-4 border-rule bg-signal"></div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <div className="mb-2 text-sm font-medium text-signal">{item.organization} | {item.date}</div>
                <p className="text-ink-soft mb-3">{item.description}</p>
                {item.certificateUrl && (
                  <a 
                    href={item.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-deep hover:text-signal transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Certificate of completion — {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="sheet-panel p-8 rounded-[2px]">
          <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold text-ink">
            <GraduationCap className="h-6 w-6 text-signal" aria-hidden="true" />
            Education
          </h2>
          <div className="space-y-8 border-l-2 border-rule pl-6 dark:border-rule">
            {displayedEducation.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-[2px] border-4 border-rule bg-signal"></div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <div className="mb-1 text-sm font-medium text-signal">{item.organization}</div>
                <div className="text-sm text-ink-soft dark:text-ink-soft mb-2">{item.date}</div>
                {item.certificateUrl && (
                  <a 
                    href={item.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-deep hover:text-signal transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Certificate of completion — {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return content;
}
