import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
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
      name: "ЛОГАЗ SV АГЗС №7",
      type: "ЛОГАЗ SV АГЗС",
      address: "ул. Ленина, 123",
      hours: "24 часа",
      rating: 4.8,
      fuelTypes: ["Пропан", "АИ-92", "АИ-95"],
      distance: "1.2 км"
    },
    "2": {
      id: "2",
      name: "ЛОГАЗ SV АГНКС",
      type: "ЛОГАЗ SV АГНКС",
      address: "ул. Гагарина, 45А",
      hours: "06:00 - 22:00",
      rating: 4.5,
      fuelTypes: ["Метан"],
      distance: "3.5 км"
    },
    "3": {
      id: "3",
      name: "ЛОГАЗ SV МАЗС №12",
      type: "ЛОГАЗ SV МАЗС",
      address: "Проспект Мира, 78",
      hours: "24 часа",
      rating: 4.2,
      fuelTypes: ["Пропан", "АИ-92", "АИ-95", "ДТ"],
      distance: "5.1 км"
    },
    "4": {
      id: "4",
      name: "ЛОГАЗ SV АГЗС №3",
      type: "ЛОГАЗ SV АГЗС",
      address: "ул. Советская, 14",
      hours: "07:00 - 23:00",
      rating: 4.0,
      fuelTypes: ["Пропан"],
      distance: "4.2 км"
    },
    "5": {
      id: "5",
      name: "ЛОГАЗ SV АГНКС Центр",
      type: "ЛОГАЗ SV АГНКС",
      address: "ул. Промышленная, 55",
      hours: "06:00 - 22:00",
      rating: 4.6,
      fuelTypes: ["Метан"],
      distance: "7.3 км"
    }
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
    setAppliedTypeFilters([...activeTypeFilters]);
    setAppliedFuelFilters([...activeFuelFilters]);
    setFiltersVisible(false);
    
    setSelectedStationId(null);
  };

  const selectedStation = selectedStationId ? stations[selectedStationId] : null;

  const fuelFilters = ["Пропан", "Метан", "АИ-92", "АИ-95", "ДТ"];
  const stationTypeFilters = ["ЛОГАЗ SV АГЗС", "ЛОГАЗ SV АГНКС", "ЛОГАЗ SV МАЗС"];

  return (
    <div className="min-h-screen bg-logaz-background">
      <Header />
      <main className="relative h-[calc(100vh-130px)] flex items-center justify-center">
        <p className="text-center text-gray-500">
          Карта перемещена на страницу "Маршруты"
        </p>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MapPage;
