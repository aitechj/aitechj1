'use client';

export default function SecuritySettingsForm() {
  return (
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
  );
}
