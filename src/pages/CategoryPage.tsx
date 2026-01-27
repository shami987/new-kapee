import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { StickyNav } from '../components/StickyNav';
import { ProductCard } from '../components/ProductCard';
import { CartSidebar } from '../components/CartSidebar';
import { useCart } from '../hooks/useCart';
import { products, categories } from '../data/products';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Convert URL parameter to actual category name
  const decodedCategoryName = categoryName
    ? categoryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.category.toLowerCase() === decodedCategoryName.toLowerCase()
    );
  }, [decodedCategoryName]);

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

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{decodedCategoryName}</h1>
            <p className="text-gray-600">
              Home / Shop / {decodedCategoryName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-bold text-blue-600 mb-6">PRODUCT CATEGORIES</h3>
                
                <nav className="space-y-3">
                  {categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block py-2 px-3 rounded transition-colors ${
                        cat.name.toLowerCase() === decodedCategoryName.toLowerCase()
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </a>
                  ))}
                </nav>

                {/* Price Tag */}
                <div className="mt-8 bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <div className="text-sm">$</div>
                    <div className="text-2xl font-bold">39</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      isFeatured={product.isSale || product.isNew}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Left Section - Brand Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">kapee.</h3>
              <p className="text-gray-400 text-sm mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              
              <div className="space-y-3 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span>Lorem Ipsum, 2046 Lorem Ipsum</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span>576-245-2478</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✉️</span>
                  <span>info@kapee.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🕐</span>
                  <span>Mon - Fri / 9:00 AM - 6:00 PM</span>
                </div>
              </div>

              {/* Price Badge */}
              <div className="bg-green-500 text-white rounded-full w-24 h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm">$</div>
                  <div className="text-3xl font-bold">39</div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-bold text-lg mb-4">INFORMATION</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Location</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Latest News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Sitemap</a></li>
              </ul>
            </div>

            {/* Our Service */}
            <div>
              <h4 className="font-bold text-lg mb-4">OUR SERVICE</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Sale</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Saved Cards</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h4 className="font-bold text-lg mb-4">MY ACCOUNT</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
                <li><a href="#" className="hover:text-white transition-colors">My Shop</a></li>
                <li><a href="#" className="hover:text-white transition-colors">My Cart</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Checkout</a></li>
                <li><a href="#" className="hover:text-white transition-colors">My Wishlist</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tracking Order</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4">NEWSLETTER</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to our mailing list to get the new updates!</p>
              
              <div className="flex mb-6">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-3 py-2 text-black text-sm flex-1 rounded-l focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 text-white font-semibold rounded-r hover:bg-blue-700 transition-colors">
                  SIGN UP
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex gap-2 flex-wrap">
                <a href="#" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors"><span className="text-lg">f</span></a>
                <a href="#" className="bg-black p-2 rounded hover:bg-gray-800 transition-colors"><span className="text-lg">𝕏</span></a>
                <a href="#" className="bg-blue-400 p-2 rounded hover:bg-blue-500 transition-colors"><span className="text-lg">in</span></a>
                <a href="#" className="bg-pink-600 p-2 rounded hover:bg-pink-700 transition-colors"><span className="text-lg">📷</span></a>
                <a href="#" className="bg-pink-500 p-2 rounded hover:bg-pink-600 transition-colors"><span className="text-lg">▶</span></a>
                <a href="#" className="bg-orange-500 p-2 rounded hover:bg-orange-600 transition-colors"><span className="text-lg">🔗</span></a>
                <a href="#" className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors"><span className="text-lg">▶</span></a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Payment Methods & Copyright */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">&copy; 2024 Kapee. All Rights Reserved.</p>
              
              {/* Payment Methods */}
              <div className="flex gap-3 items-center">
                <span className="text-gray-400 text-sm mr-2">We Accept:</span>
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 w-auto" />
                <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-6 w-auto" />
                <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" className="h-6 w-auto" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 w-auto" />
                <img src="https://img.icons8.com/color/48/000000/maestro.png" alt="Maestro" className="h-6 w-auto" />
                <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
