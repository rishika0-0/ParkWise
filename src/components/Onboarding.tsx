import React from 'react';
import { Car } from 'lucide-react';

interface OnboardingProps {
  onNext: () => void;
}

function Onboarding({ onNext }: OnboardingProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-blue-500 p-4 rounded-full mb-8">
        <Car size={48} className="text-white" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to ParkSmart</h1>
      <p className="text-gray-400 mb-8">
        Find and reserve parking spots easily, with real-time availability and seamless payments.
      </p>
      <button
        onClick={onNext}
        className="w-full bg-blue-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}

export default Onboarding;