'use client';

interface CourseManagementSectionProps {}

export default function CourseManagementSection({}: CourseManagementSectionProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Course Management</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add Course
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Full Stack JavaScript Development</h3>
            <p className="text-slate-400 text-sm">12 weeks • 847 enrolled • Active</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">ACTIVE</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div>
            <h3 className="text-white font-medium">AWS Cloud Architecture</h3>
            <p className="text-slate-400 text-sm">8 weeks • 523 enrolled • Active</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
          <div>
            <h3 className="text-white font-medium">Python for Data Science</h3>
            <p className="text-slate-400 text-sm">10 weeks • 692 enrolled • Draft</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">DRAFT</span>
            <button className="text-slate-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="w-full text-green-400 hover:text-green-300 text-sm transition-colors">
          View All Courses →
        </button>
      </div>
    </div>
  );
}
