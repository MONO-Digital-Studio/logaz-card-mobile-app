
import React, { useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { toast } from 'sonner';

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ onStationClick }: { onStationClick?: (id: string) => void }) => {
  const { latitude, longitude, error, isTracking } = useGeolocation();

  useEffect(() => {
    if (error) {
      toast.error('Ошибка получения геолокации: ' + error);
    }
  }, [error]);

  useEffect(() => {
    // Load Yandex Maps script
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=589e2c90-1f8a-4740-a5c3-8a3423c9897c&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map('map', {
          center: [latitude || 55.751574, longitude || 37.573856],
          zoom: 11,
          controls: ['zoomControl', 'geolocationControl']
        });

        // Add user location marker if available
        if (isTracking && latitude && longitude) {
          const userLocation = new window.ymaps.Placemark([latitude, longitude], {
            hintContent: 'Ваше местоположение'
          }, {
            preset: 'islands#blueCircleDotIcon'
          });
          map.geoObjects.add(userLocation);
          map.setCenter([latitude, longitude]);
        }

        // Добавляем маркеры станций
        const stations = [
          { id: "1", coords: [55.751574, 37.573856] },
          { id: "2", coords: [55.752, 37.574] },
          { id: "3", coords: [55.753, 37.575] },
          { id: "4", coords: [55.754, 37.576] },
          { id: "5", coords: [55.755, 37.577] }
        ];

        stations.forEach(station => {
          const marker = new window.ymaps.Placemark(station.coords, {}, {
            iconLayout: 'default#image',
            iconImageHref: '/path/to/marker-icon.png',
            iconImageSize: [30, 42],
            iconImageOffset: [-15, -42]
          });

          marker.events.add('click', () => {
            onStationClick && onStationClick(station.id);
          });

          map.geoObjects.add(marker);
        });
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [onStationClick, latitude, longitude, isTracking]);

  return (
    <div id="map" className="w-full h-full" />
  );
};

export default YandexMap;
