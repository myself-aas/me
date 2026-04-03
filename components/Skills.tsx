'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export default function Skills({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<typeof skillCategories[0] | null>(null);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {!isEmbedded && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Technical Skills</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Comprehensive toolkit across AI, Agriculture, and Software Engineering</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category)}
            className="flex cursor-pointer flex-col rounded-2xl border border-white/20 bg-white/40 p-5 shadow-sm transition-all hover:shadow-md backdrop-blur-md dark:border-white/10 dark:bg-black/40"
          >
            <div className="mb-4 flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white">
              <div className="shrink-0 rounded-lg bg-blue-100/50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 backdrop-blur-sm">
                {category.icon}
              </div>
              <span className="line-clamp-2 leading-tight">{category.title}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white/50 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 break-words backdrop-blur-sm border border-white/20 dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
              {category.skills.length > 6 && (
                <span className="rounded-full bg-white/30 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-900/30 dark:text-gray-400 backdrop-blur-sm">
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
      {isEmbedded ? (
        <div className="p-6">{content}</div>
      ) : (
        <section id="skills" className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            {content}
          </div>
        </section>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/80"
            >
              <div className="flex items-center justify-between border-b border-white/20 px-6 py-4 dark:border-white/10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100/50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 backdrop-blur-sm">
                    {selectedCategory.icon}
                  </div>
                  {selectedCategory.title}
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-white/50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-black/50 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 font-medium">
                  {selectedCategory.description}
                </p>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.skills.map(skill => (
                      <span key={skill} className="rounded-full bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50 backdrop-blur-sm">
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
