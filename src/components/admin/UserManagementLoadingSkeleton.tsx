'use client';

import React from 'react';

export default function UserManagementLoadingSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-slate-700 rounded w-40"></div>
        <div className="h-10 bg-slate-700 rounded w-24"></div>
      </div>
      
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
              <div>
                <div className="h-5 bg-slate-600 rounded mb-1 w-32"></div>
                <div className="h-4 bg-slate-600 rounded w-40"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-slate-600 rounded w-12"></div>
              <div className="h-4 w-4 bg-slate-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="h-5 bg-slate-700 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}
