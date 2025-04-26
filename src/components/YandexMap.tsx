
import React, { useEffect } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ onStationClick }: { onStationClick?: (id: string) => void }) => {
  useEffect(() => {
    // Load Yandex Maps script
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=589e2c90-1f8a-4740-a5c3-8a3423c9897c&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map('map', {
          center: [55.751574, 37.573856], // Moscow coordinates
          zoom: 11,
          controls: ['zoomControl', 'geolocationControl']
        });

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
            iconImageHref: '/path/to/marker-icon.png', // Замените на реальный путь к иконке
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
      // Cleanup
      document.head.removeChild(script);
    };
  }, [onStationClick]);

  return (
    <div id="map" className="w-full h-full" />
  );
};

export default YandexMap;
