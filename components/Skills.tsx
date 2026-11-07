'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Code2, Cpu, Database, Cloud, Palette, Microscope, Globe, Wrench, Leaf, X } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 className="h-5 w-5" />,
    description: 'Core programming languages used for development and data analysis.',
    skills: ['Python', 'R', 'Java', 'C', 'C++', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Computer Vision & Deep Learning',
    icon: <Cpu className="h-5 w-5" />,
    description: 'Advanced architectures and techniques for image processing and pattern recognition.',
    skills: ['EinsteinNet', 'Vision Transformer', 'Swin Transformer', 'DeepLabV3+', 'ResNet', 'DenseNet', 'EfficientNet', 'SVM', 'MLP', 'Feature Pyramid Network', 'U-net', 'FCN', 'Attention Mechanism', 'PyTorch'],
  },
  {
    title: 'Packages & Frameworks',
    icon: <Database className="h-5 w-5" />,
    description: 'Essential libraries for machine learning, data manipulation, and visualization.',
    skills: ['TensorFlow', 'RDKit', 'OpenCV', 'Keras API', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Data Analysis',
    icon: <Database className="h-5 w-5" />,
    description: 'Statistical methods and techniques for extracting insights from complex datasets.',
    skills: ['Cluster analysis', 'Regression', 'PCA', 'PLS', 'Multivariate Analysis', 'Data Visualization'],
  },
  {
    title: 'Cloud Computing',
    icon: <Cloud className="h-5 w-5" />,
    description: 'Platforms and services for scalable machine learning and application deployment.',
    skills: ['Microsoft Azure-ML', 'AWS'],
  },
  {
    title: 'Spectroscopy & Tools',
    icon: <Microscope className="h-5 w-5" />,
    description: 'Specialized hardware and software for spectral analysis and 3D modeling.',
    skills: ['NIR', 'Spectrophotometer', 'Blender'],
  },
  {
    title: 'Web & Backend',
    icon: <Globe className="h-5 w-5" />,
    description: 'Technologies for building modern, responsive web applications and robust APIs.',
    skills: ['Next.js', 'React', 'Flask', 'FastAPI', 'Firebase', 'REST APIs'],
  },
  {
    title: 'Tools & DevOps',
    icon: <Wrench className="h-5 w-5" />,
    description: 'Essential tools for version control, containerization, and collaborative development.',
    skills: ['Git', 'GitHub', 'Docker', 'Jupyter', 'Google Colab'],
  },
  {
    title: 'Domain Expertise',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Specialized knowledge in precision agriculture and environmental monitoring.',
    skills: ['Precision Agriculture', 'Remote Sensing', 'IoT in Farming', 'Spatio-temporal Analysis', 'Agrometeorology'],
  }
];

export default function Skills({ limit }: { limit?: number }) {
  const [selectedCategory, setSelectedCategory] = useState<typeof skillCategories[0] | null>(null);

  const displayedCategories = limit ? skillCategories.slice(0, limit) : skillCategories;

  const content = (
    <motion.div
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-4">
        {displayedCategories.map((category, index) => (
          <motion.div
            key={category.title}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category)}
            className="flex cursor-pointer flex-col rounded-[2px] border border-rule bg-band p-5 transition-all dark:border-rule"
          >
            <div className="mb-4 flex items-center gap-3 text-base font-semibold text-ink">
              <div className="shrink-0 rounded-[2px] bg-signal-wash p-2 text-signal">
                {category.icon}
              </div>
              <span className="line-clamp-2 leading-tight">{category.title}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="rounded-[2px] bg-band px-2.5 py-0.5 text-xs font-medium text-ink bg-band/50 break-words border border-rule"
                >
                  {skill}
                </span>
              ))}
              {category.skills.length > 6 && (
                <span className="rounded-[2px] bg-band px-2.5 py-0.5 text-xs font-medium text-ink-soft bg-band/30 dark:text-ink-soft">
                  +{category.skills.length - 6} more
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {content}

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-band"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2px] border border-rule bg-paper dark:border-rule"
            >
              <div className="flex items-center justify-between border-b border-rule px-6 py-4 dark:border-rule">
                <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                  <div className="rounded-[2px] bg-signal-wash p-2 text-signal">
                    {selectedCategory.icon}
                  </div>
                  {selectedCategory.title}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-[2px] p-2 text-ink-soft hover:bg-band hover:text-ink dark:text-ink-soft transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-base text-ink mb-6 font-medium">
                  {selectedCategory.description}
                </p>

                <div>
                  <h4 className="mb-4 font-sans text-[0.8125rem] text-ink-soft">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.skills.map(skill => (
                      <span key={skill} className="rounded-[2px] bg-signal-wash/50 px-4 py-1.5 text-sm font-semibold text-signal-deep bg-signal-wash text-signal border border-rule">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
