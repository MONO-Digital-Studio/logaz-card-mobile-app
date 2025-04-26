
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
  type: 'АГЗС' | 'АГНКС' | 'МАЗС';
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
    // Avoid loading the script multiple times
    if (scriptLoadedRef.current) return;
    
    // Load Yandex Maps script
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
    
    // Clear existing map objects
    mapRef.current.geoObjects.removeAll();

    // Add user location marker if available
    if (isTracking && latitude && longitude) {
      const userLocation = new window.ymaps.Placemark([latitude, longitude], {
        hintContent: 'Ваше местоположение'
      }, {
        preset: 'islands#blueCircleDotIcon'
      });
      mapRef.current.geoObjects.add(userLocation);
      mapRef.current.setCenter([latitude, longitude]);
    }

    // Добавляем маркеры станций
    const stations: Station[] = [
      { id: "1", coords: [55.751574, 37.573856], type: "АГЗС", fuelTypes: ["Пропан", "АИ-92", "АИ-95"] },
      { id: "2", coords: [55.752, 37.574], type: "АГНКС", fuelTypes: ["Метан"] },
      { id: "3", coords: [55.753, 37.575], type: "МАЗС", fuelTypes: ["Пропан", "АИ-92", "АИ-95", "ДТ"] },
      { id: "4", coords: [55.754, 37.576], type: "АГЗС", fuelTypes: ["Пропан"] },
      { id: "5", coords: [55.755, 37.577], type: "АГНКС", fuelTypes: ["Метан"] }
    ].filter(station => station.type.includes("ЛОГАЗ")); // Filter stations to only show ones with "ЛОГАЗ" in the type

    // Filter stations based on active filters
    const filteredStations = stations.filter(station => {
      // If no filters are active, show all ЛОГАЗ stations
      if (activeTypeFilters.length === 0 && activeFuelFilters.length === 0) {
        return true;
      }

      // Check type filter
      const passesTypeFilter = activeTypeFilters.length === 0 || 
                              activeTypeFilters.includes(station.type);
      
      // Check fuel filter
      const passesFuelFilter = activeFuelFilters.length === 0 || 
                              station.fuelTypes.some(fuel => activeFuelFilters.includes(fuel));
      
      return passesTypeFilter && passesFuelFilter;
    });

    // Add filtered stations to map
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
