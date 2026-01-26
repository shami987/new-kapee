import { ShoppingCart, User, Menu, ChevronDown, Search, Heart } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ cartItemsCount, onCartClick, onSearch }: HeaderProps) => {
  const [currency, setCurrency] = useState('$ DOLLAR (US)');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-200"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <span>ENGLISH</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-200"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <span>{currency}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-40">
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => {setCurrency('₹ RUPEE (INR)'); setShowCurrencyDropdown(false);}}>
                      ₹ RUPEE (INR)
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => {setCurrency('$ DOLLAR (US)'); setShowCurrencyDropdown(false);}}>
                      $ DOLLAR (US)
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => {setCurrency('£ Pound (UK)'); setShowCurrencyDropdown(false);}}>
                      £ Pound (UK)
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => {setCurrency('€ Euro (EUR)'); setShowCurrencyDropdown(false);}}>
                      € Euro (EUR)
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-xs">
              <span>WELCOME TO OUR STORE!</span>
              <a href="#" className="hover:text-blue-200">📝 BLOG</a>
              <a href="#" className="hover:text-blue-200">❓ FAQ</a>
              <a href="#" className="hover:text-blue-200">✉️ CONTACT US</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-3xl font-bold text-white">
                kapee.
              </a>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 md:mx-8 hidden md:block">
              <div className="relative">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search for products, categories, brands, sku..."
                    className="w-full px-4 py-3 text-gray-900 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <select className="px-4 py-3 text-gray-700 bg-gray-100 border-l border-gray-300 focus:outline-none hidden lg:block">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Garden</option>
                  </select>
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-r-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 md:space-x-6">
              <div className="text-right hidden md:block">
                <div className="text-sm">HELLO,</div>
                <div className="font-semibold">SIGN IN</div>
              </div>
              <User className="h-6 w-6" />
              
              <div className="flex items-center space-x-1 hidden md:flex">
                <Heart className="h-6 w-6" />
                <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </div>
              
              <button
                onClick={onCartClick}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm">{cartItemsCount} Cart</div>
                  <div className="font-semibold">$0.00</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 overflow-x-auto">
            <div className="flex items-center space-x-1 bg-gray-100 px-4 py-2 rounded flex-shrink-0">
              <Menu className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-800 text-sm md:text-base">SHOP BY DEPARTMENT</span>
            </div>
            <div className="flex items-center space-x-4 md:space-x-8 ml-4 md:ml-8">
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
                <span className="text-sm md:text-base">HOME</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
                <span className="text-sm md:text-base">SHOP</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap hidden sm:flex">
                <span className="text-sm md:text-base">PAGES</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap hidden md:flex">
                <span className="text-sm md:text-base">BLOG</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap hidden lg:flex">
                <span className="text-sm md:text-base">ELEMENTS</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="bg-orange-500 text-white px-3 md:px-4 py-2 rounded font-medium hover:bg-orange-600 text-sm md:text-base whitespace-nowrap">
                BUY NOW
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};