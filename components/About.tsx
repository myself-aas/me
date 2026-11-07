'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { GraduationCap, Target, Lightbulb, Award } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      text: "B.Sc. in Food Engineering & M.Sc. in AgroMeteorology (Pursuing) from BAU.",
      color: "text-signal bg-signal-wash bg-signal-wash"
    },
    {
      icon: Target,
      title: "Focus",
      text: "Precision agriculture, computer vision, and data-driven farming solutions.",
      color: "text-teal bg-band bg-band"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      text: "Integrating AI and IoT to optimize agricultural and horticultural research.",
      color: "text-ochre bg-band bg-band"
    },
    {
      icon: Award,
      title: "Goal",
      text: "Pursuing a PhD to solve global food security and sustainability challenges.",
      color: "text-ink bg-band bg-band"
    }
  ];

  const content = (
    <div className="space-y-12">
      <motion.div
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <div className={`space-y-6 text-lg text-ink-soft text-ink leading-relaxed font-serif`}>
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-signal">
            I am an AI & ML expert with a strong foundation in <span className="text-ink font-semibold">Food Engineering</span>, currently advancing my expertise through an M.Sc. in <span className="text-ink font-semibold">AgroMeteorology</span> at Bangladesh Agricultural University. My research is driven by a passion for precision and sustainable agriculture.
          </p>
          <p>
            With extensive experience in object detection, IoT-based smart farming solutions, and data-driven decision-making, I am dedicated to integrating AI, remote sensing, and sensor-based technologies to optimize agricultural research and production.
          </p>
          <p>
            My ultimate goal is to pursue a PhD where I can further explore the intersection of artificial intelligence and agricultural sciences, developing innovative solutions to address global food security and sustainability challenges.
          </p>
          <p>
            Day to day that means building models that survive real field conditions: uneven lighting, overlapping leaves, cheap cameras and small labelled datasets. I work mostly in Python and PyTorch, using segmentation and detection architectures for crop and disease recognition, and I pair those models with sensor and weather data so the output answers a practical question a grower or researcher can act on.
          </p>
          <p>
            Alongside modelling I care about reproducibility. Datasets, training scripts and evaluation notebooks are published where the work allows, so a result can be checked rather than trusted. I also spend time on the unglamorous part: labelling guidelines that two annotators can apply the same way, and evaluation that reports per-class error instead of a single flattering average. The <Link href="/projects" className="text-signal hover:underline">projects page</Link> lists the open repositories and the <Link href="/publications" className="text-signal hover:underline">publications page</Link> collects the peer-reviewed output.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((item, index) => (
          <div key={item.title} className="border border-rule bg-band p-6">
            <div className={`w-12 h-12 rounded-[2px] flex items-center justify-center mb-4 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-ink mb-2">{item.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return content;
}
