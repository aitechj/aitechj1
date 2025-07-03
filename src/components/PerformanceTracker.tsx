'use client';

import { useEffect } from 'react';
import { usePerformanceMonitoring, trackPageView } from '@/utils/performance';
import { usePathname } from 'next/navigation';

export default function PerformanceTracker() {
  const { reportMetrics } = usePerformanceMonitoring();
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && !window.Cypress) {
      trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && !window.Cypress) {
      const timer = setTimeout(() => {
        reportMetrics();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reportMetrics, pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && !window.Cypress) {
      const handleBeforeUnload = () => {
        reportMetrics();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [reportMetrics]);

  return null;
}
