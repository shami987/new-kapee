import { useState, useEffect, useMemo } from 'react';
import type { CartItem, Product, Order, OrderItem } from '../types';
import { ordersAPI } from '../services/api';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const getTotalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const clearCart = () => {
    setCartItems([]);
  };

  // Build an Order payload from the current cart
  const buildOrder = (
    shippingAddress?: Order['shippingAddress'],
    paymentMethod?: string,
    userId?: number
  ): Order => {
    const items: OrderItem[] = cartItems.map(item => ({
      productId: item.id,
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
    clearCart
    ,
    buildOrder,
    checkout
  };
};