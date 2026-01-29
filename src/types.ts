export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

export interface OrderItem {
  productId: number;
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