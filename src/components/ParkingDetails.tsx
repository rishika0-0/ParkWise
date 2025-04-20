import React from 'react';
import { ArrowLeft, Car, X } from 'lucide-react';

interface ParkingDetailsProps {
  zone: string;
  selectedTime: number;
  onTimeSelect: (time: number) => void;
  onBack: () => void;
  onStart: () => void;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ 
  zone, 
  selectedTime, 
  onTimeSelect, 
  onBack, 
  onStart 
}) => {
  const timeOptions = [15, 30, 45, 60, 90, 120]; // Time options in minutes

  const calculatePrice = (minutes: number) => {
    // Assuming ₹2 per minute
    return minutes * 2;
  };

  return (
    <div className="h-full">
      <div className="p-4 flex justify-between items-center">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Parking Map</h1>
        <button className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#2C2C2E] p-4 rounded-full">
            <Car className="w-6 h-6" />
          </div>
          <span className="text-gray-400">Private vehicle</span>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Ticket details</h2>
          <div className="bg-[#2C2C2E] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-red-500">Time Selection</span>
              <span>Zone {zone}</span>
            </div>
            <p className="text-gray-400">Select parking duration:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedTime === time
                      ? 'bg-[#6C63FF] text-white'
                      : 'bg-[#1C1C1E] text-gray-400'
                  }`}
                >
                  {time} min
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Selected duration</p>
              <span className="bg-[#6C63FF] px-4 py-1 rounded-full text-sm">
                {selectedTime} min
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-4 right-4 space-y-4">
          <div className="flex justify-between items-center px-4">
            <span className="text-gray-400">Total</span>
            <span className="text-2xl font-bold">₹{calculatePrice(selectedTime)}</span>
          </div>
          <button
            onClick={onStart}
            className="w-full bg-[#6C63FF] text-white py-4 rounded-lg font-bold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParkingDetails;