
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import YandexMap from '@/components/YandexMap';
import StationCard, { Station } from '@/components/StationCard';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const stationIdFromUrl = searchParams.get('station');
  
  const [selectedStationId, setSelectedStationId] = useState<string | null>(stationIdFromUrl);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [activeTypeFilters, setActiveTypeFilters] = useState<string[]>([]);
  const [activeFuelFilters, setActiveFuelFilters] = useState<string[]>([]);
  const [appliedTypeFilters, setAppliedTypeFilters] = useState<string[]>([]);
  const [appliedFuelFilters, setAppliedFuelFilters] = useState<string[]>([]);

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
    window.location.href = `/routes?station=${id}`;
  };

  const handleDetailsClick = (id: string) => {
    setSelectedStationId(id);
  };

  const handleTypeFilterClick = (filter: string) => {
    setActiveTypeFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleFuelFilterClick = (filter: string) => {
    setActiveFuelFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleResetFilters = () => {
    setActiveTypeFilters([]);
    setActiveFuelFilters([]);
  };

  const handleApplyFilters = () => {
    // Apply selected filters
    setAppliedTypeFilters([...activeTypeFilters]);
    setAppliedFuelFilters([...activeFuelFilters]);
    setFiltersVisible(false);
    
    // Clear selected station when applying new filters
    setSelectedStationId(null);
  };

  const selectedStation = selectedStationId ? stations[selectedStationId] : null;

  const fuelFilters = ["Пропан", "Метан", "АИ-92", "АИ-95", "ДТ"];
  const stationTypeFilters = ["АГЗС", "АГНКС", "МАЗС"];

  return (
    <div className="min-h-screen bg-logaz-background">
      <Header />
      
      <main className="relative h-[calc(100vh-130px)]">
        <div className="h-full">
          <YandexMap 
            onStationClick={handleStationClick}
            activeTypeFilters={appliedTypeFilters}
            activeFuelFilters={appliedFuelFilters}
          />
        </div>
        
        <Button
          className={`absolute top-4 right-4 shadow-md transition-colors ${
            filtersVisible 
              ? 'bg-logaz-blue text-white hover:bg-logaz-blue/90' 
              : 'bg-white text-logaz-text hover:bg-logaz-blue hover:text-white'
          }`}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          {filtersVisible ? <X size={18} /> : <Filter size={18} />}
          {!filtersVisible && <span className="ml-2">Фильтры</span>}
        </Button>
        
        {filtersVisible && (
          <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-64 animate-fade-in">
            <h3 className="font-medium mb-2">Тип станции</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {stationTypeFilters.map(filter => (
                <button 
                  key={filter}
                  onClick={() => handleTypeFilterClick(filter)}
                  className={`px-3 py-1 rounded-full border transition-colors ${
                    activeTypeFilters.includes(filter)
                      ? 'border-logaz-blue bg-logaz-blue/10 text-logaz-blue'
                      : 'border-gray-300 hover:border-logaz-blue hover:bg-logaz-blue/10'
                  }`}
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
                  onClick={() => handleFuelFilterClick(filter)}
                  className={`px-3 py-1 rounded-full border transition-colors ${
                    activeFuelFilters.includes(filter)
                      ? 'border-logaz-orange bg-logaz-orange/10 text-logaz-orange'
                      : 'border-gray-300 hover:border-logaz-orange hover:bg-logaz-orange/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetFilters}
                className="hover:bg-gray-100"
              >
                Сбросить
              </Button>
              <Button 
                className="bg-logaz-blue hover:bg-logaz-blue/90" 
                size="sm"
                onClick={handleApplyFilters}
              >
                Применить
              </Button>
            </div>
          </div>
        )}
        
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
