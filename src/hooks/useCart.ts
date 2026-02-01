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
        return res.data as CartItem[];
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
  
  console.log('Cart status:', { 
    isLoggedIn, 
    backendItems: Array.isArray(backendCartItems) ? backendCartItems.length : 0, 
    localItems: localCartItems.length,
    usingBackend: isLoggedIn,
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
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    console.log('Adding to cart:', { product: product.name, quantity, isLoggedIn });
    
    if (isLoggedIn) {
      // Try backend cart API first
      console.log('Using backend cart API');
      addToCartMutation.mutate(
        { productId: product._id, quantity },
        {
          onError: () => {
            // If backend fails, fallback to local storage
            console.log('Backend failed, using local storage fallback');
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
        }
      );
    } else {
      // Add to local cart
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
    if (isLoggedIn) {
      // Remove from backend cart
      removeFromCartMutation.mutate(productId);
    } else {
      // Remove from local cart
      setLocalCartItems(prev => prev.filter(item => item._id !== productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    if (isLoggedIn) {
      // Update backend cart
      updateCartMutation.mutate({ productId, quantity });
    } else {
      // Update local cart
      setLocalCartItems(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = useMemo(
    () => Array.isArray(cartItems) ? cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0) : 0,
    [cartItems]
  );

  const getTotalItems = useMemo(
    () => Array.isArray(cartItems) ? cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0,
    [cartItems]
  );

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