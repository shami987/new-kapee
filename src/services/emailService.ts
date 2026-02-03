import { apiClient } from './api';

export const emailService = {
  // Send order confirmation email
  sendOrderConfirmation: (data: {
    orderId: string;
    email: string;
    customerName: string;
    orderDetails: {
      items: any[];
      total: number;
      subtotal: number;
      shipping: number;
      shippingAddress: any;
    };
  }) => {
    return apiClient.post('/orders/send-confirmation', data);
  },

  // Send order status update email
  sendOrderStatusUpdate: (data: {
    orderId: string;
    email: string;
    customerName: string;
    newStatus: string;
  }) => {
    return apiClient.post('/orders/send-status-update', data);
  },
};