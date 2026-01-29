import { AdminLayout } from '../components';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export const ProductsPage = () => {
  const [products] = useState([
    { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: '$99.99', stock: 45, status: 'Active' },
    { id: 2, name: 'Phone Case Pro', category: 'Accessories', price: '$25.99', stock: 120, status: 'Active' },
    { id: 3, name: 'USB-C Hub', category: 'Electronics', price: '$49.99', stock: 8, status: 'Low Stock' },
    { id: 4, name: 'Screen Protector', category: 'Accessories', price: '$14.99', stock: 0, status: 'Out of Stock' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="ml-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Product Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                  <td className="py-4 px-6 text-gray-600">{product.category}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{product.price}</td>
                  <td className="py-4 px-6 text-gray-600">{product.stock} units</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Eye size={18} />
                      </button>
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
          <p className="text-sm text-gray-600">Showing 1 to 4 of 156 products</p>
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

export default ProductsPage;
