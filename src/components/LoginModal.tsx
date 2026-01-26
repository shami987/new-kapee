import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Left Side - Blue Section */}
        <div className="bg-blue-600 text-white p-8 flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Login</h2>
          <p className="text-lg opacity-90">
            Get access to your Orders,<br />
            Wishlist and Recommendations.
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 p-8 relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          <div className="mt-8">
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter Username/Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-blue-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Lost your password?
              </a>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors">
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};