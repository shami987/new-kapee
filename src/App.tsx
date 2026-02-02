import { useState } from 'react';
import { Header } from './components/Header';
import { StickyNav } from './components/StickyNav';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductShowcase } from './components/ProductShowcase';
import WomenShowcase from './components/WomenShowcase';
import PopularFashion from './components/PopularFashion';
import FashionCategories from './components/FashionCategories';
import { ProductTabs } from './components/ProductTabs';
import { CartSidebar } from './components/CartSidebar';
import { SignupModal } from './components/SignupModal';
import { LoginModal } from './components/LoginModal';
import { useCart } from './hooks/useCart';
import { useAuth } from './contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from './services/productService';
import { categories } from './data/products';

const footerLinks = {
  quickLinks: [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'FAQ', href: '#' }
  ],
  categories: [
    { label: 'Electronics', href: '#' },
    { label: 'Fashion', href: '#' },
    { label: 'Home & Garden', href: '#' }
  ],
  support: [
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Privacy Policy', href: '#' }
  ]
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isLoading
  } = useCart();

  const { isLoggedIn } = useAuth();

  // Fetch products from backend
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={() => {}}
      />
      
      <StickyNav
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <HeroBanner />
        <CategoryGrid  />
        <FeaturedProducts 
          onAddToCart={addToCart}
          onLoginRequired={() => setIsLoginModalOpen(true)}
          onViewAll={() => {
            const productsSection = document.querySelector('[data-products-section]');
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
        
        <ProductShowcase 
          products={products} 
          onAddToCart={addToCart}
          onLoginRequired={() => setIsLoginModalOpen(true)}
        />
        <WomenShowcase 
          products={products} 
          onAddToCart={addToCart}
          onLoginRequired={() => setIsLoginModalOpen(true)}
        />
        
        <PopularFashion 
          products={products} 
          onAddToCart={addToCart}
          onLoginRequired={() => setIsLoginModalOpen(true)}
        />
        
        <FashionCategories categories={categories} />
        
        {/* Product Tabs Section */}
        <ProductTabs />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kapee</h3>
              <p className="text-gray-400">Your trusted online shopping destination</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}><a href={link.href} className="hover:text-white">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {footerLinks.categories.map((link) => (
                  <li key={link.label}><a href={link.href} className="hover:text-white">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                {footerLinks.support.map((link) => (
                  <li key={link.label}><a href={link.href} className="hover:text-white">{link.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kapee. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice}
        isLoading={isLoading}
        isBackend={isLoggedIn}
      />

      {/* Login modal - opens when user tries to add to cart without logging in */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;