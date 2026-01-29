import { AdminLayout, StatCard } from '../components';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  // Mock data - replace with real API calls
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: <DollarSign className="text-green-600" />, color: 'green' as const },
    { title: 'Total Orders', value: '1,234', change: '+12.5%', icon: <ShoppingCart className="text-blue-600" />, color: 'blue' as const },
    { title: 'Total Customers', value: '5,678', change: '+8.2%', icon: <Users className="text-orange-600" />, color: 'orange' as const },
    { title: 'Growth Rate', value: '23.5%', change: '+4.3%', icon: <TrendingUp className="text-red-600" />, color: 'red' as const },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Chart will be rendered here (Chart.js/Recharts)
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Wireless Earbuds', sales: 234, revenue: '$4,560' },
              { name: 'Phone Case Pro', sales: 189, revenue: '$2,835' },
              { name: 'USB-C Hub', sales: 156, revenue: '$1,872' },
            ].map((product, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <p className="font-bold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#12345', customer: 'John Doe', amount: '$250.00', status: 'Delivered', date: '2024-01-15' },
                { id: '#12344', customer: 'Jane Smith', amount: '$180.50', status: 'Pending', date: '2024-01-14' },
                { id: '#12343', customer: 'Bob Johnson', amount: '$420.00', status: 'Processing', date: '2024-01-13' },
              ].map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-900 font-bold">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
