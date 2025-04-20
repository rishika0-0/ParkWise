import React from 'react';
import { Home } from 'lucide-react';

interface HomeButtonProps {
  onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 bg-[#2C2C2E] p-2 rounded-full hover:bg-[#3A3A3C] transition-colors"
      title="Go to Home"
    >
      <Home className="w-6 h-6" />
    </button>
  );
};

export default HomeButton; 