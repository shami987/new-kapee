import { AdminLayout, OrderFilters, OrderDetailsModal, OrderStats, ErrorBoundary } from '../components';
import { Search, Plus, Edit, Trash2, Eye, MoreVertical, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import type { Order } from '../../types';

export const OrdersPage = () => {
  // State for UI interactions
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const itemsPerPage = 10;

  // Use custom hook to manage orders data and API calls
  const {
    loading,
    error,
    stats,
    fetchOrders,
    deleteOrder,
    filterOrders,
  } = useOrders();

  // Apply filters and search to get filtered orders
  const filteredOrders = filterOrders(filters, searchQuery);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle filter changes from OrderFilters component
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const success = await deleteOrder(orderId);
      if (success) {
        // Show success message or toast notification here
        console.log('Order deleted successfully');
      }
    }
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchOrders();
  };

  // Map order status to display colors and text
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid':
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Map status to display text
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'paid': return 'Paid';
      case 'shipped': return 'Shipped';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  // Format currency display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ErrorBoundary>
      {/* Show loading spinner while fetching data */}
      {loading && (
        <AdminLayout title="Orders Management">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
            <span className="ml-2 text-gray-600">Loading orders...</span>
          </div>
        </AdminLayout>
      )}

      {/* Show error message if API call failed */}
      {error && (
        <AdminLayout title="Orders Management">
          <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-red-800 font-medium">Error loading orders</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </AdminLayout>
      )}

      {/* Main orders page content */}
      {!loading && !error && (
        <AdminLayout title="Orders Management">
          {/* Order Statistics - now using real data from API */}
          <OrderStats stats={stats} />

          {/* Filters - connected to real filtering logic */}
          <OrderFilters onFilterChange={handleFilterChange} />

          <div className="bg-white rounded-lg border border-gray-200">
            {/* Header with search and refresh functionality */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search orders, customers, products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {/* Refresh button to reload data from API */}
                <button 
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={18} />
                  Refresh
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={18} />
                  New Order
                </button>
              </div>
            </div>

            {/* Orders Table - now displaying real API data */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Items</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm font-medium text-blue-600">#{order.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {order.shippingAddress?.name ? 
                                order.shippingAddress.name.split(' ').map(n => n[0]).join('') : 
                                'U'
                              }
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {order.shippingAddress?.name || 'Unknown Customer'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1">
                          {/* View order details */}
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {/* Edit order (could open status update modal) */}
                          <button 
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          {/* Delete order with confirmation */}
                          <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          {/* More actions menu */}
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="More">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - updated to show real data counts */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Order Details Modal - now receives real order data */}
          <OrderDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            order={selectedOrder}
          />
        </AdminLayout>
      )}
    </ErrorBoundary>
  );
};

export default OrdersPage;
