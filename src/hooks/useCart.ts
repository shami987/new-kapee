import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { cartAPI } from '../services/cartService';
import type { CartItem, Product, Order, OrderItem } from '../types';
import { ordersAPI } from '../services/api';

export const useCart = () => {
  const { isLoggedIn, user, token } = useAuth();
  const queryClient = useQueryClient();
  
  console.log('🔐 Auth status:', { isLoggedIn, hasUser: !!user, hasToken: !!token });
  
  // Local cart state for non-logged-in users
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch cart from backend for logged-in users
  const { data: backendCartItems = [], isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      console.log('💾 Fetching cart from backend...');
      try {
        const res = await cartAPI.getCart();
        console.log('💾 Backend cart response:', res.data);
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
  
  console.log('🛒 Cart Debug:', { 
    isLoggedIn, 
    backendItems: Array.isArray(backendCartItems) ? backendCartItems : 'not array', 
    localItems: localCartItems,
    finalCartItems: cartItems,
    cartLength: cartItems.length,
    isLoading,
    error: error?.message
  });

  // Update local storage when local cart changes
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('cart', JSON.stringify(localCartItems));
    }
  }, [localCartItems, isLoggedIn]);

  // Mutations for backend cart operations
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => {
      console.log('🚀 Making API call to add to cart:', { productId, quantity });
      return cartAPI.addToCart(productId, quantity);
    },
    onSuccess: (data) => {
      console.log('✅ Cart API success:', data);
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
      console.log('✅ Backend update successful');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ Backend update failed:', error);
    }
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
    onSuccess: () => {
      console.log('✅ Backend removal successful');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ Backend removal failed:', error);
    }
  });

  const addToCart = async (product: Product, quantity: number = 1) => {
    console.log('Adding to cart:', { product: product.name, quantity, isLoggedIn });
    
    if (isLoggedIn) {
      console.log('Using backend cart API');
      try {
        await addToCartMutation.mutateAsync({ productId: product._id, quantity });
        console.log('✅ Successfully added to backend cart');
      } catch (error) {
        console.error('❌ Backend cart failed:', error);
        setLocalCartItems(prev => {
          const existing = prev.find(item => item._id === product._id);
          if (existing) {
            return prev.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { ...product, quantity }];
        });
      }
    } else {
      console.log('Using local cart storage');
      setLocalCartItems(prev => {
        const existing = prev.find(item => item._id === product._id);
        if (existing) {
          return prev.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  };

  const removeFromCart = (productId: string) => {
    console.log('🗑️ Removing from cart:', productId, 'isLoggedIn:', isLoggedIn);
    
    if (isLoggedIn) {
      // Find the cart item and get the actual product ID
      const cartItem = cartItems.find(item => item._id === productId);
      const actualProductId = cartItem?.product?._id || productId;
      console.log('🗑️ Using product ID for backend:', actualProductId);
      removeFromCartMutation.mutate(actualProductId);
    } else {
      // Use local storage for non-logged-in users
      setLocalCartItems(prev => prev.filter(item => item._id !== productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    console.log('🔄 Updating quantity:', productId, 'to', quantity, 'isLoggedIn:', isLoggedIn);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    if (isLoggedIn) {
      // Find the cart item and get the actual product ID
      const cartItem = cartItems.find(item => item._id === productId);
      const actualProductId = cartItem?.product?._id || productId;
      console.log('🔄 Using product ID for backend:', actualProductId);
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
    return cartItems.reduce((total: number, item: CartItem) => {
      const product = item.product || item; // Handle nested product structure
      const price = Number(product.price || 0);
      const quantity = Number(item.quantity || 1);
      console.log('Price calculation:', { item: product.name, price, quantity, subtotal: price * quantity });
      return total + (price * quantity);
    }, 0);
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
    const items: OrderItem[] = cartItems.map((item: CartItem) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

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
    const response = await ordersAPI.createOrder(orderPayload);
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