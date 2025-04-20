import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: number;
  zone: string;
  duration: number;
  onSuccess: () => void;
  onBack?: () => void;
}

const CheckoutForm = ({ amount, zone, duration, onSuccess, onBack }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (stripeError) throw new Error(stripeError.message || 'Payment failed');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = { error: null }; // Fake a successful response

    if (result.error) {
    throw new Error(result.error);
    }

    onSuccess();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center mb-4 text-gray-400"
        >
          <ArrowLeft className="mr-1" size={18} />
          Back
        </button>
      )}

      <div className="bg-[#2C2C2E] rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <div className="space-y-2">
          <p>Zone: {zone}</p>
          <p>Duration: {duration} minutes</p>
          <p className="font-bold text-lg">Total: ${amount.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#2C2C2E] p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#FFFFFF',
                  '::placeholder': { color: '#A0A0A0' },
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-lg font-medium ${
            !stripe || loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Processing your payment...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mt-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PaymentGatewayProps {
  amount: number;
  zone: string;
  duration: number;
  onSuccess: () => void;
  onBack?: () => void;
}

export const PaymentGateway = ({ 
  amount, 
  zone, 
  duration, 
  onSuccess, 
  onBack 
}: PaymentGatewayProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        amount={amount}
        zone={zone}
        duration={duration}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  );
};