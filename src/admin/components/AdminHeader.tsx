import { Bell, Search, Menu } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const AdminHeader = ({ title, onMenuClick }: AdminHeaderProps) => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile menu button + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{title}</h2>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-32 lg:w-48 text-sm"
            />
          </div>

          {/* Mobile search button */}
          <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 sm:pl-4 lg:pl-6 border-l border-gray-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {userData?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 truncate max-w-24 lg:max-w-none">{userData?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
