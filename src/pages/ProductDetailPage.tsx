import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, HelpCircle, Minus, Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { CartSidebar } from '../components/CartSidebar';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartItems, addToCart, getTotalItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={() => {}}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span>Watches</span>
          <span>/</span>
          <span>Leather</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded border-2 overflow-hidden flex-shrink-0 ${selectedImage === idx ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm md:text-base text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl md:text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.isSale && (
                <span className="bg-red-100 text-red-800 px-2 md:px-3 py-1 rounded text-sm font-medium">42% Off</span>
              )}
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start space-x-2 text-green-600 text-sm md:text-base">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Bank Offer 10% instant Discount on VISA Cards, T&C</span>
              </div>
              <div className="flex items-start space-x-2 text-green-600 text-sm md:text-base">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Special Price Get extra 20% off (price inclusive of discount), T&C</span>
              </div>
              <div className="flex items-start space-x-2 text-green-600 text-sm md:text-base">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>No cost EMI ₹8 months, Standard EMI also available, View Plans</span>
              </div>
            </div>

            <div className="border rounded-lg p-4 md:p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gray-800 text-white px-2 md:px-3 py-1 rounded text-sm font-bold">W</div>
                <span className="font-semibold text-base md:text-lg">WATCH</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">Watch Machine</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <span className="font-medium text-gray-900 text-sm md:text-base">Services:</span>
                  <ul className="mt-2 space-y-1 text-gray-600 text-sm md:text-base">
                    <li>• 30 Day Return Policy</li>
                    <li>• Cash on Delivery available</li>
                    <li>• Free Delivery</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-gray-900 text-sm md:text-base">Highlights:</span>
                  <ul className="mt-2 space-y-1 text-gray-600 text-sm md:text-base">
                    <li>• Adjustable bracelet</li>
                    <li>• Mineral crystal face</li>
                    <li>• Quartz movement</li>
                    <li>• Water resistant</li>
                    <li>• Stainless steel leather</li>
                    <li>• Day and date function</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 md:p-3 hover:bg-gray-100">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 md:px-6 py-2 md:py-3 border-x text-base md:text-lg font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 md:p-3 hover:bg-gray-100">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={() => {
                  addToCart(product, quantity);
                  setIsCartOpen(true);
                }}
                className="bg-orange-500 text-white px-6 md:px-8 py-2 md:py-3 rounded font-medium hover:bg-orange-600 text-sm md:text-lg flex-1 sm:flex-none"
              >
                ADD TO CART
              </button>
              <button className="bg-red-500 text-white px-6 md:px-8 py-2 md:py-3 rounded font-medium hover:bg-red-600 text-sm md:text-lg flex-1 sm:flex-none">
                BUY NOW
              </button>
            </div>

            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5" />
                <span>Compare</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span>Delivery & Return</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-gray-600" />
                <span>Ask a Question</span>
              </div>
            </div>

            <div className="text-gray-600">
              <p>Estimated Delivery: 25 January - 02 February</p>
              <p className="mt-1">29 People viewing this product right now!</p>
            </div>

            <div className="border-t pt-6">
              <p className="font-medium mb-3">Guaranteed Safe Checkout</p>
              <div className="flex space-x-2">
                {['AMEX', 'Apple Pay', 'Google Pay', 'Mastercard', 'PayPal', 'Visa'].map((payment) => (
                  <div key={payment} className="bg-gray-100 px-3 py-2 rounded text-sm">{payment}</div>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Category:</span> Leather</p>
              <p><span className="font-medium">Tags:</span> Watches, Women</p>
              <p><span className="font-medium">Brand:</span> Watch</p>
            </div>
          </div>
        </div>

        {/* Description and Reviews Tabs */}
        <div className="mt-16 border-t pt-8">
          <div className="flex space-x-8 border-b">
            <button className="pb-4 border-b-2 border-blue-500 text-blue-600 font-medium">DESCRIPTION</button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">REVIEWS (1)</button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">BRAND</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gray-800 text-white w-12 h-12 rounded flex items-center justify-center text-xl font-bold">W</div>
                <div>
                  <div className="font-bold">WATCH</div>
                  <div className="text-sm text-gray-600">WATCH MACHINE</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacerat ligula in felis cursus, 
                vitae cursus ipsum blandit. Mauris at pellentesque risus. Orci varius natoque penatibus et 
                magnis dis parturient montes, nascetur ridiculus mus. Mauris et tempus lorem, at porta mauris.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">ACCESSORY BANDS</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Switch up your look with classic leather, 
                metal and woven Sport Loop bands. Each sold separately. Pair any band of the same size with your 
                Apple Watch. Stainless steel and leather bands use a butterfly clasp; 
                Sport Bands use a pin-and-tuck closure; and Sport Loops use a hook-and-loop fastener.
              </p>
              
              <h4 className="text-xl font-bold mb-3">LIGHTWEIGHT DESIGN</h4>
              <p className="text-gray-600">
                Designed with a focus on lightweight aluminum case (5% less family).
              </p>
              
              <div className="mt-6">
                <img src={product.image} alt="Product" className="w-48 h-48 object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};