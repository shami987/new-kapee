import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

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
            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
              </label>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors mb-4">
              CREATE ACCOUNT
            </button>

            <div className="text-center">
              <p className="text-gray-600 mb-3">
                Already have an account?
              </p>
              <button 
                onClick={() => {
                  handleClose();
                  onSwitchToLogin?.();
                }}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded font-medium hover:bg-blue-50 transition-colors"
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};