import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { cartAPI } from '../services/cartService';
import type { CartItem, Product, Order, OrderItem } from '../types';
import { ordersAPI } from '../services/api';

export const useCart = () => {
  const { isLoggedIn, user, token } = useAuth();
  const queryClient = useQueryClient();
  
  // Local cart state for non-logged-in users
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch cart from backend for logged-in users
  const { data: backendCartItems = [], isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
        const res = await cartAPI.getCart();
        // Backend returns a cart object with items array, extract the items
        const cartData = res.data as any;
        return Array.isArray(cartData) ? cartData : (cartData?.items || []);
      } catch (error) {
        console.error('❌ Failed to fetch cart from backend:', error);
        return [] as CartItem[];
      }
    },
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Use backend cart if logged in, otherwise local cart
  const cartItems: CartItem[] = isLoggedIn ? (Array.isArray(backendCartItems) ? backendCartItems : []) : localCartItems;
  
  // Clear backend cart data when logged out
  useEffect(() => {
    if (!isLoggedIn) {
      queryClient.setQueryData(['cart'], []);
    }
  }, [isLoggedIn, queryClient]);
  
  // Update local storage when local cart changes
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('cart', JSON.stringify(localCartItems));
    }
  }, [localCartItems, isLoggedIn]);

  // Mutations for backend cart operations
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartAPI.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error('❌ Cart API error - falling back to local storage:', error);
      // Remove the problematic fallback code
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => 
      cartAPI.updateCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ Backend update failed:', error);
    }
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ Backend removal failed:', error);
    }
  });

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!isLoggedIn) {
      throw new Error('Please log in to add items to cart');
    }
    await addToCartMutation.mutateAsync({ productId: product._id, quantity });
  };

  const removeFromCart = (productId: string) => {
    if (isLoggedIn) {
      const cartItem = cartItems.find(item => item._id === productId);
      const actualProductId = cartItem?.product?._id || productId;
      removeFromCartMutation.mutate(actualProductId);
    } else {
      // Use local storage for non-logged-in users
      setLocalCartItems(prev => prev.filter(item => item._id !== productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (isLoggedIn) {
      const cartItem = cartItems.find(item => item._id === productId);
      const actualProductId = cartItem?.product?._id || productId;
      updateCartMutation.mutate({ productId: actualProductId, quantity });
    } else {
      // Use local storage for non-logged-in users
      setLocalCartItems(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    const total = cartItems.reduce((total: number, item: CartItem) => {
      const product = item.product || item;
      const price = Number(product.price || 0);
      const quantity = Number(item.quantity || 1);
      return total + (price * quantity);
    }, 0);
    return total;
  }, [cartItems]);

  const getTotalItems = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total: number, item: CartItem) => {
      const quantity = item.quantity || 1;
      return total + quantity;
    }, 0);
  }, [cartItems]);

  const clearCart = () => {
    if (isLoggedIn) {
      cartAPI.clearCart().then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      });
    } else {
      setLocalCartItems([]);
    }
  };

  // Build an Order payload from the current cart
  const buildOrder = (
    shippingAddress?: Order['shippingAddress'],
    paymentMethod?: string,
    userId?: number
  ): Order => {
    const items: OrderItem[] = cartItems.map((item: CartItem) => {
      const product = item.product || item;
      return {
        productId: product._id || item._id,
        name: product.name || item.name,
        price: product.price || item.price,
        quantity: item.quantity,
      };
    });

    const subtotal = Number(getTotalPrice.toFixed(2));
    const shipping = 5.0;
    const tax = 0;
    const total = Number((subtotal + shipping + tax).toFixed(2));

    return {
      id: `order_${Date.now()}`,
      userId,
      items,
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      shippingAddress,
      paymentMethod,
    };
  };

  // Submit checkout: creates an order via API and clears the cart on success
  const checkout = async (
    shippingAddress?: Order['shippingAddress'],
    paymentMethod?: string,
    userId?: number
  ) => {
    const orderPayload = buildOrder(shippingAddress, paymentMethod, userId);
    
    // Create payload matching backend expectations
    const payload = {
      items: orderPayload.items.map(item => ({
        product: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: Number(orderPayload.subtotal),
      total: Number(orderPayload.total),
      totalAmount: Number(orderPayload.total), // Backend might expect this field too
      shippingAddress: orderPayload.shippingAddress,
      paymentMethod: orderPayload.paymentMethod || 'cash'
    };
    
    const order: Order = {
      id: `order_${Date.now()}`,
      items: payload.items.map(item => ({
        productId: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: payload.subtotal,
      shipping: 5.0,
      total: payload.total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod
    };
    
    const response = await ordersAPI.createOrder(order);
    clearCart();
    return response.data as Order;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    buildOrder,
    checkout,
    isLoading,
    error
  };
};