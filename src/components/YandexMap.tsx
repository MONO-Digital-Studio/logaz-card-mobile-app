
import React, { useEffect, useRef } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { toast } from 'sonner';

declare global {
  interface Window {
    ymaps: any;
  }
}

interface Station {
  id: string;
  coords: [number, number];
  type: string;
  fuelTypes: string[];
}

interface RoutePoint {
  coords: [number, number];
  name: string;
}

interface YandexMapProps {
  onStationClick?: (id: string) => void;
  activeTypeFilters?: string[];
  activeFuelFilters?: string[];
  routePoints?: {
    start: RoutePoint;
    end: RoutePoint;
  };
  selectedRouteId?: string | null;
}

const YandexMap = ({ 
  onStationClick, 
  activeTypeFilters = [], 
  activeFuelFilters = [],
  routePoints,
  selectedRouteId
}: YandexMapProps) => {
  const mapRef = useRef<any>(null);
  const { latitude, longitude, error, isTracking } = useGeolocation();
  const scriptLoadedRef = useRef<boolean>(false);
  
  useEffect(() => {
    if (error) {
      toast.error('Ошибка получения геолокации: ' + error);
    }
  }, [error]);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=589e2c90-1f8a-4740-a5c3-8a3423c9897c&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      window.ymaps.ready(initMap);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoadedRef.current && window.ymaps && window.ymaps.ready) {
      updateMap();
    }
  }, [activeTypeFilters, activeFuelFilters, latitude, longitude, isTracking, routePoints, selectedRouteId]);

  const initMap = () => {
    const permRegion = {
      center: [58.01046, 56.229434], // Центр Перми
      bounds: [
        [58.897277, 53.803711], // Северо-западный угол
        [56.138088, 59.231663]  // Юго-восточный угол
      ],
      zoom: 8
    };

    const map = new window.ymaps.Map('map', {
      center: permRegion.center,
      zoom: permRegion.zoom,
      controls: ['zoomControl', 'geolocationControl'],
      restrictMapArea: permRegion.bounds
    });
    
    mapRef.current = map;
    updateMap();
  };

  const updateMap = () => {
    if (!mapRef.current) return;
    
    mapRef.current.geoObjects.removeAll();

    if (isTracking && latitude && longitude) {
      const userLocation = new window.ymaps.Placemark([latitude, longitude], {
        hintContent: 'Ваше местоположение'
      }, {
        preset: 'islands#blueCircleDotIcon'
      });
      mapRef.current.geoObjects.add(userLocation);
    }

    // Добавляем заправки ЛОГАЗ SV на карту, независимо от наличия маршрута
    addStationsToMap();

    if (routePoints) {
      const multiRoute = new window.ymaps.multiRouter.MultiRoute({
        referencePoints: [
          routePoints.start.coords,
          routePoints.end.coords
        ],
        params: {
          routingMode: 'auto',
          results: 3
        }
      }, {
        boundsAutoApply: true,
        wayPointStartIconLayout: "default#image",
        wayPointStartIconImageHref: "/lovable-uploads/6c53022f-37e2-4deb-869f-e8fd3d38f577.png",
        wayPointStartIconImageSize: [32, 32],
        wayPointStartIconImageOffset: [-16, -16],
        wayPointFinishIconLayout: "default#image",
        wayPointFinishIconImageHref: "/lovable-uploads/6c53022f-37e2-4deb-869f-e8fd3d38f577.png",
        wayPointFinishIconImageSize: [32, 32],
        wayPointFinishIconImageOffset: [-16, -16],
        routeActiveStrokeWidth: 8,
        routeActiveStrokeColor: "#FF9E4F",
        routeStrokeWidth: 4,
        routeStrokeColor: "#1E88E5"
      });
      
      if (selectedRouteId) {
        multiRoute.model.events.add('requestsuccess', function() {
          const routes = multiRoute.getRoutes();
          const selectedIndex = parseInt(selectedRouteId) - 1;
          
          if (routes[selectedIndex]) {
            multiRoute.setActiveRoute(routes[selectedIndex]);
          }
        });
      }
      
      mapRef.current.geoObjects.add(multiRoute);
    }
  };

  // Выделение функции добавления заправок в отдельный метод
  const addStationsToMap = () => {
    const stations: Station[] = [
      { 
        id: "1", 
        coords: [57.931068, 56.421594], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "АИ-92", "АИ-95"] 
      },
      { 
        id: "2", 
        coords: [58.010458, 56.229434], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "Метан"] 
      },
      { 
        id: "3", 
        coords: [57.819284, 56.154753], 
        type: "ЛОГАЗ SV МАЗС", 
        fuelTypes: ["Пропан", "АИ-92", "АИ-95", "ДТ"] 
      },
      { 
        id: "4", 
        coords: [58.106291, 56.290592], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "Метан"] 
      },
      { 
        id: "5", 
        coords: [57.988548, 56.203641], 
        type: "ЛОГАЗ SV АГНКС", 
        fuelTypes: ["Метан"] 
      }
    ];

    const logAZStations = stations.filter(station => station.type.includes("ЛОГАЗ SV"));
    
    const filteredStations = logAZStations.filter(station => {
      if (activeTypeFilters.length === 0 && activeFuelFilters.length === 0) {
        return true;
      }

      const passesTypeFilter = activeTypeFilters.length === 0 || 
                              activeTypeFilters.includes(station.type);
      
      const passesFuelFilter = activeFuelFilters.length === 0 || 
                              station.fuelTypes.some(fuel => activeFuelFilters.includes(fuel));
      
      return passesTypeFilter && passesFuelFilter;
    });

    // Основной логотип
    const iconImageHref = "/lovable-uploads/e6bd32ed-570a-4a7c-b047-61bfe55a5b8d.png";
    
    // Создаем шаблон без текстовой подписи, только с иконкой
    const StationIconLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="station-marker" style="position: relative; cursor: pointer;">' +
        '<img src="' + iconImageHref + '" ' +
        'style="width: 32px; height: 32px; position: relative; z-index: 1;" />' +
      '</div>'
    );

    filteredStations.forEach(station => {
      const marker = new window.ymaps.Placemark(station.coords, {
        stationType: station.type,
        hintContent: station.type // Сохраняем подсказку при наведении
      }, {
        iconLayout: StationIconLayout,
        iconOffset: [-16, -16]
      });

      marker.events.add('click', () => {
        onStationClick && onStationClick(station.id);
      });

      mapRef.current.geoObjects.add(marker);
    });
  };

  return (
    <div id="map" className="w-full h-full" />
  );
};

export default YandexMap;
