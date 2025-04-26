
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
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map('map', {
          center: [55.751574, 37.573856], // Moscow coordinates
          zoom: 11,
          controls: ['zoomControl', 'geolocationControl']
        });

        // Add your markers and other map functionality here
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id="map" className="w-full h-full" />
  );
};

export default YandexMap;
