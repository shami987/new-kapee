# Kapee E-commerce Web Application

A modern, responsive e-commerce web application built with React, TypeScript, and Tailwind CSS, inspired by the Kapee theme.

## Features

- 🛍️ **Product Catalog**: Browse products with detailed information, ratings, and reviews
- 🔍 **Search & Filter**: Advanced search and filtering by category, price, and sorting options
- 🛒 **Shopping Cart**: Add, remove, and manage items in your cart with real-time updates
- 📱 **Responsive Design**: Fully responsive design that works on all devices
- 🎨 **Modern UI**: Clean, modern interface with smooth animations and transitions
- ⭐ **Product Reviews**: Star ratings and review counts for each product
- 🏷️ **Product Labels**: "New" and "Sale" badges for special products
- 💰 **Price Display**: Original and sale prices with clear discount indicators

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Site header with navigation
│   ├── ProductCard.tsx # Product display component
│   ├── CartSidebar.tsx # Shopping cart sidebar
│   ├── HeroBanner.tsx  # Homepage hero section
│   ├── CategoryGrid.tsx # Product categories display
│   ├── ProductFilters.tsx # Product filtering component
│   ├── SearchBar.tsx   # Search functionality
│   └── LoadingSpinner.tsx # Loading indicator
├── hooks/              # Custom React hooks
│   └── useCart.ts      # Cart management logic
├── types/              # TypeScript type definitions
│   └── index.ts        # Product and cart interfaces
├── data/               # Sample data
│   └── products.ts     # Product and category data
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Ecommerce-FullStack-Web-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Product Management
- Display products with images, names, prices, and ratings
- Support for sale prices and promotional badges
- Category-based organization

### Shopping Cart
- Add products to cart with quantity management
- Remove items or update quantities
- Real-time price calculation
- Persistent cart state during session

### Search & Filtering
- Text-based product search
- Filter by category
- Price range filtering
- Sort by name, price, or rating

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface elements

## Customization

### Adding New Products
Edit `src/data/products.ts` to add new products:

```typescript
{
  id: 7,
  name: "New Product",
  price: 49.99,
  image: "product-image-url",
  category: "Category Name",
  rating: 4.5,
  reviews: 100
}
```

### Styling
The application uses Tailwind CSS. Customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Updating component classes for styling changes
- Adding custom CSS in `src/index.css`

## Future Enhancements

- User authentication and accounts
- Product reviews and ratings system
- Wishlist functionality
- Order history and tracking
- Payment integration
- Admin dashboard for product management
- Multi-language support
- Dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.