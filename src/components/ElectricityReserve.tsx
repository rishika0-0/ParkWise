import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';

interface ElectricityReserveProps {
  onBack: () => void;
  onContinue: () => void;
}

interface ChargingPort {
  id: string;
  name: string;
  rate: number;
}

const ElectricityReserve: React.FC<ElectricityReserveProps> = ({ onBack, onContinue }) => {
  const [selectedPort, setSelectedPort] = useState<string | null>(null);

  const chargingPorts: ChargingPort[] = [
    { id: 'CHADEMO', name: 'CHADEMO', rate: 12 },
    { id: 'TYPE2', name: 'Type 2-3', rate: 28 }
  ];

  const handlePortSelect = (portId: string) => {
    setSelectedPort(portId);
  };

  return (
    <div className="h-full bg-[#1C1C1E] text-white">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-4">Select charging ports</h1>
        <button className="ml-auto">
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {chargingPorts.map((port) => (
          <div 
            key={port.id}
            className={`bg-[#2C2C2E] rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${
              selectedPort === port.id ? 'ring-2 ring-[#6C63FF]' : ''
            }`}
            onClick={() => handlePortSelect(port.id)}
          >
            <div>
              <h3 className="text-xl font-bold">{port.name}</h3>
              <p className="text-[#FF5733]">₹ {port.rate}/KWt</p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedPort === port.id 
                ? 'bg-[#6C63FF] border-none' 
                : 'border-2 border-[#FF5733]'
            }`}>
              {selectedPort === port.id ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="transform rotate-45">↗</span>
              )}
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-4 right-4 space-y-4">
          {selectedPort && (
            <div className="bg-[#2C2C2E] p-4 rounded-lg mb-4">
              <p className="text-gray-400">Selected Port</p>
              <p className="text-xl font-bold">{chargingPorts.find(p => p.id === selectedPort)?.name}</p>
              <p className="text-[#FF5733]">
                Rate: ₹{chargingPorts.find(p => p.id === selectedPort)?.rate}/KWt
              </p>
            </div>
          )}
          
          <button
            onClick={onContinue}
            className={`w-full py-4 rounded-lg font-bold transition-all duration-200 ${
              selectedPort 
                ? 'bg-[#6C63FF] text-white opacity-100' 
                : 'bg-gray-600 text-gray-400 opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedPort}
          >
            {selectedPort ? 'Continue with Selected Port' : 'Select a Charging Port'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricityReserve;