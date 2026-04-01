'use client';

import { motion } from 'motion/react';
import { GraduationCap, Target, Lightbulb, Award } from 'lucide-react';

export default function About({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      text: "B.Sc. in Food Engineering & M.Sc. in AgroMeteorology (Pursuing) from BAU.",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Target,
      title: "Focus",
      text: "Precision agriculture, computer vision, and data-driven farming solutions.",
      color: "text-green-600 bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      text: "Integrating AI and IoT to optimize agricultural and horticultural research.",
      color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Award,
      title: "Goal",
      text: "Pursuing a PhD to solve global food security and sustainability challenges.",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const content = (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        {!isEmbedded && <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">About My Journey</h2>}
        
        <div className={`space-y-6 ${isEmbedded ? 'text-base' : 'text-lg'} text-gray-600 dark:text-gray-300 leading-relaxed font-serif`}>
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
            I am an AI & ML expert with a strong foundation in <span className="text-gray-900 dark:text-white font-semibold">Food Engineering</span>, currently advancing my expertise through an M.Sc. in <span className="text-gray-900 dark:text-white font-semibold">AgroMeteorology</span> at Bangladesh Agricultural University. My research is driven by a passion for precision and sustainable agriculture.
          </p>
          <p>
            With extensive experience in object detection, IoT-based smart farming solutions, and data-driven decision-making, I am dedicated to integrating AI, remote sensing, and sensor-based technologies to optimize agricultural research and production.
          </p>
          <p>
            My ultimate goal is to pursue a PhD where I can further explore the intersection of artificial intelligence and agricultural sciences, developing innovative solutions to address global food security and sustainability challenges.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm hover:shadow-md transition-all"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (isEmbedded) return <div className="p-6">{content}</div>;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {content}
      </div>
    </section>
  );
}
