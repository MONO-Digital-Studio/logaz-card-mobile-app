import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Fuel, Route } from "lucide-react";
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
  onRouteClick?: (stationId: string) => void;
}

const StationCard = ({ station, onRouteClick }: StationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  const handleRouteClick = () => {
    onRouteClick?.(station.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{station.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{station.rating}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {station.address}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {station.hours}
          </div>
          {station.distance && (
            <div>{station.distance}</div>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Fuel className="w-4 h-4" />
          <div className="flex flex-wrap gap-1">
            {station.fuelTypes.map((fuel, index) => (
              <span key={index} className="bg-gray-100 px-2 py-0.5 rounded">
                {fuel}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          className="flex-1 bg-logaz-orange text-white hover:bg-logaz-orange/90" 
          onClick={handleDetailsClick}
        >
          Подробнее
        </Button>
        <Button 
          variant="outline"
          className="flex-1 bg-logaz-blue text-white hover:bg-logaz-blue/90 hover:text-white" 
          onClick={handleRouteClick}
        >
          <Route className="w-4 h-4" />
          Маршрут
        </Button>
      </div>

      <StationDetailsModal 
        station={station} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default StationCard;
