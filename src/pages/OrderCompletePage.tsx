import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const OrderCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-blue-600">
              Shopping Cart
            </button>
            <span className="text-gray-400">›</span>
            <button onClick={() => navigate('/checkout')} className="text-gray-600 hover:text-blue-600">
              Checkout
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-medium">Order Complete</span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-600 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email with your order details and tracking information.
          </p>

          {/* Order Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">1.</span>
                <span>We'll process your order and prepare it for shipment within 1-2 business days.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">2.</span>
                <span>You'll receive a shipping confirmation email with tracking details.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">3.</span>
                <span>Your package should arrive within 5-7 business days depending on your location.</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 sm:justify-center">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-900 rounded font-bold hover:bg-gray-300 transition-colors"
            >
              Print Receipt
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <p className="mb-3">
              Have questions? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a>
            </p>
            <p>
              Email: <a href="mailto:support@kapee.com" className="text-blue-600 hover:underline">support@kapee.com</a>
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I modify my order?</h3>
              <p className="text-gray-600">
                Orders can be modified within 2 hours of placement. Please contact our support team immediately if you need to make changes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">What's your return policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for most items. Items must be unused and in original packaging. See our full <a href="#" className="text-blue-600 hover:underline">return policy</a>.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">
                Yes, we ship to most countries worldwide. International orders may take 10-14 business days for delivery and may incur additional customs duties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;
