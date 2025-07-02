'use client';

interface UserManagementSectionProps {}

export default function UserManagementSection({}: UserManagementSectionProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add User
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div>
              <p className="text-white font-medium">John Developer</p>
              <p className="text-slate-400 text-sm">john.dev@email.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Pro</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">SM</span>
            </div>
            <div>
              <p className="text-white font-medium">Sarah Martinez</p>
              <p className="text-slate-400 text-sm">sarah.m@email.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Basic</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">MJ</span>
            </div>
            <div>
              <p className="text-white font-medium">Mike Johnson</p>
              <p className="text-slate-400 text-sm">mike.j@email.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">Enterprise</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors">
          View All Users →
        </button>
      </div>
    </div>
  );
}
