'use client';

export default function LearningPreferencesForm() {
  return (
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
  );
}
