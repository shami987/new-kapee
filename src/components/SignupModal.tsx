import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useSignup } from '../hooks/useSignup';

// Props interface for SignupModal component
interface SignupModalProps {
  isOpen: boolean;              // Controls whether modal is visible
  onClose: () => void;          // Called when user closes the modal
  onSwitchToLogin?: () => void; // Called when user clicks "Log In" button
}

export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) => {
  // Form field states - stores what user types into each field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Animation state for smooth modal open/close transitions
  const [isVisible, setIsVisible] = useState(false);
  
  // Local error messages from client-side validation
  const [localError, setLocalError] = useState('');

  // React Query hook for signup - provides signup function and loading/error states
  const { mutate: signup, isPending, error } = useSignup();

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
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setLocalError('');
    
    // Wait for animation before actually closing modal
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Handle signup form submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // CLIENT-SIDE VALIDATION: Check all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      setLocalError('All fields are required');
      return;
    }

    // CLIENT-SIDE VALIDATION: Check passwords match
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // CLIENT-SIDE VALIDATION: Check password length
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    // Validation passed - send signup request to backend
    signup(
      { name, email, password },
      {
        // Success callback: close modal and switch to login
        onSuccess: () => {
          handleClose();
          onSwitchToLogin?.();
        },
      }
    );
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-x-0' : (isOpen ? 'translate-x-full' : '-translate-x-full')
      }`}>
        {/* Left Side - Blue Section */}
        <div className="bg-blue-600 text-white p-8 flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Create Account</h2>
          <p className="text-lg opacity-90">
            Join us today and get access to<br />
            exclusive offers and rewards.
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 p-8 relative overflow-y-auto max-h-[90vh]">
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

            {/* Success Message */}
            {isPending && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                Creating your account...
              </div>
            )}

            <form onSubmit={handleSignup}>
              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isPending}
                  className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Terms */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  disabled={isPending}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>

              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Already have an account?
                </p>
                <button 
                  type="button"
                  onClick={() => {
                    handleClose();
                    onSwitchToLogin?.();
                  }}
                  disabled={isPending}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};