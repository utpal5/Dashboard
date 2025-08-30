import { useState, useEffect } from 'react';

export function useRealtimeData() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAnalyticsData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          users: Math.floor(Math.random() * 1000) + 500,
          revenue: Math.floor(Math.random() * 50000) + 10000,
          orders: Math.floor(Math.random() * 200) + 50,
          conversion: Math.random() * 5 + 2,
        });
      }
      return data;
    };

    const generateActivity = () => {
      const actions = [
        'logged in', 'created account', 'made purchase', 'updated profile',
        'deleted item', 'exported data', 'changed settings', 'invited user'
      ];
      const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
      const types = ['success', 'warning', 'error', 'info'];
      
      return Array.from({ length: 10 }, (_, i) => ({
        id: `activity-${i}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date(Date.now() - i * 300000),
        type: types[Math.floor(Math.random() * types.length)],
      }));
    };

    // Initial data load
    setAnalyticsData(generateAnalyticsData());
    setRecentActivity(generateActivity());
    setIsLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalyticsData(generateAnalyticsData());
      setRecentActivity(generateActivity());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { analyticsData, recentActivity, isLoading };
}