import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$847,392',
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Transactions',
      value: '3,269',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Likes',
      value: '12,847',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <Icon className={`w-4 h-4 ${stat.textColor} mr-1`} />
              <span className={`text-sm font-medium ${stat.textColor}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                from last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;