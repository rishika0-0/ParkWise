import React, { useState } from 'react';
import { Car, MapPin, ArrowLeft, X, Zap, Bus, Bike, CreditCard } from 'lucide-react';
import ParkingMap from './components/ParkingMap';
import ParkingDetails from './components/ParkingDetails';
import ActiveParking from './components/ActiveParking';
import VehicleSelection from './components/VehicleSelection';
import ElectricityReserve from './components/ElectricityReserve';
import PaymentMethod from './components/PaymentMethod';
import Onboarding from './components/Onboarding';
import TrackingMap from './components/TrackingMap';
import HomeButton from './components/HomeButton';
import { PaymentGateway } from './components/PaymentGateway'; // Fixed import

function App() {
  const [view, setView] = useState<'onboarding' | 'vehicle' | 'map' | 'details' | 'active' | 'electricity' | 'payment' | 'tracking' | 'payment-gateway' | 'payment-success'>('onboarding');
  const [selectedZone, setSelectedZone] = useState('A-013');
  const [userName, setUserName] = useState('Anshika');
  const [vehicleModel, setVehicleModel] = useState('Tata Nexon EV');
  const [selectedTime, setSelectedTime] = useState(30); // Default 30 minutes
  const [paymentAmount, setPaymentAmount] = useState(20); // Default amount, should be calculated based on time and zone

  const goToHome = () => {
    setView('vehicle');
  };

  // Calculate parking cost based on time and zone
  const calculateParkingCost = (minutes: number, zone: string) => {
    // This is a simple calculation - adjust based on your pricing model
    const baseRate = zone.startsWith('A') ? 0.5 : 0.4; // $0.5/min for A zones, $0.4 for others
    return parseFloat((baseRate * minutes).toFixed(2));
  };

  const handleStartBooking = (zone: string, minutes: number) => {
    const amount = calculateParkingCost(minutes, zone);
    setPaymentAmount(amount);
    setSelectedZone(zone);
    setSelectedTime(minutes);
    setView('electricity');
  };

  const handlePaymentSuccess = () => {
    // Here you would typically send the booking confirmation to your backend
    console.log(`Booking confirmed for ${selectedZone} for ${selectedTime} minutes`);
    setView('payment-success');
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white">
      <div className="max-w-md mx-auto h-screen relative">
        {view !== 'onboarding' && view !== 'vehicle' && <HomeButton onClick={goToHome} />}
        
        {view === 'onboarding' && (
          <Onboarding onNext={() => setView('vehicle')} />
        )}
        
        {view === 'vehicle' && (
          <VehicleSelection 
            userName={userName}
            vehicleModel={vehicleModel}
            onVehicleSelect={() => setView('map')}
          />
        )}

        {view === 'map' && (
          <ParkingMap 
            selectedZone={selectedZone}
            onZoneSelect={(zone) => {
              setSelectedZone(zone);
              setView('details');
            }}
          />
        )}

        {view === 'details' && (
          <ParkingDetails 
            zone={selectedZone}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onBack={() => setView('map')}
            onStart={() => handleStartBooking(selectedZone, selectedTime)}
          />
        )}

        {view === 'electricity' && (
          <ElectricityReserve
            onBack={() => setView('details')}
            onContinue={() => setView('payment-gateway')}
          />
        )}

        {view === 'payment-gateway' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <div className="bg-[#2C2C2E] p-4 rounded-lg mb-4">
              <p className="mb-2">Zone: {selectedZone}</p>
              <p className="mb-2">Duration: {selectedTime} minutes</p>
              <p className="text-lg font-semibold">Total: ${paymentAmount}</p>
            </div>
            <PaymentGateway 
              amount={paymentAmount}
              zone={selectedZone}
              duration={selectedTime}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}

        {view === 'payment' && (
          <PaymentMethod
            onBack={() => setView('electricity')}
            onComplete={() => setView('active')}
          />
        )}

        {view === 'payment-success' && (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">🎉 Payment Successful!</h2>
            <p>Your parking is now reserved.</p>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setView('active')}
            >
              Go to Active Parking
            </button>
          </div>
        )}

        {view === 'active' && (
          <ActiveParking
            zone={selectedZone}
            vehicleModel={vehicleModel}
            parkingDuration={selectedTime}
            onEnd={() => setView('vehicle')}
            onTrack={() => setView('tracking')}
          />
        )}

        {view === 'tracking' && (
          <TrackingMap
            zone={selectedZone}
            onBack={() => setView('active')}
            onStop={() => setView('vehicle')}
          />
        )}
      </div>
    </div>
  );
}

export default App;