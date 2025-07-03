'use client';

import { Navigation } from '@/components';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense, lazy } from 'react';

const ProfileSidebar = lazy(() => import('@/components/profile/ProfileSidebar'));
const AccountInformationForm = lazy(() => import('@/components/profile/AccountInformationForm'));
const SubscriptionSection = lazy(() => import('@/components/profile/SubscriptionSection'));
const LearningPreferencesForm = lazy(() => import('@/components/profile/LearningPreferencesForm'));
const SecuritySettingsForm = lazy(() => import('@/components/profile/SecuritySettingsForm'));

import SubscriptionLoadingSkeleton from '@/components/profile/SubscriptionLoadingSkeleton';

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="profile" />

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
          <p className="text-xl text-slate-300">
            Manage your account details, subscription, and learning preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            }>
              <ProfileSidebar user={user} />
            </Suspense>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded"></div>
                      <div className="h-10 bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            }>
              <AccountInformationForm user={user} />
            </Suspense>
            
            <Suspense fallback={<SubscriptionLoadingSkeleton />}>
              <SubscriptionSection user={user} />
            </Suspense>
            
            <Suspense fallback={
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            }>
              <LearningPreferencesForm />
            </Suspense>
            
            <Suspense fallback={
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            }>
              <SecuritySettingsForm />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
