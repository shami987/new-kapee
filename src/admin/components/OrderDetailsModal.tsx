import { X, Package, User, Calendar, CreditCard, MapPin } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Order Details - {order.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Customer Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-medium">john.doe@example.com</p>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
              <div>
                <span className="text-gray-600">Order Date:</span>
                <p className="font-medium">{order.date}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Shipping Address</h3>
            </div>
            <p className="text-sm text-gray-700">
              123 Main Street<br />
              Apartment 4B<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Order Items</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-gray-900">{order.product}</p>
                    <p className="text-sm text-gray-600">Qty: 1</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{order.amount}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Payment Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <p className="font-medium">Credit Card (**** 1234)</p>
              </div>
              <div>
                <span className="text-gray-600">Transaction ID:</span>
                <p className="font-medium">TXN123456789</p>
              </div>
              <div>
                <span className="text-gray-600">Subtotal:</span>
                <p className="font-medium">{order.amount}</p>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <p className="font-bold text-lg">{order.amount}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Update Status
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Print Invoice
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};