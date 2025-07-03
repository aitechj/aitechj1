'use client';

import React from 'react';

export default function SystemAnalyticsLoadingSkeleton() {
  return (
    <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-pulse">
      <div className="h-8 bg-slate-700 rounded mb-6 w-48"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="h-6 bg-slate-600 rounded mb-4 w-32"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-4 bg-slate-600 rounded w-24"></div>
                  <div className="h-4 bg-slate-600 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="h-6 bg-slate-600 rounded mb-4 w-40"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-slate-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-600 rounded mb-1 w-full"></div>
                  <div className="h-3 bg-slate-600 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="h-6 bg-slate-600 rounded mb-4 w-36"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-slate-600 rounded w-20"></div>
                  <div className="h-4 bg-slate-600 rounded w-12"></div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-slate-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
