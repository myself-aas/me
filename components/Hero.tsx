'use client';

import { MapPin, Link as LinkIcon, Calendar, Mail, GraduationCap, Download, Github, Linkedin, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-black/40 backdrop-blur-md">
      {/* Cover Photo */}
      <div className="h-32 sm:h-48 w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
        <Image 
          src="https://ghchart.rshah.org/myself-aas.svg" 
          alt="GitHub Contribution Graph" 
          fill 
          className="object-contain opacity-40 dark:opacity-30"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-8 relative">
        <div className="flex justify-between items-start pt-4">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-white/50 dark:border-black/50 bg-gray-200/50 dark:bg-gray-800/50 -mt-14 sm:-mt-18 relative z-10 shadow-xl overflow-hidden backdrop-blur-sm">
            <Image 
              src="https://github.com/myself-aas.png" 
              alt="Ashif Ahmed Shuvo" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Ashif Ahmed Shuvo</h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Researcher</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-medium italic">AI & Machine Learning Specialist</p>
        </div>

        <div className="mt-4 text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
          Specializing in <span className="font-semibold text-blue-600 dark:text-blue-400">precision agriculture</span>, computer vision, and data-driven decision-making. 🌾🤖 Currently exploring PhD opportunities to further research in sustainable AI solutions.
        </div>

        <div className="mt-6 border-t border-gray-100/50 dark:border-gray-900/50 pt-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500"/> 
                <span>Based in Bangladesh (Open to Relocation)</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500"/> 
                <span>shuvo.1807016@bau.edu.bd</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="mailto:shuvo.1807016@bau.edu.bd" 
                className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-white/20 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://scholar.google.com/citations?user=ROhDpNAAAAAJ&hl=en&oi=sra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-white/20 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                title="Google Scholar"
              >
                <GraduationCap className="w-5 h-5" />
              </a>
              <a 
                href="https://orcid.org/0009-0003-5734-1519" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 border border-white/20 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                title="ORCID"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/myself-aas" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-white/20 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/me-aas" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 border border-white/20 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">B.Sc. in Food Engineering</p>
                <p className="text-xs text-gray-500">Bangladesh Agricultural University (BAU)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">M.Sc. in AgroMeteorology (Pursuing)</p>
                <p className="text-xs text-gray-500">Bangladesh Agricultural University (BAU)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
