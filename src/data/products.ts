import type { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    isSale: true
  },
  {
    id: 2,
    name: "Smart Watch Series 7",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics",
    rating: 4.8,
    reviews: 256,
    isNew: true
  },
  {
    id: 3,
    name: "Premium Coffee Beans",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
    category: "Food & Beverage",
    rating: 4.3,
    reviews: 89
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Fashion",
    rating: 4.2,
    reviews: 67,
    isSale: true
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Fashion",
    rating: 4.6,
    reviews: 143
  },
  {
    id: 6,
    name: "Smartphone Case",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
    category: "Electronics",
    rating: 4.1,
    reviews: 92
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    productCount: 156
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    productCount: 89
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    productCount: 234
  },
  {
    id: 4,
    name: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    productCount: 67
  }
];