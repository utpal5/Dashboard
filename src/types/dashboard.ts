export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  lastActive: Date;
  createdAt: Date;
}

export interface AnalyticsData {
  date: string;
  users: number;
  revenue: number;
  orders: number;
  conversion: number;
}

export interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'success' | 'warning' | 'error' | 'info';
}