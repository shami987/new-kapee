import { useState, useEffect, useCallback } from 'react';
import { adminOrdersAPI } from '../../services/api';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  growthRate: number;
  revenueChange: string;
  ordersChange: string;
  customersChange: string;
  growthChange: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'Delivered' | 'Pending' | 'Processing' | 'Cancelled';
  date: string;
  items: number;
}

interface AnalyticsData {
  conversionRate: number;
  avgOrderValue: number;
  customerRetention: number;
  categoryBreakdown: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStatsFromOrders = (orders: any[]) => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrders = orders.length;
    
    return {
      totalRevenue,
      totalOrders,
      totalCustomers: new Set(orders.map(o => o.userId || o.user?.email)).size,
      growthRate: 23.5,
      revenueChange: '+20.1%',
      ordersChange: '+12.5%',
      customersChange: '+8.2%',
      growthChange: '+4.3%'
    };
  };

  const generateRevenueData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 20000) + 30000,
      orders: Math.floor(Math.random() * 50) + 100
    }));
  };

  const generateTopProducts = (orders: any[]) => {
    const productCounts: { [key: string]: { sales: number; revenue: number } } = {};
    
    orders.forEach(order => {
      order.items?.forEach((item: any) => {
        const name = item.name || 'Unknown Product';
        if (!productCounts[name]) {
          productCounts[name] = { sales: 0, revenue: 0 };
        }
        productCounts[name].sales += item.quantity || 1;
        productCounts[name].revenue += (item.price || 0) * (item.quantity || 1);
      });
    });

    return Object.entries(productCounts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  };

  const formatRecentOrders = (orders: any[]) => {
    return orders.slice(0, 5).map(order => ({
      id: `#${(order._id || order.id)?.slice(-6) || 'N/A'}`,
      customer: order.user?.email || order.shippingAddress?.name || 'Guest User',
      amount: order.total || 0,
      status: order.status === 'completed' ? 'Delivered' as const :
              order.status === 'pending' ? 'Pending' as const :
              order.status === 'paid' || order.status === 'shipped' ? 'Processing' as const :
              'Cancelled' as const,
      date: new Date(order.createdAt).toISOString().split('T')[0],
      items: order.items?.length || 0
    }));
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const ordersRes = await adminOrdersAPI.getOrders();
      const orders = ordersRes.data || [];

      setStats(calculateStatsFromOrders(orders));
      setRevenueData(generateRevenueData());
      setTopProducts(generateTopProducts(orders));
      setRecentOrders(formatRecentOrders(orders));
      setAnalytics({
        conversionRate: 3.2,
        avgOrderValue: orders.length > 0 ? orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0) / orders.length : 0,
        customerRetention: 68.5,
        categoryBreakdown: [
          { name: 'Electronics', value: 45, color: '#3B82F6' },
          { name: 'Fashion', value: 30, color: '#10B981' },
          { name: 'Home & Garden', value: 15, color: '#F59E0B' },
          { name: 'Sports', value: 10, color: '#EF4444' }
        ]
      });
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    revenueData,
    topProducts,
    recentOrders,
    analytics,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};