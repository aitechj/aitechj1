'use client';

import React, { useState, useEffect } from 'react';
import { PerformanceMetrics } from '@/utils/performance';

interface PerformanceData extends PerformanceMetrics {
  timestamp: number;
  url: string;
  userId: string;
}

export default function PerformanceMonitoringSection() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<keyof PerformanceMetrics>('lcp');

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      setIsLoading(true);
      const mockData: PerformanceData[] = [
        {
          fcp: 1200,
          lcp: 2100,
          fid: 45,
          cls: 0.05,
          ttfb: 180,
          timestamp: Date.now() - 3600000,
          url: '/dashboard',
          userId: 'user123'
        },
        {
          fcp: 1350,
          lcp: 2300,
          fid: 52,
          cls: 0.08,
          ttfb: 220,
          timestamp: Date.now() - 1800000,
          url: '/admin',
          userId: 'admin456'
        },
        {
          fcp: 1100,
          lcp: 1950,
          fid: 38,
          cls: 0.03,
          ttfb: 165,
          timestamp: Date.now() - 900000,
          url: '/profile',
          userId: 'user789'
        }
      ];
      
      setPerformanceData(mockData);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMetricThreshold = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };
    
    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const formatMetricValue = (metric: keyof PerformanceMetrics, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  const getAverageMetric = (metric: keyof PerformanceMetrics) => {
    const values = performanceData
      .map(data => data[metric])
      .filter((value): value is number => value !== undefined);
    
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance Monitoring</h3>
        <button
          onClick={fetchPerformanceData}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {(['fcp', 'lcp', 'fid', 'cls', 'ttfb'] as const).map((metric) => {
          const average = getAverageMetric(metric);
          const status = getMetricThreshold(metric, average);
          const isSelected = selectedMetric === metric;
          
          return (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`p-4 rounded-lg border transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="text-sm text-slate-400 uppercase tracking-wide">
                {metric.toUpperCase()}
              </div>
              <div className={`text-lg font-semibold ${getMetricColor(status)}`}>
                {formatMetricValue(metric, average)}
              </div>
              <div className={`text-xs ${getMetricColor(status)}`}>
                {status.replace('-', ' ')}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Recent Performance Data</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-2 text-slate-400">Timestamp</th>
                <th className="text-left py-2 text-slate-400">Page</th>
                <th className="text-left py-2 text-slate-400">FCP</th>
                <th className="text-left py-2 text-slate-400">LCP</th>
                <th className="text-left py-2 text-slate-400">FID</th>
                <th className="text-left py-2 text-slate-400">CLS</th>
                <th className="text-left py-2 text-slate-400">TTFB</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="py-2 text-slate-300">
                    {new Date(data.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 text-slate-300">{data.url}</td>
                  <td className={`py-2 ${getMetricColor(getMetricThreshold('fcp', data.fcp || 0))}`}>
                    {data.fcp ? formatMetricValue('fcp', data.fcp) : '-'}
                  </td>
                  <td className={`py-2 ${getMetricColor(getMetricThreshold('lcp', data.lcp || 0))}`}>
                    {data.lcp ? formatMetricValue('lcp', data.lcp) : '-'}
                  </td>
                  <td className={`py-2 ${getMetricColor(getMetricThreshold('fid', data.fid || 0))}`}>
                    {data.fid ? formatMetricValue('fid', data.fid) : '-'}
                  </td>
                  <td className={`py-2 ${getMetricColor(getMetricThreshold('cls', data.cls || 0))}`}>
                    {data.cls ? formatMetricValue('cls', data.cls) : '-'}
                  </td>
                  <td className={`py-2 ${getMetricColor(getMetricThreshold('ttfb', data.ttfb || 0))}`}>
                    {data.ttfb ? formatMetricValue('ttfb', data.ttfb) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
        <h5 className="text-sm font-medium text-white mb-2">Performance Insights</h5>
        <div className="text-sm text-slate-300 space-y-1">
          <p>• Monitor Core Web Vitals to ensure optimal user experience</p>
          <p>• FCP and LCP should be under 2.5s for good performance</p>
          <p>• CLS should be under 0.1 to avoid layout shifts</p>
          <p>• FID should be under 100ms for responsive interactions</p>
        </div>
      </div>
    </div>
  );
}
