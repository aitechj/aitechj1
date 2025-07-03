'use client';

import { Navigation } from '@/components';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense, lazy } from 'react';
import { usePerformanceMonitoring, useIntersectionObserver, preloadComponent } from '@/utils/performance';

const AdminStatsGrid = lazy(() => import('@/components/admin/AdminStatsGrid'));
const UserManagementSection = lazy(() => import('@/components/admin/UserManagementSection'));
const CourseManagementSection = lazy(() => import('@/components/admin/CourseManagementSection'));
const SystemAnalyticsSection = lazy(() => import('@/components/admin/SystemAnalyticsSection'));

import SystemAnalyticsLoadingSkeleton from '@/components/admin/SystemAnalyticsLoadingSkeleton';
import UserManagementLoadingSkeleton from '@/components/admin/UserManagementLoadingSkeleton';

export default function AdminPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { reportMetrics } = usePerformanceMonitoring();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth');
        return;
      }
      
      if (user?.role !== 'admin' || user?.email !== 'isha.bahati@hotmail.com') {
        router.push('/dashboard');
        return;
      }

      preloadComponent(() => import('@/components/admin/SystemAnalyticsSection'));
      preloadComponent(() => import('@/components/admin/UserManagementSection'));
    }
  }, [isLoading, isAuthenticated, user, router]);

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

  if (!user || user.role !== 'admin' || user.email !== 'isha.bahati@hotmail.com') {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="admin" />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Portal</h1>
          <p className="text-xl text-slate-300">
            Manage users, courses, subscriptions, and platform settings.
          </p>
        </div>

        {/* Admin Stats */}
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
          <AdminStatsGrid />
        </Suspense>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<UserManagementLoadingSkeleton />}>
            <UserManagementSection />
          </Suspense>
          
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
            <CourseManagementSection />
          </Suspense>
        </div>

        {/* System Analytics */}
        <div ref={useIntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
            }
          });
        })}>
          <Suspense fallback={<SystemAnalyticsLoadingSkeleton />}>
            <SystemAnalyticsSection />
          </Suspense>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span className="text-sm font-medium">Manage Users</span>
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm font-medium">Add Course</span>
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium">View Analytics</span>
          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">System Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
}
