import { AdminLayout } from '../components';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/categoryService';
import { adminCategoriesAPI } from '../../services/api';
import type { Category } from '../../types';

export const CategoriesPage = () => {
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories from backend
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const categories = await getCategories();
      return categories;
    },
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (categoryData: any) => adminCategoriesAPI.createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setShowAddForm(false);
      alert('Category created successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to create category: ${error.response?.data?.message || error.message}`);
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminCategoriesAPI.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setEditingCategory(null);
      alert('Category updated successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to update category: ${error.response?.data?.message || error.message}`);
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => adminCategoriesAPI.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      alert('Category deleted successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to delete category: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleEdit = (category: Category) => {
    if (window.confirm(`Are you sure you want to edit "${category.name}"?`)) {
      setEditingCategory(category);
    }
  };

  const handleDelete = (category: Category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?\n\nThis action cannot be undone.`)) {
      deleteCategoryMutation.mutate(category._id || category.id.toString());
    }
  };

  const handleSave = (categoryData: any) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory._id || editingCategory.id.toString(), data: categoryData });
    } else {
      createCategoryMutation.mutate(categoryData);
    }
  };

  // Filter categories based on search query
  const filteredCategories = categoriesData.filter((category: Category) => {
    const searchLower = searchQuery.toLowerCase();
    return category.name.toLowerCase().includes(searchLower);
  });

  if (isLoading) {
    return (
      <AdminLayout title="Categories">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading categories...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Categories">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
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
            Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Image</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Category Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Product Count</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category: Category) => (
                <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">{category.name}</td>
                  <td className="py-4 px-6 text-gray-600">{category.productCount} products</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category)}
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
          <p className="text-sm text-gray-600">
            Showing 1 to {filteredCategories.length} of {filteredCategories.length} categories
            {searchQuery && ` (filtered from ${categoriesData.length} total)`}
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddForm || editingCategory) && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSave}
          onClose={() => {
            setShowAddForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

// Category Modal Component
const CategoryModal = ({ category, onSave, onClose }: { category: any, onSave: (data: any) => void, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    image: category?.image || '',
    productCount: category?.productCount || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Please fill in the category name');
      return;
    }
    
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {category ? 'Update' : 'Add'} Category
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

export default CategoriesPage;