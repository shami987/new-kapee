import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { paymentService } from '../services/paymentService';
import { Header } from '../components/Header';
import { StickyNav } from '../components/StickyNav';
import { Footer } from '../components/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, checkout } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    address: '',
    apartment: '',
    city: '',
    state: 'California',
    zipCode: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals - shipping cost is fixed
  const shippingCost = 5.00;
  const subtotal = getTotalPrice;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create payment intent when component mounts or total changes
  useEffect(() => {
    const currentTotal = getTotalPrice + shippingCost;
    if (currentTotal > 0) {
      createPaymentIntent();
    }
  }, [getTotalPrice, shippingCost]);

  const createPaymentIntent = async () => {
    try {
      const currentTotal = getTotalPrice + shippingCost;
      const response = await paymentService.createPaymentIntent(currentTotal);
      setClientSecret(response.clientSecret);
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      setErrors({ submit: 'Failed to initialize payment. Please try again.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (!stripe || !elements) {
      setErrors({ submit: 'Payment system not ready. Please refresh.' });
      return;
    }
    
    setErrors({});
    setIsProcessing(true);
    
    try {
      // First create the order
      const shippingAddress = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        line1: formData.address,
        line2: formData.apartment || undefined,
        city: formData.city,
        postalCode: formData.zipCode,
        country: formData.country,
      };

      const createdOrder = await checkout(shippingAddress);
      
      // Process payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment with backend
        await paymentService.confirmPayment(
          createdOrder._id || createdOrder.id,
          paymentIntent.id,
          formData.email
        );

        // Navigate to order complete page
        navigate('/order-complete', { state: { order: createdOrder } });
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrors({ submit: err.message || 'Failed to place order. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => {}}
        onSearch={() => {}}
      />
      
      <StickyNav
        cartItemsCount={getTotalItems}
        onCartClick={() => {}}
      />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-blue-600">
              Shopping Cart
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-medium">Checkout</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">Order Complete</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Boxes */}
        <div className="mb-8 space-y-3">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-start">
            <span className="text-blue-600 mr-3 text-lg">ℹ</span>
            <span className="text-blue-600 text-sm">
              <a href="#" className="hover:underline font-medium">Returning customer? Click here to login</a>
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-start">
            <span className="text-blue-600 mr-3 text-lg">ℹ</span>
            <span className="text-blue-600 text-sm">
              Have a coupon? <a href="#" className="hover:underline font-medium">Click here to enter your code</a>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Details Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>United States (US)</option>
                  <option>Canada (CA)</option>
                  <option>United Kingdom (UK)</option>
                  <option>Australia (AU)</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                  <option>Florida</option>
                  <option>Other</option>
                </select>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Your order</h3>

              {/* Products */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item._id} className="flex justify-between items-start">
                      <div className="flex gap-3 flex-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">× {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">Flat rate: ${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Details <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded p-3 bg-white">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-600 mb-6">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-blue-600 hover:underline">privacy policy</a>.
              </p>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !stripe || !elements}
                className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'PROCESSING PAYMENT...' : 'PLACE ORDER'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
