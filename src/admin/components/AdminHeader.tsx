import { Bell, Search } from 'lucide-react';

export const AdminHeader = ({ title }: { title: string }) => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        {/* Search & Actions */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-48 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {userData?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userData?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
