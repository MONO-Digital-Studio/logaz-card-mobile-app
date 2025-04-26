
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import StationDetailsModal from './StationDetailsModal';

// Export the Station interface for use in other components
export interface Station {
  id: string;
  name: string;
  type: string;
  address: string;
  hours: string;
  rating: number;
  fuelTypes: string[];
  distance?: string;
}

interface StationCardProps {
  station: Station;
  onRouteClick?: (stationId: string) => void; // Make this optional
}

const StationCard = ({ station, onRouteClick }: StationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-2/3">
          <h3 className="font-semibold text-lg">{station.name}</h3>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {station.address}
          </div>
        </div>
        <div className="w-1/3 text-sm text-gray-600 flex items-center gap-1">
          <Clock className="w-4 h-4" /> {station.hours}
        </div>
      </div>
      
      <Button 
        className="w-full bg-logaz-orange text-white hover:bg-logaz-orange/90" 
        onClick={handleDetailsClick}
      >
        Подробнее
      </Button>

      <StationDetailsModal 
        station={station} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default StationCard;
