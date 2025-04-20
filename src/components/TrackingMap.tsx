import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface TrackingMapProps {
  zone: string;
  onBack: () => void;
  onStop: () => void;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ zone, onBack, onStop }) => {
  return (
    <div className="h-full bg-[#1C1C1E] text-white">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Tracking Map</h1>
      </div>

      <div className="relative h-[80vh] bg-[#2C2C2E]">
        {/* Map background with grid lines */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Route Path */}
        <svg className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 100 400 L 150 350 L 200 300 L 250 200"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FF4B2B' }} />
              <stop offset="100%" style={{ stopColor: '#7B2FF7' }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Start Point */}
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8">
          <div className="absolute w-8 h-8 bg-red-500 rounded-full opacity-25 animate-ping"></div>
          <div className="absolute w-8 h-8 bg-red-500 rounded-full"></div>
        </div>

        {/* End Point */}
        <div className="absolute top-1/4 right-1/3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
        </div>

        {/* Map Pins */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full flex items-center justify-center"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
          >
            <MapPin className="w-4 h-4 text-[#1C1C1E]" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-[#1C1C1E]" />
            <div>
              <p className="text-[#1C1C1E] font-bold">Zone</p>
              <p className="text-[#1C1C1E]">{zone}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStop}
        className="absolute bottom-8 left-4 right-4 bg-[#6C63FF] text-white py-4 rounded-lg font-bold"
      >
        Track Stop
      </button>
    </div>
  );
};

export default TrackingMap;