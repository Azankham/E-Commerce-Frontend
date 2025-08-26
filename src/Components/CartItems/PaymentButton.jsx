import React, { useState } from 'react';
import axios from 'axios';

const PaymentButton = ({ amount, userToken, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || loading) return;

    setLoading(true);
    try {
      // 1. Create order
      const { data } = await axios.post(
        '/api/create-order',
        { amount },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      // 2. Load Razorpay
      await initializeRazorpay();

      // 3. Open checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: 'INR',
        order_id: data.order.id,
        name: 'Your Store',
        description: `Payment for ₹${amount}`,
        handler: async (response) => {
          await axios.post(
            '/api/verify-payment',
            response,
            { headers: { Authorization: `Bearer ${userToken}` } }
          );
          onSuccess();
        },
        prefill: {
          name: localStorage.getItem('username') || 'Customer',
          email: localStorage.getItem('email') || 'customer@example.com',
        },
        theme: { color: '#2563eb' },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!amount || loading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 btn-success"
    >
      {loading ? 'Processing...' : `Pay $${amount}`}
    </button>
  );
};

export default PaymentButton;