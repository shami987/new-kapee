import { AdminLayout } from '../components';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const OrdersPage = () => {
  const [orders] = useState([
    { id: '#ORD001', customer: 'John Doe', product: 'Wireless Earbuds', amount: '$120.00', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Jane Smith', product: 'Phone Case', amount: '$25.00', status: 'Pending', date: '2024-01-14' },
    { id: '#ORD003', customer: 'Bob Johnson', product: 'USB Hub', amount: '$45.00', status: 'Processing', date: '2024-01-13' },
    { id: '#ORD004', customer: 'Alice Brown', product: 'Screen Protector', amount: '$15.00', status: 'Delivered', date: '2024-01-12' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="ml-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            New Order
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Product</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-gray-900">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-600">{order.product}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 1 to 4 of 100 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
