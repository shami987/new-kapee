import { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Eye, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => {}}
        onSearch={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {activeTab === 'profile' && <ProfileSection user={user} />}
              {activeTab === 'orders' && <OrdersSection />}
              {activeTab === 'wishlist' && <WishlistSection />}
              {activeTab === 'settings' && <SettingsSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSection = ({ user }: { user: any }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={user?.name || ''}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>
    </div>
  </div>
);

const OrdersSection = () => {
  const { data: orders = [], isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId: string) => apiClient.put(`/orders/${orderId}`, { status: 'cancelled' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders yet</p>
          <p className="text-sm text-gray-500">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order._id?.slice(-8)}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${order.totalAmount || order.total || 0}</span>
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  {order.items?.length || 0} item(s)
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewOrder(order)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                    disabled={cancelOrderMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Order Details</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <p className="text-gray-900">#{(selectedOrder as any)._id?.slice(-8)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-gray-900 capitalize">{(selectedOrder as any).status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-gray-900">{new Date((selectedOrder as any).createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total</label>
                    <p className="text-gray-900">${(selectedOrder as any).totalAmount || (selectedOrder as any).total || 0}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                  <div className="space-y-2">
                    {(selectedOrder as any).items?.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WishlistSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
    <div className="text-center py-12">
      <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600">Your wishlist is empty</p>
      <p className="text-sm text-gray-500">Add items to your wishlist to see them here</p>
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
);