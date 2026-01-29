import { useState, useEffect, useMemo } from 'react';
import type { CartItem, Product, Order } from '../types';
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

  // Build a minimal Order payload from the current cart
  const buildOrder = (customerName: string): Order => {
    return {
      id: `order_${Date.now()}`,
      customerName,
      total: Number(getTotalPrice.toFixed(2)),
      status: 'Pending',
      date: new Date().toISOString(),
    };
  };

  // Submit checkout: creates an order via API and clears the cart on success
  const checkout = async (customerName: string) => {
    const orderPayload = buildOrder(customerName);
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