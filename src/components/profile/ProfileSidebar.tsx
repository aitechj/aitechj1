'use client';

interface ProfileSidebarProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    subscription: string;
  };
}

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{user.firstName} {user.lastName}</h3>
        <p className="text-slate-400 mb-4">{user.email}</p>
        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {user.subscription === 'free' ? 'Free Member' : 
           user.subscription === 'pro' ? 'Pro Member' : 'Enterprise Member'}
        </span>
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
  );
}
