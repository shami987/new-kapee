import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [email, setEmail] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className={`relative max-w-4xl w-full h-96 rounded-lg overflow-hidden transform transition-all duration-300 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded z-10 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            SIGN UP & GET 40% OFF
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Signup today for free and be the first to hear of special promotions, new arrivals, designer and offers news.
          </p>

          {/* Email Form */}
          <div className="flex w-full max-w-md mb-6">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-gray-900 bg-white rounded-l focus:outline-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-r font-medium hover:bg-blue-700 transition-colors">
              SIGN UP
            </button>
          </div>

          {/* Don't show again checkbox */}
          <label className="flex items-center text-white cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="mr-3 w-4 h-4"
            />
            <span>Don't show this popup again</span>
          </label>
        </div>
      </div>
    </div>
  );
};