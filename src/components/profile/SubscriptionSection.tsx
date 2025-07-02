'use client';

interface SubscriptionSectionProps {
  user: {
    subscription: string;
  };
}

export default function SubscriptionSection({ user }: SubscriptionSectionProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Subscription & Billing</h2>
      
      <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">
              {user.subscription === 'free' ? 'Free Plan' : 
               user.subscription === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
            </h3>
            <p className="text-blue-300 text-sm">
              {user.subscription === 'free' ? 'Limited courses and AI chat queries' :
               user.subscription === 'pro' ? 'Unlimited courses and AI chat queries' :
               'Unlimited everything plus priority support'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">
              {user.subscription === 'free' ? 'Free' :
               user.subscription === 'pro' ? '$29/month' : '$99/month'}
            </p>
            <p className="text-blue-300 text-sm">
              {user.subscription !== 'free' ? 'Next billing: Feb 15, 2024' : 'Upgrade anytime'}
            </p>
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
  );
}
