import React from 'react';

export function formatPostText(text: string) {
  if (!text) return null;

  // Regex for URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Regex for Hashtags
  const hashtagRegex = /(#[a-zA-Z0-9_]+)/g;

  const parts = text.split(/(\s+)/);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline break-all"
          onClick={(e) => e.stopPropagation()}
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
          className="text-blue-500 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}
