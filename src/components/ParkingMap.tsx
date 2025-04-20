import React from 'react';
import { MapPin } from 'lucide-react';

interface ParkingMapProps {
  selectedZone: string;
  onZoneSelect: (zone: string) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ selectedZone, onZoneSelect }) => {
  return (
    <div className="h-full relative bg-[#1C1C1E] text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Book your car</h1>
        <h2 className="text-4xl font-bold mb-6">Parking</h2>
      </div>

      <div className="relative h-[60vh] bg-[#2C2C2E]">
        {/* Map background with grid lines */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Pins */}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            onClick={() => onZoneSelect(selectedZone)}
          >
            <MapPin className="w-4 h-4 text-[#1C1C1E]" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <div className="bg-[#2C2C2E] rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-400">Zone</p>
              <p className="text-xl font-bold">{selectedZone}</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-[#1C1C1E]" />
            </div>
          </div>

          <div>
            <p className="text-gray-400">Time Slot</p>
            <div className="flex justify-between items-center">
              <p className="text-lg">10:02 PM - 12:20AM</p>
              <p className="text-xl font-bold">$20</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onZoneSelect(selectedZone)}
        className="absolute bottom-8 left-4 right-4 bg-[#6C63FF] text-white py-4 rounded-lg font-bold"
      >
        Start Booking
      </button>
    </div>
  );
};

export default ParkingMap;