import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatsOverview from './components/dashboard/StatsOverview';
import AnalyticsChart from './components/dashboard/AnalyticsChart';
import ActivityFeed from './components/dashboard/ActivityFeed';
import UserTable from './components/dashboard/UserTable';
import AddProfileModal from './components/dashboard/AddProfileModal';
import { useTheme } from './hooks/useTheme';
import { useRealtimeData } from './hooks/useRealtimeData';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { analyticsData, recentActivity, isLoading } = useRealtimeData();

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
              </div>
              <button
                onClick={() => setShowAddProfileModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Add New Profile
              </button>
            </div>
            
            <StatsOverview />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <AnalyticsChart data={analyticsData} title="Activities" />
              </div>
              <div>
                <ActivityFeed activities={recentActivity} />
              </div>
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-8">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transactions</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage and monitor all transaction activities.</p>
            </div>
            
            <UserTable />
          </div>
        );
      
      case 'schedules':
        return (
          <div className="space-y-8">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Schedules</h2>
              <p className="text-gray-600 dark:text-gray-400">View and manage your schedules.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalyticsChart data={analyticsData} title="Schedule Overview" />
              <AnalyticsChart data={analyticsData} title="Timeline Analysis" />
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="space-y-8">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Users</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage and monitor all user accounts and activities.</p>
            </div>
            
            <UserTable />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-8">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
              <p className="text-gray-600 dark:text-gray-400">Configure your dashboard preferences.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme</h3>
                    <p className="text-gray-600 dark:text-gray-400">Switch between light and dark mode</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDark ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDark ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <p className="text-gray-600 dark:text-gray-400">Manage notification preferences</p>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <div className="flex h-screen relative">
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isDark={isDark}
            onThemeToggle={toggleTheme}
          />
          
          <main className="flex-1 overflow-auto p-6 relative">
            <div className="max-w-7xl mx-auto">
              {renderMainContent()}
            </div>
          </main>
        </div>
      </div>

      {showAddProfileModal && (
        <AddProfileModal 
          isOpen={showAddProfileModal}
          onClose={() => setShowAddProfileModal(false)}
        />
      )}
    </div>
  );
}

export default App;