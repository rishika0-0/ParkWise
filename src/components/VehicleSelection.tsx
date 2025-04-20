import React from 'react';
import { Car, Bus, Bike } from 'lucide-react';

interface VehicleSelectionProps {
  userName: string;
  vehicleModel: string;
  onVehicleSelect: () => void;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ userName, vehicleModel, onVehicleSelect }) => {
  const vehicles = [
    { icon: Car, label: vehicleModel, description: 'Electric Vehicle' },
    { icon: Bus, label: 'Van', description: 'Commercial vehicle or minivan' },
    { icon: Bike, label: 'Motorcycle', description: 'Motorcycle or scooter' }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Welcome, {userName}</h1>
      <p className="text-gray-400 mb-8">Select your vehicle type to continue</p>
      
      <div className="flex-1 space-y-4">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.label}
            onClick={onVehicleSelect}
            className="w-full bg-[#2C2C2E] rounded-xl p-4 flex items-center space-x-4 hover:bg-[#3A3A3C] transition-colors"
          >
            <div className="bg-[#34C759] p-3 rounded-lg">
              <vehicle.icon size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{vehicle.label}</h3>
              <p className="text-sm text-gray-400">{vehicle.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        You can change your vehicle type at any time
      </p>
    </div>
  );
};

export default VehicleSelection