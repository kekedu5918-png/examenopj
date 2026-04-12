'use client';

import { useEffect } from 'react';

import { track } from '@/lib/analytics/events';

export function TrackOnMount({
  event,
  properties,
}: {
  event: string;
  properties?: Record<string, unknown>;
}) {
  useEffect(() => {
    track(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- événement ponctuel au montage
  }, [event]);

  return null;
}
