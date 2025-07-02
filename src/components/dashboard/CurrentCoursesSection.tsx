'use client';

export default function CurrentCoursesSection() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Current Courses</h2>
      
      <div className="space-y-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Full Stack JavaScript Development</h3>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">IN PROGRESS</span>
          </div>
          <p className="text-slate-400 text-sm mb-3">
            Master modern web development with React, Node.js, and databases.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">65%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Continue
            </button>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">AWS Cloud Architecture</h3>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</span>
          </div>
          <p className="text-slate-400 text-sm mb-3">
            Learn to design and deploy scalable cloud solutions on AWS.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">12%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '12%'}}></div>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Continue
            </button>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Python for Data Science</h3>
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">PAUSED</span>
          </div>
          <p className="text-slate-400 text-sm mb-3">
            Analyze data and build machine learning models with Python.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">43%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '43%'}}></div>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Resume
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors">
          View All Courses →
        </button>
      </div>
    </div>
  );
}
