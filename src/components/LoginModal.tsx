import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

// Props interface for LoginModal component
interface LoginModalProps {
  isOpen: boolean;              // Controls whether modal is visible
  onClose: () => void;          // Called when user closes the modal
  onSwitchToSignup?: () => void; // Called when user clicks "Sign Up" button
}

export const LoginModal = ({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) => {
  // UI state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // Form field states - stores what user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Animation state for smooth modal transitions
  const [isVisible, setIsVisible] = useState(false);
  
  // Local error messages from client-side validation
  const [localError, setLocalError] = useState('');

  // React Query hook for login - provides login function and loading/error states
  const { mutate: login, isPending, error } = useLogin();

  // Effect: Run when isOpen changes to trigger animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  // Close modal and reset all form fields
  const handleClose = () => {
    // Trigger closing animation
    setIsVisible(false);
    
    // Clear all form fields
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setLocalError('');
    
    // Wait for animation before actually closing modal
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // CLIENT-SIDE VALIDATION: Check both email and password are provided
    if (!email || !password) {
      setLocalError('Email and password are required');
      return;
    }

    // Validation passed - send login request to backend
    login(
      { email, password },
      {
        // Success callback: close modal on successful login
        onSuccess: () => {
          // Close modal on successful login
          handleClose();
        },
      }
    );
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-x-0' : (isOpen ? '-translate-x-full' : 'translate-x-full')
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
            {/* Error Messages */}
            {(localError || error) && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {localError || (error?.response?.data?.message || 'An error occurred')}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Enter Username/Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
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
                    disabled={isPending}
                    className="mr-2"
                  />
                  <span className="text-blue-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Lost your password?
                </a>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'LOGGING IN...' : 'LOG IN'}
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-3">
                  New to our platform?
                </p>
                <button 
                  type="button"
                  onClick={() => {
                    handleClose();
                    onSwitchToSignup?.();
                  }}
                  disabled={isPending}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  CREATE AN ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};