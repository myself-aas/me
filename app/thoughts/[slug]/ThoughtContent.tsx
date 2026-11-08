'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from '@/components/MermaidDiagram';
import MarkdownChart from '@/components/MarkdownChart';
import TableOfContents from '@/components/TableOfContents';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import { extractHeadings, slugify } from '@/lib/toc';

interface ThoughtContentProps {
  content: string;
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  if (React.isValidElement(node) && node.props) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      return getNodeText(props.children);
    }
  }
  return '';
}

export default function ThoughtContent({ content }: ThoughtContentProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);

  // Local map for assigning matching unique IDs on duplicate headings during render
  const idCounts = new Map<string, number>();

  const getHeadingId = (children: React.ReactNode) => {
    const text = getNodeText(children)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .trim();

    let baseId = slugify(text);
    if (!baseId) {
      baseId = 'heading';
    }

    const count = idCounts.get(baseId) || 0;
    idCounts.set(baseId, count + 1);
    return count > 0 ? `${baseId}-${count}` : baseId;
  };

  return (
    <div>
      {/* Sticky Collapsible Table of Contents */}
      <TableOfContents items={headings} />

      <div className="prose prose-neutral dark:prose-invert max-w-none text-ink text-[1.05rem] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:mb-1.5 [&_p]:mb-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1({ children, ...props }) {
              const id = getHeadingId(children);
              return (
                <h1 id={id} className="scroll-mt-24 font-serif text-3xl font-[560] mt-12 mb-5 text-ink border-b border-rule/50 pb-3" {...props}>
                  {children}
                </h1>
              );
            },
            h2({ children, ...props }) {
              const id = getHeadingId(children);
              return (
                <h2 id={id} className="scroll-mt-24 font-serif text-2xl font-[560] mt-10 mb-4 text-ink border-b border-rule/40 pb-2" {...props}>
                  {children}
                </h2>
              );
            },
            h3({ children, ...props }) {
              const id = getHeadingId(children);
              return (
                <h3 id={id} className="scroll-mt-24 font-serif text-xl font-[560] mt-8 mb-3 text-ink" {...props}>
                  {children}
                </h3>
              );
            },
            h4({ children, ...props }) {
              const id = getHeadingId(children);
              return (
                <h4 id={id} className="scroll-mt-24 font-serif text-lg font-[560] mt-6 mb-2 text-ink" {...props}>
                  {children}
                </h4>
              );
            },
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

      {/* Newsletter Subscription Banner at end of research article */}
      <div className="mt-14 pt-8 border-t border-rule">
        <NewsletterSubscription
          variant="banner"
          title="Subscribe for Future Research Thoughts"
          description="Enjoyed this article? Get notified when new field notes, technical essays, and precision agrometeorology models are published."
        />
      </div>
    </div>
  );
}
