export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: any;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  product?: Product; // For backend cart items with nested product
  productId?: string; // Alternative ID field
  id?: string; // Alternative ID field
}

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId?: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  shippingAddress?: {
    name?: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  targetProgress: number; // e.g., 66.6
  revenueBySource: {
    website: number;
    ecommerce: number;
    offline: number;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCart {
  _id: string;
  userId: string;
  user?: User;
  items: Array<{
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
}