import { AdminLayout } from '../components';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminProductsAPI } from '../../services/api';
import { getCategories } from '../../services/categoryService';
import type { Category } from '../../types';

export const ProductsPage = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from backend
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await adminProductsAPI.getAllProducts();
      return response.data.products || [];
    },
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (productData: any) => {
      console.log('Sending product data:', productData);
      return adminProductsAPI.createProduct(productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setShowAddForm(false);
    },
    onError: (error: any) => {
      console.error('Create product error:', error.response?.data);
      alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminProductsAPI.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setEditingProduct(null);
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => adminProductsAPI.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const handleEdit = (product: any) => {
    if (window.confirm(`Are you sure you want to edit "${product.name}"?`)) {
      setEditingProduct(product);
    }
  };

  const handleDelete = (product: any) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`)) {
      deleteProductMutation.mutate(product._id);
    }
  };

  const handleSave = (productData: any) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct._id, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const getStatusColor = (inStock: boolean, quantity: number) => {
    if (!inStock || quantity === 0) return 'bg-red-100 text-red-800';
    if (quantity < 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (inStock: boolean, quantity: number) => {
    if (!inStock || quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'Active';
  };

  // Filter products based on search query
  const filteredProducts = productsData?.filter((product: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.name?.toLowerCase().includes(searchLower)
    );
  }) || [];

  if (isLoading) {
    return (
      <AdminLayout title="Products">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading products...</div>
        </div>
      </AdminLayout>
    );
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="ml-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
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
              {filteredProducts.map((product: any) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                  <td className="py-4 px-6 text-gray-600">{product.category?.name || 'No Category'}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">${product.price}</td>
                  <td className="py-4 px-6 text-gray-600">{product.quantity} units</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.inStock, product.quantity)}`}>
                      {getStatusText(product.inStock, product.quantity)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
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
          <p className="text-sm text-gray-600">Showing 1 to {filteredProducts.length} of {filteredProducts.length} products{searchQuery && ` (filtered from ${productsData?.length || 0} total)`}</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddForm || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

// Product Modal Component
const ProductModal = ({ product, onSave, onClose }: { product: any, onSave: (data: any) => void, onClose: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    quantity: product?.quantity || 0,
    inStock: product?.inStock ?? true,
    categoryId: product?.category?._id || '',
    image: product?.image || ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price || !formData.quantity || !formData.categoryId) {
      alert('Please fill in all required fields (Name, Category, Price, Quantity)');
      return;
    }
    
    // Convert string values to numbers for backend
    const submitData = {
      ...formData,
      price: parseFloat(formData.price as string),
      quantity: parseInt(formData.quantity as string)
    };
    
    console.log('Form data being submitted:', submitData);
    onSave(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category._id || category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                className="mr-2"
              />
              In Stock
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsPage;
