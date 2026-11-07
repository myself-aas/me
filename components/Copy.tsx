import Link from 'next/link';
import type { CopyParagraph } from '@/lib/content/pages';

/**
 * Renders intro copy from a page record.
 *
 * The record stores copy as plain data — a string per paragraph, or a run of
 * strings and `{ href, label }` links — so it can be read by the guardrail
 * script and by anything else that is not React. This module is the only place
 * that turns those segments into elements.
 */
export default function Copy({
  paragraphs,
  className = '',
}: {
  paragraphs: CopyParagraph[];
  className?: string;
}) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
          {typeof paragraph === 'string'
            ? paragraph
            : paragraph.map((segment, segmentIndex) =>
                typeof segment === 'string' ? (
                  <span key={segmentIndex}>{segment}</span>
                ) : (
                  <Link
                    key={segmentIndex}
                    href={segment.href}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {segment.label}
                  </Link>
                ),
              )}
        </p>
      ))}
    </div>
  );
}
