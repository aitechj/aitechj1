import { Navigation } from '@/components';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="ai chat" />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Chat History</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  New Chat
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors">
                  <h3 className="text-white text-sm font-medium mb-1">React Hooks Question</h3>
                  <p className="text-slate-400 text-xs">2 hours ago</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors">
                  <h3 className="text-white text-sm font-medium mb-1">AWS Lambda Best Practices</h3>
                  <p className="text-slate-400 text-xs">5 hours ago</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors">
                  <h3 className="text-white text-sm font-medium mb-1">Python Data Structures</h3>
                  <p className="text-slate-400 text-xs">1 day ago</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors">
                  <h3 className="text-white text-sm font-medium mb-1">Docker Containerization</h3>
                  <p className="text-slate-400 text-xs">2 days ago</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors">
                  <h3 className="text-white text-sm font-medium mb-1">JavaScript Async/Await</h3>
                  <p className="text-slate-400 text-xs">1 week ago</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Monthly Usage</span>
                  <span className="text-white text-sm font-semibold">127/500</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '25.4%'}}></div>
                </div>
                <p className="text-slate-400 text-xs mt-2">373 queries remaining</p>
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">AI Technical Assistant</h1>
                    <p className="text-slate-400">
                      Get instant help with coding problems, technical concepts, and project guidance.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Welcome Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 max-w-md">
                      <p className="text-white">
                        Hello! I'm your AI technical assistant. I can help you with programming questions, 
                        explain technical concepts, review code, and provide guidance on your projects. 
                        What would you like to learn about today?
                      </p>
                    </div>
                  </div>

                  {/* Sample Conversation */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-blue-600 rounded-lg p-4 max-w-md">
                      <p className="text-white">
                        Can you explain the difference between useEffect and useLayoutEffect in React?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 max-w-2xl">
                      <p className="text-white mb-3">
                        Great question! Both <code className="bg-slate-800 px-2 py-1 rounded text-blue-400">useEffect</code> and <code className="bg-slate-800 px-2 py-1 rounded text-blue-400">useLayoutEffect</code> are React hooks for side effects, but they differ in timing:
                      </p>
                      <div className="space-y-2 text-slate-300">
                        <p><strong className="text-white">useEffect:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Runs asynchronously after the DOM has been updated</li>
                          <li>Non-blocking - doesn't delay the browser's painting</li>
                          <li>Best for most side effects like data fetching, subscriptions</li>
                        </ul>
                        <p><strong className="text-white">useLayoutEffect:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Runs synchronously before the browser paints</li>
                          <li>Blocking - can delay painting if the effect takes time</li>
                          <li>Use when you need to measure DOM elements or prevent visual flicker</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-700 p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      placeholder="Ask me anything about programming, DevOps, cloud computing, or any technical topic..."
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send</span>
                    </button>
                    <button className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors text-sm">
                      Clear
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span>Powered by AI</span>
                    <span>•</span>
                    <span>Responses may take a few seconds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>127/500 queries used</span>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
