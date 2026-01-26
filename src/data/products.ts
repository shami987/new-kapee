import type { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Men's Casual Blazer",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt.jpg",
    category: "Men's Fashion",
    rating: 4.5,
    reviews: 128,
    isSale: true
  },
  {
    id: 2,
    name: "White Leather Sneakers",
    price: 79.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Navy-BlueSilver-White-Multifunction-Analog-Watch.jpg",
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
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Blouson-Top.jpg",
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
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Unisex-Blue-Graphic-Backpack.jpg",
    category: "Men's Fashion",
    rating: 4.2,
    reviews: 67,
    isSale: true
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 159.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Blue-Colourblocked-Mid-Top-Sneakers.jpg",
    category: "Accessories",
    rating: 4.6,
    reviews: 143
  },
  {
    id: 6,
    name: "Women's Running Shoes",
    price: 99.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Blue-Skinny-Fit-Stretchable-Jeans.jpg",
    category: "Shoes",
    rating: 4.1,
    reviews: 92
  },
  {
    id: 7,
    name: "Denim Jacket",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Stretchable-Jeans-2-430x502.jpg",
    category: "Men's Fashion",
    rating: 4.4,
    reviews: 156,
    isSale: true
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 39.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-430x502.jpg",
    category: "Accessories",
    rating: 4.7,
    reviews: 203,
    isNew: true
  },
  {
    id: 9,
    name: "Floral Summer Dress",
    price: 49.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Stretchable-Jeans-2-430x502.jpg",
    category: "Women's Fashion",
    rating: 4.5,
    reviews: 45,
    isNew: true
  },
  {
    id: 10,
    name: "Cotton Casual Top",
    price: 34.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Blouson-Top.jpg",
    category: "Women's Fashion",
    rating: 4.2,
    reviews: 30
  },
  {
    id: 11,
    name: "Women's Casual Sandals",
    price: 59.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Black-Solid-Maxi-Skirt-150x150.jpg",
    category: "Women's Fashion",
    rating: 4.1,
    reviews: 18
  },
  {
    id: 12,
    name: "Denim Mini Skirt",
    price: 44.99,
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Khaki-Solid-Top-150x150.jpg",
    category: "Women's Fashion",
    rating: 4.0,
    reviews: 22
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Men's Fashion",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Men-150x150.jpg",
    productCount: 156
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/women-150x150.jpg",
    productCount: 189
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Shoes-150x150.jpg",
    productCount: 234
  },
  {
    id: 4,
    name: "Bags & Backpacks",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Bags-150x150.png",
    productCount: 112
  },
  {
    id: 5,
    name: "Watches",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Watch-150x150.jpg",
    productCount: 85
  },
  {
    id: 6,
    name: "Jewellery",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Jewellery-150x150.jpg",
    productCount: 143
  },
  {
    id: 7,
    name: "Accessories",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Accessories-150x150.jpg",
    productCount: 67
  },
  {
    id: 8,
    name: "Dresses",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Khaki-Solid-Top-150x150.jpg",
    productCount: 98
  },
  {
    id: 9,
    name: "Tops",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-150x150.jpg",
    productCount: 121
  },
  {
    id: 10,
    name: "Lingerie & Nightwear",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Black-Solid-Maxi-Skirt-150x150.jpg",
    productCount: 76
  }
];
