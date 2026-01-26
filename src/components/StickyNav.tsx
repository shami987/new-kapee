import { useState, useEffect } from 'react';
import { User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import { LoginModal } from './LoginModal';

interface StickyNavProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const StickyNav = ({ cartItemsCount, onCartClick }: StickyNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white">
                kapee.
              </a>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-1 hover:text-blue-200 font-medium">
                <span>HOME</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-blue-200 font-medium">
                <span>SHOP</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-blue-200 font-medium">
                <span>PAGES</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-blue-200 font-medium">
                <span>BLOG</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-blue-200 font-medium">
                <span>ELEMENTS</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600">
                BUY NOW
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 hover:text-blue-200"
              >
                <User className="h-5 w-5" />
                <div className="text-left hidden lg:block">
                  <div className="text-xs">HELLO,</div>
                  <div className="text-sm font-semibold">SIGN IN</div>
                </div>
              </button>
              
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5" />
                <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </div>
              
              <button onClick={onCartClick} className="flex items-center space-x-2">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <div className="text-right hidden lg:block">
                  <div className="text-xs">{cartItemsCount} Cart</div>
                  <div className="text-sm font-semibold">$0.00</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};