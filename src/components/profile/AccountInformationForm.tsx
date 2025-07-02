'use client';

interface AccountInformationFormProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AccountInformationForm({ user }: AccountInformationFormProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-slate-400 text-sm font-medium mb-2">First Name</label>
          <input
            id="firstName"
            type="text"
            defaultValue={user.firstName}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-slate-400 text-sm font-medium mb-2">Last Name</label>
          <input
            id="lastName"
            type="text"
            defaultValue={user.lastName}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-slate-400 text-sm font-medium mb-2">Email Address</label>
          <input
            id="email"
            type="email"
            defaultValue={user.email}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-slate-400 text-sm font-medium mb-2">Bio</label>
          <textarea
            id="bio"
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
  );
}
