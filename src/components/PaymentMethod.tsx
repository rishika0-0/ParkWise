import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface PaymentMethodProps {
  onBack: () => void;
  onComplete: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onBack, onComplete }) => {
  return (
    <div className="h-full bg-[#1C1C1E] text-white">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-4">Select payment method</h1>
        <button className="ml-auto">
          <CreditCard className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-[#2C2C2E] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-[#1C1C1E] p-3 rounded-full">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400">Cards</p>
                <p>HRK 60.00</p>
                <p className="text-sm text-gray-400">Account</p>
              </div>
            </div>
            <button className="text-[#FF5733]">+ Top up</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl">Cardit Cards</h2>
          <div className="bg-[#2C2C2E] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                     alt="Mastercard" 
                     className="w-8 h-8" />
                <div>
                  <p>3056****5904</p>
                  <p className="text-sm text-gray-400">Ivan Horvat · 06/26</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                     alt="Visa" 
                     className="w-8 h-8" />
                <div>
                  <p>5213****4854</p>
                  <p className="text-sm text-gray-400">Ivan Horvat · 06/26</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="absolute bottom-8 left-4 right-4 bg-[#6C63FF] text-white py-4 rounded-lg font-bold"
        >
          + Add new card
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;