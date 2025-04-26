
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
  coords: [number, number]; // This is a tuple type with exactly 2 numbers
  type: string; // Updated to accept any string for flexibility
  fuelTypes: string[];
}

interface YandexMapProps {
  onStationClick?: (id: string) => void;
  activeTypeFilters?: string[];
  activeFuelFilters?: string[];
}

const YandexMap = ({ 
  onStationClick, 
  activeTypeFilters = [], 
  activeFuelFilters = [] 
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
  }, [activeTypeFilters, activeFuelFilters, latitude, longitude, isTracking]);

  const initMap = () => {
    const map = new window.ymaps.Map('map', {
      center: [latitude || 55.751574, longitude || 37.573856],
      zoom: 11,
      controls: ['zoomControl', 'geolocationControl']
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
      mapRef.current.setCenter([latitude, longitude]);
    }

    const stations: Station[] = [
      { 
        id: "1", 
        coords: [55.751574, 37.573856] as [number, number], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "АИ-92", "АИ-95"] 
      },
      { 
        id: "2", 
        coords: [55.762, 37.584] as [number, number], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "Метан"] 
      },
      { 
        id: "3", 
        coords: [55.743, 37.565] as [number, number], 
        type: "ЛОГАЗ SV МАЗС", 
        fuelTypes: ["Пропан", "АИ-92", "АИ-95", "ДТ"] 
      },
      { 
        id: "4", 
        coords: [55.734, 37.556] as [number, number], 
        type: "ЛОГАЗ SV АГЗС", 
        fuelTypes: ["Пропан", "Метан"] 
      },
      { 
        id: "5", 
        coords: [55.725, 37.547] as [number, number], 
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

    filteredStations.forEach(station => {
      const marker = new window.ymaps.Placemark(station.coords, {
        hintContent: station.type
      }, {
        iconLayout: 'default#image',
        iconImageHref: `/marker-${station.type.toLowerCase()}.png`,
        iconImageSize: [30, 42],
        iconImageOffset: [-15, -42]
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
