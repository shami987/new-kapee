import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { useForgotPassword } from '../hooks/useForgotPassword';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Failed to send reset email. Please try again.');
        },
      }
    );
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  const handleBackToLogin = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onBackToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isSuccess ? 'Check Your Email' : 'Reset Password'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSuccess 
              ? 'We have sent a password reset link to your email address.'
              : 'Enter your email address and we will send you a link to reset your password.'
            }
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="text-sm">
                Password reset email sent to <strong>{email}</strong>
              </p>
              <p className="text-xs mt-1">
                Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>
            <button
              onClick={handleBackToLogin}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                disabled={isPending}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};