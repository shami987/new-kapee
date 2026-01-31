import { format } from 'date-fns';
import { Eye, Download } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Delivered' | 'Pending' | 'Processing' | 'Cancelled';
  date: string;
  items: number;
}

interface RecentOrdersProps {
  orders: Order[];
  onViewOrder?: (orderId: string) => void;
}

export const RecentOrders = ({ orders, onViewOrder }: RecentOrdersProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Order ID</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Items</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-mono text-sm font-medium text-blue-600">{order.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-600">{order.items} items</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-bold text-gray-900">${order.amount.toFixed(2)}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {format(new Date(order.date), 'MMM dd, yyyy')}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onViewOrder?.(order.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Order"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No recent orders found</p>
        </div>
      )}
    </div>
  );
};