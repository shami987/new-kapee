import { AdminLayout } from '../components';
import { Search, Plus, Edit, Trash2, Mail } from 'lucide-react';
import { useState } from 'react';

export const CustomersPage = () => {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', totalOrders: 5, totalSpent: '$450.00', joinDate: '2023-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', totalOrders: 12, totalSpent: '$1,200.50', joinDate: '2023-03-22' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234-567-8902', totalOrders: 3, totalSpent: '$250.00', joinDate: '2023-09-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234-567-8903', totalOrders: 8, totalSpent: '$780.99', joinDate: '2023-11-05' },
  ]);

  return (
    <AdminLayout title="Customers">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="ml-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Phone</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Orders</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{customer.name}</td>
                  <td className="py-4 px-6 text-gray-600">{customer.email}</td>
                  <td className="py-4 px-6 text-gray-600">{customer.phone}</td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{customer.totalOrders}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{customer.totalSpent}</td>
                  <td className="py-4 px-6 text-gray-600">{customer.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
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
          <p className="text-sm text-gray-600">Showing 1 to 4 of 254 customers</p>
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

export default CustomersPage;
