'use client';

interface SystemAnalyticsSectionProps {}

export default function SystemAnalyticsSection({}: SystemAnalyticsSectionProps) {
  return (
    <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">System Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">AI Chat Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Average Response Time</span>
              <span className="text-white text-sm">1.2s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Success Rate</span>
              <span className="text-green-400 text-sm">99.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Daily Queries</span>
              <span className="text-white text-sm">45.2K</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">User Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Daily Active Users</span>
              <span className="text-white text-sm">1,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Session Duration</span>
              <span className="text-white text-sm">24m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Course Completion</span>
              <span className="text-green-400 text-sm">78%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Server Uptime</span>
              <span className="text-green-400 text-sm">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">API Response Time</span>
              <span className="text-white text-sm">145ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Error Rate</span>
              <span className="text-red-400 text-sm">0.1%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4">Recent System Events</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">Database backup completed successfully</p>
                <p className="text-slate-400 text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">New course content deployed</p>
                <p className="text-slate-400 text-xs">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">Server maintenance scheduled</p>
                <p className="text-slate-400 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">CPU Usage</span>
                <span className="text-white text-sm">45%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Memory Usage</span>
                <span className="text-white text-sm">67%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Storage Usage</span>
                <span className="text-white text-sm">23%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '23%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
