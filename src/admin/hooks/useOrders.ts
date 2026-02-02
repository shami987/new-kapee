import { useState, useEffect, useCallback } from 'react';
import { adminOrdersAPI } from '../../services/api';
import type { Order } from '../../types';

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  delivered: number;
  cancelled: number;
}

interface OrderFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  customer?: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0
  });

  const calculateStats = useCallback((ordersData: Order[]): OrderStats => {
    return {
      total: ordersData.length,
      pending: ordersData.filter(o => o.status === 'pending').length,
      processing: ordersData.filter(o => o.status === 'paid' || o.status === 'shipped').length,
      delivered: ordersData.filter(o => o.status === 'completed').length,
      cancelled: ordersData.filter(o => o.status === 'cancelled').length,
    };
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminOrdersAPI.getOrders();
      const ordersData = response.data;
      setOrders(ordersData);
      setStats(calculateStats(ordersData));
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: Order['status']) => {
    try {
      setError(null);
      await adminOrdersAPI.updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setStats(calculateStats(updatedOrders));
      return true;
    } catch (err: any) {
      console.error('Error updating order status:', err);
      setError(err.response?.data?.message || 'Failed to update order status');
      return false;
    }
  }, [orders, calculateStats]);

  const deleteOrder = useCallback(async (orderId: string) => {
    try {
      setError(null);
      await adminOrdersAPI.deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setStats(calculateStats(updatedOrders));
      return true;
    } catch (err: any) {
      console.error('Error deleting order:', err);
      setError(err.response?.data?.message || 'Failed to delete order');
      return false;
    }
  }, [orders, calculateStats]);

  const filterOrders = useCallback((filters: OrderFilters, searchQuery: string = '') => {
    return orders.filter(order => {
      const matchesSearch = !searchQuery || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = !filters.status || order.status === filters.status;
      const orderDate = new Date(order.createdAt);
      const matchesDateFrom = !filters.dateFrom || orderDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || orderDate <= new Date(filters.dateTo);

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [orders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    stats,
    fetchOrders,
    updateOrderStatus,
    deleteOrder,
    filterOrders,
  };
};