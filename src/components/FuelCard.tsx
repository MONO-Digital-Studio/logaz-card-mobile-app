
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, QrCode } from 'lucide-react';

interface FuelCardProps {
  cardNumber: string;
  balance: number;
  company: string;
  onShowQR: () => void;
}

const FuelCard: React.FC<FuelCardProps> = ({ cardNumber, balance, company, onShowQR }) => {
  const [expanded, setExpanded] = useState(false);

  const formattedCardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();

  return (
    <div 
      className={`relative bg-gradient-to-r from-logaz-blue to-logaz-blue/80 rounded-xl p-4 text-white shadow-lg transition-all duration-300 ${
        expanded ? 'h-48' : 'h-32'
      }`}
    >
      {/* Card Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 -right-6 w-1/2 bg-white opacity-10 transform rotate-12 rounded-full"></div>
        <div className="absolute top-10 -left-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-light opacity-90">Топливная карта</h3>
            <p className="text-xl font-medium mt-1">{formattedCardNumber}</p>
          </div>
          <button 
            onClick={onShowQR}
            className="bg-white/20 hover:bg-white/30 rounded-lg p-2"
          >
            <QrCode size={24} />
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-light opacity-90">Баланс</p>
          <p className="text-xl font-medium">{balance.toLocaleString()} ₽</p>
        </div>

        {expanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-sm font-light opacity-90">Компания</p>
            <p className="text-md">{company}</p>
          </div>
        )}

        {/* Expand button */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="absolute bottom-2 right-2 p-1 bg-white/20 hover:bg-white/30 rounded-full"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default FuelCard;
