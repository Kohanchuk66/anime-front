import React, { useState } from 'react';
import { Shield, Users, MessageSquare, Flag, Plus, Ban, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function ModerationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reports');

  if (!user || (user.role !== 'moderator' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    ...(user.role === 'admin' ? [{ id: 'news', label: 'News', icon: Plus }] : [])
  ];

  const mockReports = [
    {
      id: '1',
      type: 'review',
      targetId: 'review-1',
      reporter: 'user123',
      reason: 'Spam',
      description: 'This review contains spam content',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'user',
      targetId: 'user-456',
      reporter: 'user789',
      reason: 'Harassment',
      description: 'User is harassing other members',
      status: 'pending',
      createdAt: '2024-01-14'
    }
  ];

  const mockUsers = [
    {
      id: '1',
      username: 'problematic_user',
      email: 'problem@example.com',
      joinDate: '2024-01-01',
      status: 'active',
      reportCount: 3
    },
    {
      id: '2',
      username: 'spam_account',
      email: 'spam@example.com',
      joinDate: '2024-01-10',
      status: 'suspended',
      reportCount: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-purple-400" />
            Moderation Panel
          </h1>
          <p className="text-gray-400">Manage reports, users, and content</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'reports' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Reports</h2>
              <div className="flex space-x-2">
                <select className="bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">All Reports</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        report.type === 'user' ? 'bg-red-600/20 text-red-400' : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {report.type}
                      </span>
                      <span className="text-white font-medium">Reported by: {report.reporter}</span>
                      <span className="text-gray-400 text-sm">{report.createdAt}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.status === 'pending' ? 'bg-orange-600/20 text-orange-400' : 'bg-green-600/20 text-green-400'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-white font-medium mb-2">Reason: {report.reason}</p>
                    <p className="text-gray-300">{report.description}</p>
                  </div>
                  
                  {report.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </button>
                      <button className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        <XCircle className="h-4 w-4 mr-2" />
                        Dismiss
                      </button>
                      <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        View Target
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <div className="flex space-x-2">
                <select className="bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Reports
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {mockUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{user.username}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.reportCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-600/20 text-green-400' :
                          user.status === 'suspended' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-red-600/20 text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            View
                          </button>
                          <button className="text-yellow-400 hover:text-yellow-300">
                            Warn
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <Ban className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Review Moderation</h2>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No flagged reviews at the moment.</p>
            </div>
          </div>
        )}

        {activeTab === 'news' && user.role === 'admin' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">News Management</h2>
              <button className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Create News
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Plus className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">News management interface would go here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}