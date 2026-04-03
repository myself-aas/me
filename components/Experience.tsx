'use client';

import { motion } from 'motion/react';
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

export default function Experience({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {!isEmbedded && <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Experience & Education</h2>}
      
      <div className="grid grid-cols-1 gap-12">
        {/* Experience Column */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="mb-8 flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Experience
          </div>
          <div className="space-y-8 border-l-2 border-white/20 pl-6 dark:border-white/10">
            {experiences.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-white/50 bg-blue-600 dark:border-black/50 dark:bg-blue-400 shadow-sm"></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">{item.organization} | {item.date}</div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                {item.certificateUrl && (
                  <a 
                    href={item.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Certificate of Completion
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="mb-8 flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Education
          </div>
          <div className="space-y-8 border-l-2 border-white/20 pl-6 dark:border-white/10">
            {education.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-white/50 bg-blue-600 dark:border-black/50 dark:bg-blue-400 shadow-sm"></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <div className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">{item.organization}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</div>
                {item.certificateUrl && (
                  <a 
                    href={item.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Certificate of Completion
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isEmbedded) return <div className="p-6">{content}</div>;

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto max-w-5xl px-4">
        {content}
      </div>
    </section>
  );
}
