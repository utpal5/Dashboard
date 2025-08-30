import React from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { useStaggeredAnimation } from '../../hooks/useAnimation';

const ActivityFeed = ({ activities }) => {
  const animatedItems = useStaggeredAnimation(activities, 100);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'success': return 'border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20';
      case 'warning': return 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/20';
      case 'error': return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20';
      default: return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/20';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Live user interactions</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`group/item relative border-l-4 rounded-r-xl p-4 transition-all duration-500 hover:shadow-lg transform hover:translate-x-1 ${getActivityColor(activity.type)} ${
              animatedItems.has(index) ? 'animate-slideInRight opacity-100' : 'opacity-0 translate-x-4'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {activity.user}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {activity.action}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <button className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 rounded-md transition-colors duration-200">
                  <Info className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent pointer-events-none rounded-b-2xl" />
    </div>
  );
};

export default ActivityFeed;