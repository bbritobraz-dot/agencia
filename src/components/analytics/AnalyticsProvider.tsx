'use client';

import { useEffect } from 'react';
import { captureAndPersistUtms } from '@/lib/analytics/tracker';

export function AnalyticsProvider() {
  useEffect(() => {
    captureAndPersistUtms();
  }, []);

  return null;
}
