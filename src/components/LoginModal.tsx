import { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, LogIn } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

// Props interface for LoginModal component
interface LoginModalProps {
  isOpen: boolean;              // Controls whether modal is visible
  onClose: () => void;          // Called when user closes the modal
  onSwitchToSignup?: () => void; // Called when user clicks "Sign Up" button
}

export const LoginModal = ({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) => {
  // Ref to focus email input from icon click
  const emailInputRef = useRef<HTMLInputElement>(null);
  
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

    // CLIENT-SIDE VALIDATION: Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    // CLIENT-SIDE VALIDATION: Check password is not too short
    if (password.length < 3) {
      setLocalError('Password must be at least 3 characters');
      return;
    }

    // Validation passed - send login request to backend
    // Backend will check if user exists and validate password
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
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Only close if clicking on the backdrop, not the modal itself
        if (e.target === e.currentTarget) {
          // Don't close on backdrop click - only close button works
        }
      }}
    >
     
      <div className={`bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col md:flex-row transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-x-0' : (isOpen ? '-translate-x-full' : 'translate-x-full')
      }`}>
        {/* Left Side - Blue Section - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex bg-blue-600 text-white p-6 md:p-8 md:flex-1 flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Login</h2>
          <p className="text-base md:text-lg opacity-90">
            Get access to your Orders,<br />
            Wishlist and Recommendations.
          </p>
        </div>

        {/* Right Side - Form Section - Full width on mobile */}
        <div className="flex-1 p-4 md:p-8 relative overflow-y-auto max-h-[95vh] md:max-h-none">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          <div className="mt-4 md:mt-8">
            {/* Mobile login icon - shown only on mobile */}
            <div className="md:hidden flex justify-center mb-4">
              <button
                type="button"
                onClick={() => emailInputRef.current?.focus()}
                className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors active:scale-95"
              >
                <LogIn className="h-6 w-6 text-blue-600" />
              </button>
            </div>
            
            {/* Mobile heading - shown only on mobile */}
            <h2 className="md:hidden text-2xl font-bold mb-4 text-gray-800 text-center">Login</h2>
            
            {/* Error Messages - Display with clear feedback */}
            {(localError || error) && (
              <div className="mb-4 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
                <p className="font-semibold mb-1">Login Failed</p>
                <p className="text-xs md:text-sm">
                  {localError && localError}
                  {!localError && error?.response?.data?.message === 'Invalid credentials' && 
                    'User not found or incorrect password. Please check your email and password.'}
                  {!localError && error?.response?.data?.message && 
                    error.response.data.message !== 'Invalid credentials' &&
                    error.response.data.message}
                  {!localError && !error?.response?.data?.message && 
                    'An error occurred. Please try again.'}
                </p>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4 md:mb-6">
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter Username/Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div className="mb-4 md:mb-6 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 md:pr-12 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 p-1 md:p-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                  {showPassword ? <EyeOff className="h-3 w-3 md:h-4 md:w-4" /> : <Eye className="h-3 w-3 md:h-4 md:w-4" />}
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-2 md:gap-0">
                <label className="flex items-center text-sm md:text-base">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isPending}
                    className="mr-2"
                  />
                  <span className="text-blue-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline text-sm md:text-base">
                  Lost your password?
                </a>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-2 md:py-3 rounded font-medium text-sm md:text-base hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'LOGGING IN...' : 'LOG IN'}
              </button>

              <div className="mt-4 md:mt-6 text-center">
                <p className="text-gray-600 mb-2 md:mb-3 text-sm md:text-base">
                  New to our platform?
                </p>
                <button 
                  type="button"
                  onClick={() => {
                    handleClose();
                    onSwitchToSignup?.();
                  }}
                  disabled={isPending}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-2 md:py-3 rounded font-medium text-sm md:text-base hover:bg-blue-50 transition-colors disabled:opacity-50"
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