'use client';

import { Navigation } from '@/components';
import { auditApi, AuditLog } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState<{type: string, value: string}>({type: 'all', value: ''});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAuditLogs();
  }, [currentPage, filter]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (filter.type === 'entity' && filter.value) {
        response = await auditApi.getLogsByEntity(filter.value, currentPage);
      } else if (filter.type === 'severity' && filter.value) {
        response = await auditApi.getLogsBySeverity(filter.value, currentPage);
      } else {
        response = await auditApi.getAllLogs(currentPage);
      }
      
      if (response.data) {
        setAuditLogs(response.data.content);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      setError('Failed to fetch audit logs. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilter({type, value});
    setCurrentPage(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600';
      case 'ERROR': return 'bg-orange-600';
      case 'WARN': return 'bg-yellow-600';
      case 'INFO': return 'bg-blue-600';
      case 'DEBUG': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'CREATE': return 'bg-green-600';
      case 'UPDATE': return 'bg-blue-600';
      case 'DELETE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="audit" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Audit Logs</h1>
          <p className="text-xl text-slate-300">
            Track all database changes and system events across the platform.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <select 
            className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
            value={filter.type}
            onChange={(e) => handleFilterChange(e.target.value, filter.value)}
          >
            <option value="all">All Logs</option>
            <option value="entity">Filter by Entity</option>
            <option value="severity">Filter by Severity</option>
          </select>
          
          {filter.type === 'entity' && (
            <select
              className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              value={filter.value}
              onChange={(e) => handleFilterChange(filter.type, e.target.value)}
            >
              <option value="">Select Entity</option>
              <option value="User">User</option>
              <option value="Subscriber">Subscriber</option>
            </select>
          )}
          
          {filter.type === 'severity' && (
            <select
              className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              value={filter.value}
              onChange={(e) => handleFilterChange(filter.type, e.target.value)}
            >
              <option value="">Select Severity</option>
              <option value="DEBUG">Debug</option>
              <option value="INFO">Info</option>
              <option value="WARN">Warning</option>
              <option value="ERROR">Error</option>
              <option value="CRITICAL">Critical</option>
            </select>
          )}
          
          <button
            onClick={() => {
              setFilter({type: 'all', value: ''});
              setCurrentPage(0);
            }}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-600/20 border border-red-600 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-slate-300 mt-4">Loading audit logs...</p>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-300">No audit logs found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-white font-medium">Timestamp</th>
                      <th className="px-6 py-3 text-left text-white font-medium">Entity</th>
                      <th className="px-6 py-3 text-left text-white font-medium">Entity ID</th>
                      <th className="px-6 py-3 text-left text-white font-medium">Operation</th>
                      <th className="px-6 py-3 text-left text-white font-medium">Severity</th>
                      <th className="px-6 py-3 text-left text-white font-medium">User ID</th>
                      <th className="px-6 py-3 text-left text-white font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-t border-slate-600 hover:bg-slate-700/30">
                        <td className="px-6 py-4 text-slate-300 text-sm">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{log.entityName}</td>
                        <td className="px-6 py-4 text-slate-300">{log.entityId}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getOperationColor(log.operation)} text-white`}>
                            {log.operation}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(log.severity)} text-white`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{log.userId || 'System'}</td>
                        <td className="px-6 py-4">
                          {(log.oldValues || log.newValues) && (
                            <button
                              className="text-blue-400 hover:text-blue-300 text-sm"
                              onClick={() => {
                                const details = {
                                  oldValues: log.oldValues ? JSON.parse(log.oldValues) : null,
                                  newValues: log.newValues ? JSON.parse(log.newValues) : null
                                };
                                alert(JSON.stringify(details, null, 2));
                              }}
                            >
                              View Changes
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-slate-700/50 border-t border-slate-600 flex justify-between items-center">
                <div className="text-slate-300 text-sm">
                  Showing {auditLogs.length} of {totalElements} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-white text-sm">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Audit Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Logs</span>
                <span className="text-white">{totalElements}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Page</span>
                <span className="text-white">{currentPage + 1} of {totalPages}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Filter Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Filter Type</span>
                <span className="text-white capitalize">{filter.type}</span>
              </div>
              {filter.value && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Filter Value</span>
                  <span className="text-white">{filter.value}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded text-xs bg-green-600 text-white">CREATE</span>
                <span className="text-slate-400">New record</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded text-xs bg-blue-600 text-white">UPDATE</span>
                <span className="text-slate-400">Modified record</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded text-xs bg-red-600 text-white">DELETE</span>
                <span className="text-slate-400">Removed record</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
