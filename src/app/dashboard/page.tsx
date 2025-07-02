import { Navigation } from '@/components';
import { 
  DashboardStatsGrid, 
  CurrentCoursesSection, 
  RecentActivitySection, 
  AIChatUsageSection 
} from '@/components/dashboard';

export default function DashboardPage() {
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
        <DashboardStatsGrid />

        {/* Current Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CurrentCoursesSection />

          <div>
            <RecentActivitySection />
            <AIChatUsageSection />
          </div>
        </div>
      </main>
    </div>
  );
}
