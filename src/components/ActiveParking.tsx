import React, { useState, useEffect } from 'react';
import { Car, MapPin } from 'lucide-react';

interface ActiveParkingProps {
  zone: string;
  vehicleModel: string;
  parkingDuration: number;
  onEnd: () => void;
  onTrack: () => void;
}

const ActiveParking: React.FC<ActiveParkingProps> = ({ 
  zone, 
  vehicleModel, 
  parkingDuration,
  onEnd, 
  onTrack 
}) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: parkingDuration, seconds: 0 });
  const [status, setStatus] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(current => {
        if (current.minutes === 0 && current.seconds === 0) {
          setStatus('completed');
          return current;
        }
        
        if (current.seconds === 0) {
          return { minutes: current.minutes - 1, seconds: 59 };
        }
        return { ...current, seconds: current.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate progress percentage for the circle
  const totalSeconds = parkingDuration * 60;
  const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 283; // 283 is the circumference of the circle

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">{vehicleModel}</h1>
        <p className="text-gray-400 mb-2">Your Vehicle</p>
        <p className="text-xl">Duration: {parkingDuration} minutes</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {status === 'active' ? (
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-[#2C2C2E] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="w-24 h-24" />
            </div>
            <svg className="absolute inset-0 rotate-[-90deg]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#FF5733"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - progress}
                className="transition-all duration-1000"
              />
            </svg>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-[#2C2C2E] p-8 rounded-lg mb-4">
              <Car className="w-24 h-24 mx-auto mb-4" />
              <div className="bg-[#FF5733] text-white px-6 py-2 rounded-lg">
                Done
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          {status === 'active' && (
            <div className="text-4xl font-bold mb-2">
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="text-xl"> min</span>
            </div>
          )}
          <p className="text-gray-400">{new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mt-8 bg-[#2C2C2E] p-4 rounded-lg w-full cursor-pointer" onClick={onTrack}>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Zone</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold">{zone}</span>
              <div className="bg-[#1C1C1E] p-2 rounded-lg">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={onEnd}
          className="w-full bg-[#6C63FF] text-white py-4 rounded-lg font-bold"
        >
          {status === 'active' ? 'End Parking' : 'Stop'}
        </button>
      </div>
    </div>
  );
}

export default ActiveParking;