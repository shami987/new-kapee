import { ShoppingCart, User, Menu } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ cartItemsCount, onCartClick, onSearch }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center" aria-label="Main navigation">
              <button
                className="md:hidden"
                aria-label="Open menu"
                type="button"
              >
                <Menu className="h-6 w-6" />
              </button>
              <a href="/" className="ml-2">
                <h1 className="text-2xl font-bold text-gray-900">Kapee</h1>
              </a>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <SearchBar onSearch={onSearch} />
            <button
              type="button"
              aria-label="User account"
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};