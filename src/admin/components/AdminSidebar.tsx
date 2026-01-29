import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Package, Users, ShoppingCart, Settings, LogOut } from 'lucide-react';

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: BarChart3 },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">Nova Store</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
