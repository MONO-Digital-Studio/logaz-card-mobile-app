
import React from 'react';
import { MapPin } from 'lucide-react';
import StationMarker from './StationMarker';

interface MapPlaceholderProps {
  onStationClick: (id: string) => void;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ onStationClick }) => {
  // Simulate some stations
  const stations = [
    { id: '1', type: 'АГЗС' as const, left: '20%', top: '30%' },
    { id: '2', type: 'АГНКС' as const, left: '50%', top: '40%' },
    { id: '3', type: 'МАЗС' as const, left: '70%', top: '60%' },
    { id: '4', type: 'АГЗС' as const, left: '30%', top: '70%' },
    { id: '5', type: 'АГНКС' as const, left: '60%', top: '20%' },
  ];

  return (
    <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gray-200 opacity-50">
        <div className="absolute w-full h-full">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbb' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      {/* Road-like elements */}
      <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400"></div>
      <div className="absolute right-1/4 top-0 bottom-0 w-1 bg-gray-400"></div>
      <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400"></div>
      <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gray-400"></div>

      {/* User location */}
      <div className="absolute left-1/2 bottom-1/4 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full">
            <div className="absolute w-12 h-12 bg-blue-500 opacity-20 rounded-full -top-4 -left-4 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Station markers */}
      {stations.map((station) => (
        <div 
          key={station.id}
          className="absolute"
          style={{ left: station.left, top: station.top }}
        >
          <StationMarker 
            type={station.type}
            onClick={() => onStationClick(station.id)}
          />
        </div>
      ))}

      {/* User Location Button */}
      <button 
        className="absolute right-4 bottom-20 bg-white rounded-full p-3 shadow-md"
      >
        <MapPin size={20} className="text-logaz-blue" />
      </button>
    </div>
  );
};

export default MapPlaceholder;
