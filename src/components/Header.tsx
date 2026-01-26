import { ShoppingCart, User, Menu, ChevronDown, Search, Heart, X, Plus } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { LoginModal } from './LoginModal';
import { useState } from 'react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ cartItemsCount, onCartClick, onSearch }: HeaderProps) => {
  const [currency, setCurrency] = useState('$ Dollar (US)');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      {/* Desktop Top Header Bar */}
      <div className="bg-blue-600 text-white text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button className="flex items-center space-x-1 hover:text-blue-200">
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
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 lg:hidden">
            <button 
              onClick={() => {setIsMobileMenuOpen(true); setActiveTab('menu');}}
              className="p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <a href="/" className="text-2xl font-bold text-white">
              kapee.
            </a>
            
            <div className="flex items-center space-x-4">
              <User className="h-6 w-6" />
              <div className="relative">
                <Heart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </div>
              <button onClick={onCartClick} className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          <div className="pb-4 lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, categories, brands, sku..."
                className="w-full px-4 py-3 text-gray-900 bg-white rounded-full focus:outline-none"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="text-3xl font-bold text-white">
                kapee.
              </a>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search for products, categories, brands, sku..."
                    className="w-full px-4 py-3 text-gray-900 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <select className="px-4 py-3 text-gray-700 bg-gray-100 border-l border-gray-300 focus:outline-none">
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

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors"
              >
                <User className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">HELLO,</div>
                  <div className="text-sm font-semibold">SIGN IN</div>
                </div>
              </button>
              
              <div className="flex items-center space-x-1">
                <Heart className="h-6 w-6" />
                <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </div>
              
              <button onClick={onCartClick} className="flex items-center space-x-2">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm">{cartItemsCount} Cart</div>
                  <div className="font-semibold">$0.00</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Menu */}
      <nav className="bg-white shadow-sm border-b hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <div className="flex items-center space-x-1 bg-gray-100 px-4 py-2 rounded">
              <Menu className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-800">SHOP BY DEPARTMENT</span>
            </div>
            <div className="flex items-center space-x-8 ml-8">
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>HOME</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>SHOP</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>PAGES</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>BLOG</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>ELEMENTS</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600">
                BUY NOW
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => {setIsMobileMenuOpen(false); setActiveTab('menu');}}></div>
          <div className="fixed left-0 top-0 h-full w-80 bg-white">
            {/* Login Section */}
            <div className="bg-blue-600 text-white p-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Login/Signup</span>
                </div>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
            </div>
            
            {/* Menu Tabs */}
            <div className="flex bg-gray-100">
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'menu' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('menu')}
              >
                MENU
              </button>
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('categories')}
              >
                CATEGORIES
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="p-0">
              {activeTab === 'menu' ? (
                <>
                  <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                      <span className="font-medium text-gray-800">HOME</span>
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">SHOP</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                      <span className="font-medium text-gray-800">PAGES</span>
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">BLOG</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">PORTFOLIO</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">ELEMENTS</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">MEN'S CLOTHING</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">WOMEN'S CLOTHING</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">ACCESSORIES</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">SHOES</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                      <span className="font-medium text-gray-800">JEWELLERY</span>
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">BAGS & BACKPACKS</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200">
                    <div className="p-4">
                      <span className="font-medium text-gray-800">WATCHES</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Language and Currency */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
              <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600">English</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600">$ Dollar (US)</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};