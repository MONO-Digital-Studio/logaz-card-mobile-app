
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import MapPlaceholder from '@/components/MapPlaceholder';
import StationCard, { Station } from '@/components/StationCard';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const stationIdFromUrl = searchParams.get('station');
  
  const [selectedStationId, setSelectedStationId] = useState<string | null>(stationIdFromUrl);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Mock stations data
  const stations: Record<string, Station> = {
    "1": {
      id: "1",
      name: "АГЗС №7",
      type: "АГЗС",
      address: "ул. Ленина, 123",
      hours: "24 часа",
      rating: 4.8,
      fuelTypes: ["Пропан", "АИ-92", "АИ-95"],
      distance: "1.2 км"
    },
    "2": {
      id: "2",
      name: "АГНКС Метан",
      type: "АГНКС",
      address: "ул. Гагарина, 45А",
      hours: "06:00 - 22:00",
      rating: 4.5,
      fuelTypes: ["Метан"],
      distance: "3.5 км"
    },
    "3": {
      id: "3",
      name: "МАЗС №12",
      type: "МАЗС",
      address: "Проспект Мира, 78",
      hours: "24 часа",
      rating: 4.2,
      fuelTypes: ["Пропан", "АИ-92", "АИ-95", "ДТ"],
      distance: "5.1 км"
    },
    "4": {
      id: "4",
      name: "АГЗС №3",
      type: "АГЗС",
      address: "ул. Советская, 14",
      hours: "07:00 - 23:00",
      rating: 4.0,
      fuelTypes: ["Пропан"],
      distance: "4.2 км"
    },
    "5": {
      id: "5",
      name: "АГНКС Центр",
      type: "АГНКС",
      address: "ул. Промышленная, 55",
      hours: "06:00 - 22:00",
      rating: 4.6,
      fuelTypes: ["Метан"],
      distance: "7.3 км"
    }
  };

  const handleStationClick = (id: string) => {
    setSelectedStationId(id);
  };

  const handleRouteClick = (id: string) => {
    // Route to the routes page with station id parameter
    window.location.href = `/routes?station=${id}`;
  };

  const handleDetailsClick = (id: string) => {
    // For now, just select the station
    setSelectedStationId(id);
  };

  const selectedStation = selectedStationId ? stations[selectedStationId] : null;

  // Filter options
  const fuelFilters = ["Пропан", "Метан", "АИ-92", "АИ-95", "ДТ"];
  const stationTypeFilters = ["АГЗС", "АГНКС", "МАЗС"];

  return (
    <div className="min-h-screen bg-logaz-background">
      <Header />
      
      <main className="relative h-[calc(100vh-130px)]">
        {/* Map Container */}
        <div className="h-full">
          <MapPlaceholder onStationClick={handleStationClick} />
        </div>
        
        {/* Filter Button */}
        <Button
          className={`absolute top-4 right-4 bg-white text-logaz-text shadow-md ${filtersVisible ? 'bg-logaz-blue text-white' : ''}`}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          {filtersVisible ? <X size={18} /> : <Filter size={18} />}
          {!filtersVisible && <span className="ml-2">Фильтры</span>}
        </Button>
        
        {/* Filters Panel */}
        {filtersVisible && (
          <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-64 animate-fade-in">
            <h3 className="font-medium mb-2">Тип станции</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {stationTypeFilters.map(filter => (
                <button 
                  key={filter}
                  className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:border-logaz-blue hover:bg-logaz-blue/10"
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <h3 className="font-medium mb-2">Тип топлива</h3>
            <div className="flex flex-wrap gap-2">
              {fuelFilters.map(filter => (
                <button 
                  key={filter}
                  className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:border-logaz-orange hover:bg-logaz-orange/10"
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm">Сбросить</Button>
              <Button className="bg-logaz-blue hover:bg-logaz-blue/90" size="sm">Применить</Button>
            </div>
          </div>
        )}
        
        {/* Selected Station Card */}
        {selectedStation && (
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-20">
            <StationCard
              station={selectedStation}
              onRouteClick={handleRouteClick}
              onDetailsClick={handleDetailsClick}
            />
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default MapPage;
