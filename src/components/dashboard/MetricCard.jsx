import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAnimation } from '../../hooks/useAnimation';

const MetricCard = ({ title, value, change, trend, icon: IconComponent, delay = 0 }) => {
  const shouldAnimate = useAnimation(true, delay);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-600 bg-emerald-100/80 dark:bg-emerald-900/30';
      case 'down': return 'text-red-600 bg-red-100/80 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100/80 dark:bg-gray-800/30';
    }
  };

  return (
    <div className={`group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-1 ${shouldAnimate ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-4'}`}>
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
            <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg ${getTrendColor()} transition-all duration-300`}>
            {getTrendIcon()}
            <span className="text-sm font-semibold">
              {Math.abs(change)}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {value}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-4 h-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out transform origin-left"
            style={{ 
              width: shouldAnimate ? `${Math.min(Math.abs(change) * 10, 100)}%` : '0%',
              animationDelay: `${delay}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;