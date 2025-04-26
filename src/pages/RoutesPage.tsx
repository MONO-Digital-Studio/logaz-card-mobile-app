import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, CornerDownLeft, ChevronRight, Clock, Navigation2 } from 'lucide-react';
import { toast } from 'sonner';
import YandexMap from '@/components/YandexMap';

interface RouteOption {
  id: string;
  duration: number; // minutes
  distance: number; // kilometers
  stations: number; // number of ЛОГАЗ stations on the route
}

interface RoutePoint {
  coords: [number, number];
  name: string;
}

const RoutesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const stationIdFromUrl = searchParams.get('station');
  
  const [startPoint, setStartPoint] = useState<string>('Текущее местоположение');
  const [endPoint, setEndPoint] = useState<string>(stationIdFromUrl ? 'АГЗС №7' : '');
  const [routeCalculated, setRouteCalculated] = useState<boolean>(!!stationIdFromUrl);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [routePoints, setRoutePoints] = useState<{start: RoutePoint; end: RoutePoint} | null>(null);
  
  // Mock route options
  const routeOptions: RouteOption[] = [
    {
      id: '1',
      duration: 25,
      distance: 12.4,
      stations: 2,
    },
    {
      id: '2',
      duration: 30,
      distance: 11.8,
      stations: 1,
    },
    {
      id: '3',
      duration: 35,
      distance: 10.5,
      stations: 3,
    },
  ];

  // Initialize route points when route is calculated with mock data for Perm region
  useEffect(() => {
    if (routeCalculated) {
      setRoutePoints({
        start: {
          coords: [58.010458, 56.229434], // Center of Perm
          name: startPoint
        },
        end: {
          coords: [57.931068, 56.421594], // ЛОГАЗ SV station coordinates
          name: endPoint
        }
      });
    }
  }, [routeCalculated, startPoint, endPoint]);
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    if (hours > 0) {
      return `${hours} ч ${min} мин`;
    }
    return `${min} мин`;
  };
  
  const handleCalculateRoute = () => {
    if (!endPoint) {
      toast.error('Пожалуйста, укажите пункт назначения');
      return;
    }
    
    setRouteCalculated(true);
    toast.success('Маршрут построен успешно');
  };
  
  const handleStartRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    toast.success('Навигация запущена');
  };

  return (
    <div className="min-h-screen bg-logaz-background pb-16">
      <Header />
      <main className="p-4">
        <h1 className="text-xl font-medium mb-4">Построение маршрута</h1>
        
        {/* Route Inputs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="mr-3 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-logaz-blue"></div>
              <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-logaz-orange"></div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="start-point" className="text-sm text-gray-600 block mb-1">Откуда</label>
                <div className="relative">
                  <Input
                    id="start-point"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Введите точку отправления"
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              
              <div>
                <label htmlFor="end-point" className="text-sm text-gray-600 block mb-1">Куда</label>
                <div className="relative">
                  <Input
                    id="end-point"
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                    placeholder="Введите пункт назначения"
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-logaz-blue hover:bg-logaz-blue/90" 
            onClick={handleCalculateRoute}
          >
            <CornerDownLeft size={18} className="mr-2" /> Построить маршрут
          </Button>
        </div>
        
        {/* Route Options */}
        {routeCalculated && (
          <>
            <h2 className="font-medium text-lg mb-3">Варианты маршрута</h2>
            <div className="space-y-3">
              {routeOptions.map((route, index) => (
                <div key={route.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-medium">{index === 0 ? 'Оптимальный маршрут' : `Вариант ${index + 1}`}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        {formatDuration(route.duration)}
                        <span className="mx-2">•</span>
                        {route.distance.toFixed(1)} км
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-logaz-blue/10 rounded-full px-3 py-1 text-xs text-logaz-blue">
                      {route.stations} заправки ЛОГАЗ на маршруте
                    </div>
                    <Button 
                      className="bg-logaz-orange hover:bg-logaz-orange/90"
                      onClick={() => handleStartRoute(route.id)}
                    >
                      <Navigation2 size={16} className="mr-2" /> Начать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Replace placeholder with actual YandexMap */}
            <div className="mt-4 h-60 bg-gray-200 rounded-lg overflow-hidden relative">
              {routePoints ? (
                <YandexMap 
                  onStationClick={() => {}}
                  routePoints={routePoints}
                  selectedRouteId={selectedRoute}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Загрузка маршрута...</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RoutesPage;
