'use client';

import React from 'react';

export default function SubscriptionLoadingSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
      <div className="h-8 bg-slate-700 rounded mb-6 w-48"></div>
      
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 bg-slate-600 rounded mb-2 w-24"></div>
            <div className="h-4 bg-slate-600 rounded w-64"></div>
          </div>
          <div className="text-right">
            <div className="h-6 bg-slate-600 rounded mb-2 w-20"></div>
            <div className="h-4 bg-slate-600 rounded w-32"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="h-5 bg-slate-600 rounded mb-2 w-28"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-slate-600 rounded w-20"></div>
              <div className="h-4 bg-slate-600 rounded w-16"></div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-slate-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <div className="h-10 bg-slate-700 rounded w-28"></div>
        <div className="h-10 bg-slate-700 rounded w-36"></div>
      </div>
    </div>
  );
}
