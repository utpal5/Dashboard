import React from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Calendar,
  Settings, 
  HelpCircle,
  Phone
} from 'lucide-react';

const Sidebar = ({ isCollapsed, onToggle, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', color: 'text-white' },
    { id: 'transactions', icon: ShoppingCart, label: 'Transactions', color: 'text-white' },
    { id: 'schedules', icon: Calendar, label: 'Schedules', color: 'text-white' },
    { id: 'users', icon: Users, label: 'Users', color: 'text-white' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-white' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-500 ease-in-out bg-blue-900 relative z-10`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-900" />
            </div>
            {!isCollapsed && (
              <div className="animate-fadeIn">
                <h1 className="text-xl font-bold text-white">
                  Board.
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full group relative flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-800 text-white shadow-lg' 
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className={`w-5 h-5 transition-colors duration-300`} />
                
                {!isCollapsed && (
                  <span className="ml-3 font-medium transition-all duration-300">
                    {item.label}
                  </span>
                )}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Help Section */}
        <div className="p-4 border-t border-blue-800">
          <div className="space-y-2">
            <div className="flex items-center text-blue-100 mb-4">
              <HelpCircle className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3 font-medium">Help</span>}
            </div>
            <button className="w-full flex items-center p-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-all duration-300 group">
              <Phone className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3 font-medium">Contact Us</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;