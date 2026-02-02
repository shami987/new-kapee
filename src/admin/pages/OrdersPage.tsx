import { AdminLayout, OrderFilters, OrderDetailsModal, OrderStats, ErrorBoundary } from '../components';
import { Search, Plus, Edit, Trash2, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import type { Order } from '../../types';

export const OrdersPage = () => {
  // State for UI interactions
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const itemsPerPage = 10;

  // Use custom hook to manage orders data and API calls
  const {
    loading,
    error,
    stats,
    searchQuery,
    setSearchQuery,
    fetchOrders,
    updateOrder,
    deleteOrder,
    filterOrders,
  } = useOrders();

  // Apply filters and search to get filtered orders
  const filteredOrders = filterOrders(filters);

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
  const handleDeleteOrder = async (order: Order) => {
    const customerName = order.user?.email || 'Unknown Customer';
    const orderTotal = formatCurrency(order.total || 0);
    
    if (window.confirm(`Are you sure you want to delete this order?\n\nOrder ID: ${order._id || order.id}\nCustomer: ${customerName}\nTotal: ${orderTotal}\n\nThis action cannot be undone.`)) {
      const success = await deleteOrder(order._id || order.id);
      if (success) {
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete order. Please try again.');
      }
    }
  };

  // Handle order editing
  const handleEditOrder = (order: Order) => {
    setEditingOrderId(order._id || order.id);
    setEditFormData({
      status: order.status,
      total: order.total || 0,
      customerEmail: order.user?.email || ''
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditFormData({});
  };

  // Handle update order
  const handleUpdateOrder = async (orderId: string) => {
    const success = await updateOrder(orderId, {
      status: editFormData.status,
      total: editFormData.total,
      // Note: Customer email update would require updating the user record separately
    });
    if (success) {
      alert('Order updated successfully!');
      setEditingOrderId(null);
      setEditFormData({});
    } else {
      alert('Failed to update order. Please try again.');
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
              <div className="flex-1 w-full sm:max-w-md">
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
              <div className="flex gap-2 w-full sm:w-auto">
                {/* Refresh button to reload data from API */}
                <button 
                  onClick={handleRefresh}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
                  disabled={loading}
                >
                  <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={18} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none">
                  <Plus size={18} />
                  <span className="hidden sm:inline">New Order</span>
                </button>
              </div>
            </div>

            {/* Orders Table - now displaying real API data */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm">Order ID</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm hidden sm:table-cell">Customer</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm">Items</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm">Total</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm hidden md:table-cell">Date</th>
                    <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => {
                    const isEditing = editingOrderId === (order._id || order.id);
                    
                    return (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-3 sm:px-6">
                          <span className="font-mono text-xs sm:text-sm font-medium text-blue-600">#{(order._id || order.id).slice(-8)}</span>
                        </td>
                        <td className="py-4 px-3 sm:px-6 hidden sm:table-cell">
                          {isEditing ? (
                            <input
                              type="email"
                              value={editFormData.customerEmail}
                              onChange={(e) => setEditFormData({...editFormData, customerEmail: e.target.value})}
                              className="w-full p-1 border rounded text-sm"
                              placeholder="Customer email"
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {order.user?.email ? 
                                    order.user.email.charAt(0).toUpperCase() : 
                                    'U'
                                  }
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 text-sm truncate max-w-32">
                                {order.user?.email || 'Guest User'}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-3 sm:px-6 text-gray-600 text-sm">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="py-4 px-3 sm:px-6">
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editFormData.total}
                              onChange={(e) => setEditFormData({...editFormData, total: parseFloat(e.target.value)})}
                              className="w-20 p-1 border rounded text-sm"
                            />
                          ) : (
                            <span className="font-bold text-gray-900 text-sm">{formatCurrency(order.total || 0)}</span>
                          )}
                        </td>
                        <td className="py-4 px-3 sm:px-6">
                          {isEditing ? (
                            <select
                              value={editFormData.status}
                              onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                              className="p-1 border rounded text-xs"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="shipped">Shipped</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-3 sm:px-6 text-gray-600 text-sm hidden md:table-cell">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-3 sm:px-6">
                          {isEditing ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleUpdateOrder(order._id || order.id)}
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditOrder(order)}
                                className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" 
                                title="Edit"
                              >
                                <Edit size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order)}
                                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Delete"
                              >
                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination - updated to show real data counts */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-t border-gray-200 gap-4">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
              </p>
              <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
