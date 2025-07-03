'use client';

import { useEffect, useRef } from 'react';

export interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

export const usePerformanceMonitoring = () => {
  const metricsRef = useRef<PerformanceMetrics>({});

  useEffect(() => {
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metricsRef.current.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metricsRef.current.lcp = entry.startTime;
            break;
          case 'first-input':
            const fidEntry = entry as PerformanceEventTiming;
            metricsRef.current.fid = fidEntry.processingStart - fidEntry.startTime;
            break;
          case 'layout-shift':
            const clsEntry = entry as PerformanceEntry & {
              hadRecentInput: boolean;
              value: number;
            };
            if (!clsEntry.hadRecentInput) {
              metricsRef.current.cls = (metricsRef.current.cls || 0) + clsEntry.value;
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            metricsRef.current.ttfb = navEntry.responseStart - navEntry.requestStart;
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      console.warn('Performance monitoring not supported:', e);
    }

    return () => observer.disconnect();
  }, []);

  const getMetrics = () => metricsRef.current;

  const reportMetrics = () => {
    const metrics = getMetrics();
    console.log('Performance Metrics:', metrics);
    
    if (process.env.NODE_ENV === 'production') {
    }
  };

  return { getMetrics, reportMetrics };
};

export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

export const preloadComponent = (importFn: () => Promise<unknown>) => {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => importFn());
    } else {
      setTimeout(() => importFn(), 100);
    }
  }
};

export const conditionalPreload = (
  condition: boolean,
  importFn: () => Promise<unknown>
) => {
  if (condition) {
    preloadComponent(importFn);
  }
};

export const roleBasedPreload = (
  userRole: string | undefined,
  requiredRole: string,
  importFn: () => Promise<unknown>
) => {
  if (userRole === requiredRole) {
    preloadComponent(importFn);
  }
};
