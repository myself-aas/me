'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from '@/components/MermaidDiagram';
import MarkdownChart from '@/components/MarkdownChart';

interface ThoughtContentProps {
  content: string;
}

export default function ThoughtContent({ content }: ThoughtContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none text-ink text-[1.05rem] leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-[560] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-ink [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-[560] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:mb-1.5 [&_p]:mb-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            return <>{children}</>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\S+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (language === 'mermaid') {
              return <MermaidDiagram chart={codeString} />;
            }

            if (
              language === 'chart' ||
              language === 'recharts' ||
              language === 'json:chart' ||
              language === 'json-chart'
            ) {
              return <MarkdownChart jsonString={codeString} />;
            }

            // Inline code
            if (!className) {
              return (
                <code
                  className="bg-band px-1.5 py-0.5 rounded-[2px] text-xs font-mono text-signal border border-rule/60"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Block code container
            return (
              <div className="my-6 rounded-[2px] border border-rule bg-band/80 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between border-b border-rule bg-band px-3 py-1.5 text-[11px] font-mono text-ink-soft">
                  <span className="uppercase">{language || 'code'}</span>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-ink leading-relaxed">
                  <code>{codeString}</code>
                </pre>
              </div>
            );
          },
          table({ children }) {
            return (
              <div className="my-6 overflow-x-auto rounded-[2px] border border-rule bg-band/40 shadow-xs">
                <table className="w-full text-left border-collapse text-xs font-sans text-ink">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-band border-b border-rule text-ink font-semibold uppercase tracking-wider text-[11px]">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return <th className="px-4 py-3 border-r border-rule/50 last:border-r-0">{children}</th>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-rule/40">{children}</tbody>;
          },
          tr({ children }) {
            return (
              <tr className="hover:bg-band/70 transition-colors">{children}</tr>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-3 border-r border-rule/40 last:border-r-0 text-ink-soft leading-relaxed">
                {children}
              </td>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="my-6 border-l-2 border-signal bg-band/40 py-3 pl-4 pr-3 rounded-r-[2px] italic text-ink-soft text-base">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
