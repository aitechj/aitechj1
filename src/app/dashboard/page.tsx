'use client';

import { Navigation } from '@/components';
import { Suspense, lazy, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { usePerformanceMonitoring, useIntersectionObserver, preloadComponent } from '@/utils/performance';

const DashboardStatsGrid = lazy(() => import('@/components/dashboard/DashboardStatsGrid'));
const CurrentCoursesSection = lazy(() => import('@/components/dashboard/CurrentCoursesSection'));
const RecentActivitySection = lazy(() => import('@/components/dashboard/RecentActivitySection'));
const AIChatUsageSection = lazy(() => import('@/components/dashboard/AIChatUsageSection'));

export default function DashboardPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { reportMetrics } = usePerformanceMonitoring();
  
  const recentActivityRef = useIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
      }
    });
  });

  const chatUsageRef = useIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
      }
    });
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    } else if (isAuthenticated) {
      preloadComponent(() => import('@/components/dashboard/CurrentCoursesSection'));
      preloadComponent(() => import('@/components/dashboard/RecentActivitySection'));
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      reportMetrics();
    }, 2000);

    return () => clearTimeout(timer);
  }, [reportMetrics]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="dashboard" />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Learning Dashboard</h1>
          <p className="text-xl text-slate-300">
            Track your progress, manage your courses, and monitor your AI chat usage.
          </p>
        </div>

        {/* Stats Overview */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        }>
          <DashboardStatsGrid />
        </Suspense>

        {/* Current Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-slate-700 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-700 rounded"></div>
                ))}
              </div>
            </div>
          }>
            <CurrentCoursesSection />
          </Suspense>

          <div>
            <div ref={recentActivityRef}>
              <Suspense fallback={
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 mb-4 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-slate-700 rounded"></div>
                    ))}
                  </div>
                </div>
              }>
                <RecentActivitySection />
              </Suspense>
            </div>
            
            <div ref={chatUsageRef}>
              <Suspense fallback={
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-8 bg-slate-700 rounded"></div>
                    ))}
                  </div>
                </div>
              }>
                <AIChatUsageSection />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
