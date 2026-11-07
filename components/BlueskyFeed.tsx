'use client';

import UnifiedSocialFeed from './UnifiedSocialFeed';

export default function BlueskyFeed({ limit }: { limit?: number }) {
  return <UnifiedSocialFeed limit={limit} />;
}

