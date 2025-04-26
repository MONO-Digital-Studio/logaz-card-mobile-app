import React from 'react';
import { MapPin, Clock, Star, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Station {
  id: string;
  name: string;
  type: string; // Updated to accept any string for flexibility
  address: string;
  hours: string;
  rating: number;
  fuelTypes: string[];
  distance?: string;
}

interface StationCardProps {
  station: Station;
  onRouteClick: (stationId: string) => void;
  onDetailsClick: (stationId: string) => void;
}

const StationCard: React.FC<StationCardProps> = ({
  station,
  onRouteClick,
  onDetailsClick
}) => {
  return <div className="bg-white rounded-lg shadow-md p-4 mb-3 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{station.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{station.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Clock size={14} className="mr-1" />
            <span>{station.hours}</span>
          </div>
          <div className="flex items-center text-sm mt-1">
            <Star size={14} className="mr-1 text-yellow-500" />
            <span>{station.rating.toFixed(1)}</span>
          </div>
        </div>
        {station.distance && <div className="bg-logaz-blue/10 rounded-lg text-sm text-logaz-blue font-medium px-2 py-2 flex items-center justify-center">
            {station.distance}
          </div>}
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {station.fuelTypes.map((fuel, index) => <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs">
            {fuel}
          </span>)}
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" className="flex-1 mr-2" onClick={() => onDetailsClick(station.id)}>
          Подробнее
        </Button>
        <Button className="flex-1 bg-logaz-blue hover:bg-logaz-blue/90" onClick={() => onRouteClick(station.id)}>
          <Route size={18} className="mr-1" /> Маршрут
        </Button>
      </div>
    </div>;
};

export default StationCard;
