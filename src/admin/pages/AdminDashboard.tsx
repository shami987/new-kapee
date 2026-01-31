import { AdminLayout, StatCard, RevenueChart, TopProducts, RecentOrders, AnalyticsOverview, QuickActions } from '../components';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  
  // Mock data for charts - replace with real API data
  const revenueData = [
    { month: 'Jan', revenue: 35000, orders: 120 },
    { month: 'Feb', revenue: 42000, orders: 145 },
    { month: 'Mar', revenue: 38000, orders: 132 },
    { month: 'Apr', revenue: 45231, orders: 156 },
    { month: 'May', revenue: 52000, orders: 178 },
    { month: 'Jun', revenue: 48000, orders: 165 }
  ];

  const topProducts = [
    { name: 'Wireless Earbuds', sales: 234, revenue: 4560 },
    { name: 'Phone Case Pro', sales: 189, revenue: 2835 },
    { name: 'USB-C Hub', sales: 156, revenue: 1872 },
    { name: 'Smart Watch', sales: 143, revenue: 2145 },
    { name: 'Bluetooth Speaker', sales: 128, revenue: 1920 }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: 250.00, status: 'Delivered' as const, date: '2024-01-15', items: 3 },
    { id: '#12344', customer: 'Jane Smith', amount: 180.50, status: 'Pending' as const, date: '2024-01-14', items: 2 },
    { id: '#12343', customer: 'Bob Johnson', amount: 420.00, status: 'Processing' as const, date: '2024-01-13', items: 5 },
    { id: '#12342', customer: 'Alice Brown', amount: 95.75, status: 'Delivered' as const, date: '2024-01-12', items: 1 },
    { id: '#12341', customer: 'Charlie Wilson', amount: 315.25, status: 'Cancelled' as const, date: '2024-01-11', items: 4 }
  ];

  const analyticsData = {
    conversionRate: 3.2,
    avgOrderValue: 187.50,
    customerRetention: 68.5,
    categoryBreakdown: [
      { name: 'Electronics', value: 45, color: '#3B82F6' },
      { name: 'Fashion', value: 30, color: '#10B981' },
      { name: 'Home & Garden', value: 15, color: '#F59E0B' },
      { name: 'Sports', value: 10, color: '#EF4444' }
    ]
  };

  const defaultStats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: <DollarSign className="text-green-600" />, color: 'green' as const },
    { title: 'Total Orders', value: '1,234', change: '+12.5%', icon: <ShoppingCart className="text-blue-600" />, color: 'blue' as const },
    { title: 'Total Customers', value: '5,678', change: '+8.2%', icon: <Users className="text-orange-600" />, color: 'orange' as const },
    { title: 'Growth Rate', value: '23.5%', change: '+4.3%', icon: <TrendingUp className="text-red-600" />, color: 'red' as const },
  ];

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId);
    // Navigate to order details page
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {defaultStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Analytics Overview */}
      <div className="mb-8">
        <AnalyticsOverview data={analyticsData} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={revenueData} />
        <TopProducts products={topProducts} />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={recentOrders} onViewOrder={handleViewOrder} />
    </AdminLayout>
  );
};

export default AdminDashboard;
