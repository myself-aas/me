'use client';

import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, BookOpen, Users, Mail, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Research Assistant',
    organization: 'Bangladesh Agricultural University Research System (BAURES)',
    location: 'Mymensingh-2202, Bangladesh',
    date: 'Mar 2025 - Present',
    description: 'Developing machine learning models for division-wise agricultural commodity price forecasting using spatio-temporal data across Bangladesh. Conducting Bayesian-Optimized XGBoost & Deep Learning models for macro-economic forecasting.',
  },
  {
    type: 'work',
    title: 'Internship, Data Analytics & Visualization',
    organization: 'Accenture (Job Simulation)',
    date: 'Nov 2024',
    description: 'Completed practical tasks in Project Understanding, Data Cleaning & Modeling, Data Visualization & Storytelling, and Client Presentation.',
    certificateUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/T6kdcdKSTfg2aotxT/hzmoNKtzvAzXsEqx8_T6kdcdKSTfg2aotxT_Xy4mT9WvsRry8ZLBN_1732273382997_completion_certificate.pdf',
  },
  {
    type: 'work',
    title: 'Internship, Data Analytics',
    organization: 'Quantium (Job Simulation)',
    date: 'Sep 2024 - Nov 2024',
    description: 'Analyzed transaction data to identify benchmark stores, evaluated financial performance metrics, and delivered actionable insights for strategic commercial decision-making.',
    certificateUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/32A6DqtsbF7LbKdcq/NkaC7knWtjSbi6aYv_32A6DqtsbF7LbKdcq_Xy4mT9WvsRry8ZLBN_1730903583679_completion_certificate.pdf',
  },
  {
    type: 'work',
    title: 'Industrial Internship',
    organization: 'Akij Food and Beverages Ltd. (AFBL)',
    location: 'Dhamrai, Dhaka, Bangladesh',
    date: 'June 2024 - July 2024',
    description: 'Completed industrial training across beverage, mango pulp, chutney, and mustard oil processing lines. Focused on HACCP compliance, quality control standards, automated processing workflows, and supply chain logistics.',
  },
];

const education = [
  {
    type: 'edu',
    title: 'M.Sc. in Agrometeorology',
    organization: 'Bangladesh Agricultural University',
    location: 'Mymensingh-2202, Bangladesh',
    date: 'March 2025 - October 2026 (Expected)',
    description: 'Advanced coursework and research in agrometeorological forecasting, spatio-temporal modeling, precision agriculture, remote sensing, and climate data analysis.',
  },
  {
    type: 'edu',
    title: 'B.Sc. in Food Engineering',
    organization: 'Bangladesh Agricultural University',
    location: 'Mymensingh-2202, Bangladesh',
    date: 'Jan 2018 - Oct 2024',
    description: 'Comprehensive engineering degree covering food processing, unit operations, quality assurance, bioprocess engineering, and agricultural post-harvest technologies.',
  },
  {
    type: 'edu',
    title: 'Diploma, Python Development Essentials',
    organization: 'Institute of MTF',
    date: 'Oct 2024 - Nov 2024',
    description: 'Specialized practical training in core Python, OOP, automated testing, and software design fundamentals.',
  },
  {
    type: 'edu',
    title: 'Higher Secondary Certificate (HSC) — Science',
    organization: 'Government M. M. College, Jashore',
    date: 'June 2014 - April 2016',
    description: 'Passed with Distinction. Awarded Bangladesh Government Merit Scholarship.',
  },
  {
    type: 'edu',
    title: 'Secondary School Certificate (SSC) — Science',
    organization: 'Jashore Zilla School, Jashore',
    date: 'Jan 2007 - April 2014',
    description: 'Passed with Distinction. Awarded Bangladesh Government Merit Scholarship.',
  },
];

const achievements = [
  {
    title: 'Bangladesh Government Merit Scholarship',
    level: 'Higher Secondary Certificate (HSC)',
    description: 'Awarded national merit scholarship for outstanding academic results in Science division.',
  },
  {
    title: 'Bangladesh Government Merit Scholarship',
    level: 'Secondary School Certificate (SSC)',
    description: 'Recognized with national merit scholarship for academic excellence.',
  },
  {
    title: 'Bangladesh Government Merit Scholarship',
    level: 'Junior School Certificate (JSC)',
    description: 'Awarded top-tier merit scholarship by the Ministry of Education.',
  },
];

const certifications = [
  { title: 'OpenCV Bootcamp (100% Score)', provider: 'OpenCV', id: '2955' },
  { title: 'TensorFlow Keras Bootcamp (100% Score)', provider: 'OpenCV', id: '2955' },
  { title: 'AI Agents Fundamentals', provider: 'Hugging Face' },
  { title: 'Data Cleaning', provider: 'Kaggle' },
  { title: 'Data Visualization', provider: 'Kaggle' },
  { title: 'Feature Engineering', provider: 'Kaggle' },
  { title: 'Geospatial Analysis', provider: 'Kaggle' },
  { title: 'Intro to Machine Learning', provider: 'Kaggle' },
  { title: 'Intro to Programming', provider: 'Kaggle' },
  { title: 'Pandas', provider: 'Kaggle' },
  { title: 'Python', provider: 'Kaggle' },
  { title: 'Mastering Python', provider: 'MakeIntern & E-Cell IIT Kharagpur' },
  { title: 'Scientific Literature Searching & EndNote', provider: 'BAU Research System (BAURES)' },
  { title: 'Foundations of Healthcare Quality & Patient Safety', provider: 'Udemy' },
];

const leadershipRoles = [
  {
    role: 'Vice President',
    organization: 'Nutrition Club BAU',
    period: '2022 - 2024',
    description: 'Organized national workshops on food security, nutrition awareness, community health drives, and youth engagement in sustainable food systems.',
  },
  {
    role: 'IT Advisor',
    organization: 'Shwapno Youth Development Organization',
    period: '2023 - Present',
    description: 'Guided digital strategy, web deployment, database management, and technical infrastructure for youth empowerment and skill-building projects.',
  },
  {
    role: 'Campus Ambassador',
    organization: 'English Olympiad Bangladesh',
    period: '2021 - 2023',
    description: 'Promoted linguistic proficiency, communication skill development, and organized academic contests for university students.',
  },
  {
    role: 'Volunteer',
    organization: 'Volunteer for Bangladesh (VBD)',
    period: '2020 - Present',
    description: 'Participated in youth-led social impact projects, environmental conservation drives, and community disaster response initiatives.',
  },
];

const academicReferences = [
  {
    name: 'Dr. Ahmed Khairul Hasan',
    title: 'Professor, Department of Agronomy',
    institution: 'Bangladesh Agricultural University',
    location: 'Mymensingh-2202, Bangladesh',
    email: 'akhasan@bau.edu.bd',
  },
  {
    name: 'Dr. Mohammad Jahangir Alam',
    title: 'Professor, Department of Agribusiness & Marketing',
    institution: 'Bangladesh Agricultural University',
    location: 'Mymensingh-2202, Bangladesh',
    email: 'mjahangir.alam@bau.edu.bd',
  },
];

export default function Experience({ limit }: { limit?: number }) {
  const displayedExperiences = limit ? experiences.slice(0, limit) : experiences;
  const displayedEducation = limit ? education.slice(0, limit) : education;

  return (
    <motion.div transition={{ duration: 0.5 }} className="space-y-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Experience Column */}
        <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
          <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold text-ink">
            <Briefcase className="h-6 w-6 text-signal" aria-hidden="true" />
            Experience
          </h2>
          <div className="space-y-8 border-l-2 border-rule pl-6 dark:border-rule">
            {displayedExperiences.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-[2px] border-4 border-rule bg-signal"></div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <div className="mb-1 text-sm font-medium text-signal">
                  {item.organization} {item.location ? `· ${item.location}` : ''}
                </div>
                <div className="mb-2 text-xs text-ink-soft">{item.date}</div>
                <p className="mb-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Verified Certificate of Completion
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
          <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold text-ink">
            <GraduationCap className="h-6 w-6 text-signal" aria-hidden="true" />
            Education
          </h2>
          <div className="space-y-8 border-l-2 border-rule pl-6 dark:border-rule">
            {displayedEducation.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-[2px] border-4 border-rule bg-signal"></div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <div className="mb-1 text-sm font-medium text-signal">
                  {item.organization} {item.location ? `· ${item.location}` : ''}
                </div>
                <div className="mb-2 text-xs text-ink-soft">{item.date}</div>
                {item.description && (
                  <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional sections when viewing full experience page */}
      {!limit && (
        <>
          {/* Achievements & Government Merit Scholarships */}
          <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-ink">
              <Award className="h-6 w-6 text-signal" aria-hidden="true" />
              Honors & Government Merit Scholarships
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {achievements.map((item, index) => (
                <div key={index} className="rounded-[2px] border border-rule bg-band p-4">
                  <div className="mb-2 flex items-center gap-2 text-signal">
                    <ShieldCheck className="h-5 w-5 shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{item.level}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink mb-1">{item.title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Development & Certifications */}
          <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-ink">
              <BookOpen className="h-6 w-6 text-signal" aria-hidden="true" />
              Professional Development & Certifications (14)
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 rounded-[2px] border border-rule bg-band p-3.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-ink leading-tight">{cert.title}</h3>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {cert.provider} {cert.id ? `· ID: ${cert.id}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Extracurricular Activities */}
          <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-ink">
              <Users className="h-6 w-6 text-signal" aria-hidden="true" />
              Leadership & Extracurricular Engagement
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {leadershipRoles.map((role, index) => (
                <div key={index} className="rounded-[2px] border border-rule bg-band p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-ink">{role.role}</h3>
                    <span className="text-xs font-medium text-signal">{role.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-signal-deep mb-2">{role.organization}</div>
                  <p className="text-xs leading-relaxed text-ink-soft">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic References */}
          <div className="sheet-panel rounded-[2px] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-ink">
              <Mail className="h-6 w-6 text-signal" aria-hidden="true" />
              Academic References
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {academicReferences.map((ref, index) => (
                <div key={index} className="rounded-[2px] border border-rule bg-band p-5">
                  <h3 className="text-base font-bold text-ink mb-1">{ref.name}</h3>
                  <p className="text-xs font-medium text-signal mb-0.5">{ref.title}</p>
                  <p className="text-xs text-ink-soft mb-3">{ref.institution}, {ref.location}</p>
                  <a
                    href={`mailto:${ref.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {ref.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

