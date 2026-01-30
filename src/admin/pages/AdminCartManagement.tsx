import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserCart {
  userId: string;
  userName: string;
  userEmail: string;
  items: CartItem[];
  total: number;
}

export const AdminCartManagement = () => {
  const [userCarts, setUserCarts] = useState<UserCart[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCarts: UserCart[] = [
      {
        userId: '1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        items: [
          { _id: '1', name: 'Watch', price: 14.00, quantity: 1, image: '/images/watch.jpg' }
        ],
        total: 14.00
      }
    ];
    setUserCarts(mockCarts);
  }, []);

  const handleUpdateQuantity = async (userId: string, productId: string, quantity: number) => {
    // API call to update cart item
    console.log('Update cart:', { userId, productId, quantity });
  };

  const handleRemoveItem = async (userId: string, productId: string) => {
    // API call to remove cart item
    console.log('Remove item:', { userId, productId });
  };

  const handleClearCart = async (userId: string) => {
    // API call to clear user cart
    console.log('Clear cart:', { userId });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cart Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">User Carts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userCarts.map((cart) => (
                <tr key={cart.userId}>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{cart.userName}</div>
                      <div className="text-sm text-gray-500">{cart.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      {cart.items.map((item) => (
                        <div key={item._id} className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">${item.price} x {item.quantity}</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleUpdateQuantity(cart.userId, item._id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-xs bg-gray-100 rounded">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(cart.userId, item._id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemoveItem(cart.userId, item._id)}
                              className="p-1 text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium">${cart.total.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleClearCart(cart.userId)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};