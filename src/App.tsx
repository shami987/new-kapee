import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { StickyNav } from './components/StickyNav';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ProductFilters } from './components/ProductFilters';
import { SignupModal } from './components/SignupModal';
import { useCart } from './hooks/useCart';
import { products, categories } from './data/products';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000] as [number, number],
    sortBy: 'name'
  });
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Show signup modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignupModalOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, filters]);

  const uniqueCategories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))), [products]
  );

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      <StickyNav
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <HeroBanner />
        <CategoryGrid categories={categories} />
        
        <section className="py-16" data-products-section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            
            <ProductFilters
              categories={uniqueCategories}
              onFilterChange={setFilters}
            />
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
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
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
}

export default App;