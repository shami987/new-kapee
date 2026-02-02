import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '../components';
import { adminCartAPI } from '../../services/api';
import type { AdminCart } from '../../types';
import { Search, Trash2, Eye, RefreshCw, ShoppingCart, User, Calendar } from 'lucide-react';

export const CartsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  // Generate a user-friendly display name
  const getUserDisplayName = (cart: AdminCart) => {
    return cart.user?.name || 'Guest User';
  };

  // Get user email or fallback
  const getUserEmail = (cart: AdminCart) => {
    return cart.user?.email || 'No email provided';
  };

  // Fetch all carts
  const { data: carts = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-carts'],
    queryFn: async () => {
      const response = await adminCartAPI.getAllCarts();
      return response.data as AdminCart[];
    },
  });

  // Delete cart mutation
  const deleteCartMutation = useMutation({
    mutationFn: (cartId: string) => adminCartAPI.deleteCart(cartId),
    onSuccess: (data, cartId) => {
      // Remove the cart from the cache immediately
      queryClient.setQueryData(['admin-carts'], (oldCarts: AdminCart[] = []) => 
        oldCarts.filter(cart => cart._id !== cartId)
      );
      alert('Cart deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Delete cart error:', error);
      alert(`Failed to delete cart: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    },
  });

  // Clear abandoned carts mutation
  const clearAbandonedMutation = useMutation({
    mutationFn: () => adminCartAPI.clearAbandonedCarts(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carts'] });
    },
  });

  // Filter carts based on search
  const filteredCarts = carts.filter(cart => {
    const displayName = getUserDisplayName(cart).toLowerCase();
    const email = getUserEmail(cart).toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    return displayName.includes(searchLower) ||
           email.includes(searchLower) ||
           cart.items.some(item => item.product.name.toLowerCase().includes(searchLower));
  });

  // Calculate cart total
  const getCartTotal = (cart: AdminCart) => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteCart = (cartId: string, cart: AdminCart) => {
    const userName = getUserDisplayName(cart);
    const itemCount = cart.items.length;
    const totalValue = getCartTotal(cart).toFixed(2);
    
    const confirmMessage = `Are you sure you want to delete ${userName}'s cart?\n\nThis will permanently remove:\n• ${itemCount} item(s)\n• Total value: $${totalValue}\n\nThis action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      deleteCartMutation.mutate(cartId);
    }
  };

  const handleClearAbandoned = () => {
    if (window.confirm('Are you sure you want to clear all abandoned carts? This action cannot be undone.')) {
      clearAbandonedMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Cart Management">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
          <span className="ml-2 text-gray-600">Loading carts...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Cart Management">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading carts. Please try again.</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Cart Management">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">{carts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(carts.map(cart => cart.userId)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${carts.reduce((total, cart) => total + getCartTotal(cart), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by user name, email, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button 
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button 
              onClick={handleClearAbandoned}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 size={18} />
              Clear Abandoned
            </button>
          </div>
        </div>

        {/* Carts Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Total Value</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Last Updated</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No carts found
                  </td>
                </tr>
              ) : (
                filteredCarts.map((cart) => (
                  <tr key={cart._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">
                          {getUserDisplayName(cart)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getUserEmail(cart)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        {cart.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{item.quantity}x</span> {item.product.name}
                          </div>
                        ))}
                        {cart.items.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{cart.items.length - 2} more items
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ${getCartTotal(cart).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {formatDate(cart.updatedAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCart(cart._id, cart)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CartsPage;