import React from 'react';

/**
 * Post text with links and hashtags turned into anchors.
 *
 * Rendering only: callers pass the text of a post and get it back marked up.
 * Nothing here knows where the text came from.
 */
export default function PostText({ text }: { text: string }) {
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hashtagRegex = /(#[a-zA-Z0-9_]+)/g;
  const parts = text.split(/(\s+)/);

  return (
    <>
      {parts.map((part, index) => {
        if (urlRegex.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline break-all"
              onClick={(event) => event.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        if (hashtagRegex.test(part)) {
          const tag = part.startsWith('#') ? part : part.substring(part.indexOf('#'));
          return (
            <a
              key={index}
              href={`https://bsky.app/search?q=${encodeURIComponent(tag)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline"
              onClick={(event) => event.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
