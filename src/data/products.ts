import type { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Men's Casual Blazer",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Men's Fashion",
    rating: 4.5,
    reviews: 128,
    isSale: true
  },
  {
    id: 2,
    name: "White Leather Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    category: "Shoes",
    rating: 4.8,
    reviews: 256,
    isNew: true
  },
  {
    id: 3,
    name: "Women's Handbag",
    price: 124.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    category: "Women's Fashion",
    rating: 4.3,
    reviews: 89,
    isSale: true
  },
  {
    id: 4,
    name: "Striped Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men's Fashion",
    rating: 4.2,
    reviews: 67,
    isSale: true
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "Accessories",
    rating: 4.6,
    reviews: 143
  },
  {
    id: 6,
    name: "Women's Running Shoes",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Shoes",
    rating: 4.1,
    reviews: 92
  },
  {
    id: 7,
    name: "Denim Jacket",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    category: "Men's Fashion",
    rating: 4.4,
    reviews: 156,
    isSale: true
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    category: "Accessories",
    rating: 4.7,
    reviews: 203,
    isNew: true
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    productCount: 156
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
    productCount: 189
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    productCount: 234
  },
  {
    id: 4,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    productCount: 67
  }
];