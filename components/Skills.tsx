'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Code2, Cpu, Database, Cloud, Palette, Microscope, Globe, Wrench, Leaf, X } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 className="h-5 w-5" />,
    description: 'Core programming languages used for algorithmic development, model training, and data analysis.',
    skills: ['Python', 'R', 'Java', 'C', 'C++', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Computer Vision & Deep Learning',
    icon: <Cpu className="h-5 w-5" />,
    description: 'Advanced architectures, custom neural networks, and object detection/segmentation models.',
    skills: ['EinsteinNet', 'HEART-Net', 'HazardNet', 'Vision Transformer (ViT)', 'Swin Transformer', 'DeepLabV3+', 'ResNet', 'DenseNet', 'EfficientNet', 'Feature Pyramid Network (FPN)', 'U-Net', 'FCN', 'Attention Mechanisms', 'PyTorch'],
  },
  {
    title: 'Packages & Frameworks',
    icon: <Database className="h-5 w-5" />,
    description: 'Libraries for deep learning, computer vision, data manipulation, and scientific computing.',
    skills: ['TensorFlow', 'RDKit', 'OpenCV', 'Keras API', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Data Analysis & Chemometrics',
    icon: <Database className="h-5 w-5" />,
    description: 'Statistical methods, spatio-temporal modeling, multivariate analysis, and price forecasting.',
    skills: ['Cluster Analysis', 'Spatio-Temporal Regression', 'Bayesian-Optimized XGBoost', 'PCA', 'PLS', 'Multivariate Analysis', 'Time-Series Decomposition', 'Data Visualization'],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: <Cloud className="h-5 w-5" />,
    description: 'Platforms and services for scalable machine learning workflows and web deployment.',
    skills: ['Microsoft Azure-ML', 'AWS', 'Cloudflare Workers', 'Vercel'],
  },
  {
    title: 'Spectroscopy & Modeling Tools',
    icon: <Microscope className="h-5 w-5" />,
    description: 'Analytical instruments and 3D modeling tools for food quality and agricultural research.',
    skills: ['NIR Spectroscopy', 'Spectrophotometer', 'UV-Vis Spectrophotometer', '3D Blender Modeling'],
  },
  {
    title: 'Web & Backend Development',
    icon: <Globe className="h-5 w-5" />,
    description: 'Technologies for building interactive research tools, APIs, and modern web applications.',
    skills: ['Next.js', 'React', 'Node.js', 'Flask', 'FastAPI', 'Firebase', 'REST APIs', 'Tailwind CSS'],
  },
  {
    title: 'DevOps & Research Tools',
    icon: <Wrench className="h-5 w-5" />,
    description: 'Tools for version control, reproducible research, containers, and reference management.',
    skills: ['Git', 'GitHub', 'Docker', 'Jupyter', 'Google Colab', 'EndNote', 'LaTeX'],
  },
  {
    title: 'Domain Expertise',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Interdisciplinary domain knowledge in precision agriculture, agrometeorology, and food engineering.',
    skills: ['Precision Agriculture', 'Agrometeorology', 'Food Process Engineering', 'Commodity Price Forecasting', 'Remote Sensing', 'Livestock Biometrics', 'IoT in Farming'],
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
