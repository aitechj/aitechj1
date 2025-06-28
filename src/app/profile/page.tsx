import { Navigation } from '@/components';

export default function ProfilePage() {
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
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">John Developer</h3>
                <p className="text-slate-400 mb-4">john.developer@email.com</p>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Pro Member</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Member Since</span>
                  <span className="text-white">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Courses Completed</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Learning Streak</span>
                  <span className="text-white">45 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Study Time</span>
                  <span className="text-white">127 hours</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <h4 className="text-white font-semibold mb-3">Achievements</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-yellow-600 rounded-lg p-2 text-center">
                    <div className="text-white text-xs">🏆</div>
                    <div className="text-white text-xs">Expert</div>
                  </div>
                  <div className="bg-green-600 rounded-lg p-2 text-center">
                    <div className="text-white text-xs">🎯</div>
                    <div className="text-white text-xs">Focused</div>
                  </div>
                  <div className="bg-purple-600 rounded-lg p-2 text-center">
                    <div className="text-white text-xs">🔥</div>
                    <div className="text-white text-xs">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value="John"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value="Developer"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value="john.developer@email.com"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm font-medium mb-2">Bio</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about yourself and your learning goals..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Subscription & Billing */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Subscription & Billing</h2>
              
              <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Pro Plan</h3>
                    <p className="text-blue-300 text-sm">Unlimited courses and AI chat queries</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">$29/month</p>
                    <p className="text-blue-300 text-sm">Next billing: Feb 15, 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">AI Chat Usage</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">This Month</span>
                    <span className="text-white text-sm">Unlimited</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Course Access</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Available</span>
                    <span className="text-white text-sm">All Courses</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors">
                  Change Plan
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Learning Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-3">Preferred Learning Topics</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'DevOps', 'Machine Learning', 'Cybersecurity'].map((topic) => (
                      <label key={topic} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500" />
                        <span className="text-white text-sm">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-3">Difficulty Level</label>
                  <div className="flex space-x-4">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <label key={level} className="flex items-center space-x-2">
                        <input type="radio" name="difficulty" className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-white text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-3">Email Notifications</label>
                  <div className="space-y-2">
                    {[
                      'Course updates and new content',
                      'Learning reminders and streaks',
                      'AI chat improvements and tips',
                      'Platform updates and announcements'
                    ].map((notification) => (
                      <label key={notification} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500" />
                        <span className="text-white text-sm">{notification}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4">
                    Update Password
                  </button>
                </div>
                
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-white font-medium mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300">Add an extra layer of security to your account</p>
                      <p className="text-slate-400 text-sm">Status: Not enabled</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-white font-medium mb-3">Account Deletion</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
