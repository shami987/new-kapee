import { apiClient } from './api';

export interface PaymentIntentResponse {
  clientSecret: string;
}

export const paymentService = {
  // Create payment intent
  createPaymentIntent: async (amount: number): Promise<PaymentIntentResponse> => {
    const response = await apiClient.post('/payments/create-payment-intent', {
      amount
    });
    return response.data;
  },

  // Confirm payment
  confirmPayment: async (orderId: string, paymentIntentId: string, email: string) => {
    const response = await apiClient.post('/orders/confirm-payment', {
      orderId,
      paymentIntentId,
      email
    });
    return response.data;
  }
};
