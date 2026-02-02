import { AdminLayout, StatCard, RevenueChart, TopProducts, RecentOrders, AnalyticsOverview, QuickActions } from '../components';
import { TrendingUp, Users, ShoppingCart, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { useDashboard } from '../hooks';

export const AdminDashboard = () => {
  const {
    stats,
    revenueData,
    topProducts,
    recentOrders,
    analytics,
    loading,
    error,
    refetch
  } = useDashboard();

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId);
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <div className="ml-3">
            <p className="text-red-800 font-medium">Error loading dashboard</p>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={refetch}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const dashboardStats = stats ? [
    { 
      title: 'Total Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      change: stats.revenueChange, 
      icon: <DollarSign className="text-green-600" />, 
      color: 'green' as const 
    },
    { 
      title: 'Total Orders', 
      value: stats.totalOrders.toLocaleString(), 
      change: stats.ordersChange, 
      icon: <ShoppingCart className="text-blue-600" />, 
      color: 'blue' as const 
    },
    { 
      title: 'Total Customers', 
      value: stats.totalCustomers.toLocaleString(), 
      change: stats.customersChange, 
      icon: <Users className="text-orange-600" />, 
      color: 'orange' as const 
    },
    { 
      title: 'Growth Rate', 
      value: `${stats.growthRate}%`, 
      change: stats.growthChange, 
      icon: <TrendingUp className="text-red-600" />, 
      color: 'red' as const 
    },
  ] : [];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="mb-8">
          <AnalyticsOverview data={analytics} />
        </div>
      )}

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
