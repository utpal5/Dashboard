import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Mail, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      role: 'admin',
      status: 'active',
      lastActive: new Date(Date.now() - 300000),
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      role: 'user',
      status: 'active',
      lastActive: new Date(Date.now() - 900000),
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      role: 'manager',
      status: 'pending',
      lastActive: new Date(Date.now() - 3600000),
      createdAt: new Date('2024-03-10'),
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      role: 'user',
      status: 'inactive',
      lastActive: new Date(Date.now() - 86400000),
      createdAt: new Date('2024-01-05'),
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      role: 'user',
      status: 'active',
      lastActive: new Date(Date.now() - 600000),
      createdAt: new Date('2024-02-28'),
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case 'active': return `${baseClasses} bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300`;
      case 'inactive': return `${baseClasses} bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-300`;
      case 'pending': return `${baseClasses} bg-amber-100/80 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`;
      default: return baseClasses;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-semibold";
    switch (role) {
      case 'admin': return `${baseClasses} bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300`;
      case 'manager': return `${baseClasses} bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300`;
      case 'user': return `${baseClasses} bg-gray-100/80 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300`;
      default: return baseClasses;
    }
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{users.length} total users</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {filteredUsers.map((user, index) => (
              <tr 
                key={user.id} 
                className={`group hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 ${
                  animatedItems.has(index) ? 'animate-fadeIn opacity-100' : 'opacity-0'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-gray-700 group-hover:ring-indigo-500/50 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{user.email}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getRoleBadge(user.role)}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={getStatusBadge(user.status)}>
                    {getStatusIcon(user.status)}
                    <span>{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-3 h-3" />
                    <span>{formatLastActive(user.lastActive)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 group/btn">
                      <Edit className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                    <button className="p-2 hover:bg-red-100/80 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 group/btn">
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                    <button className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group/btn">
                      <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;