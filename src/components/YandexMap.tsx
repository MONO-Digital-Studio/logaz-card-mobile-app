
import React, { useEffect } from 'react';

const YandexMap: React.FC = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A25ccc1ed270ffaba53ea3974f37f37d7eb3816d7dade08d86a0e440c9d1b9b7a&width=100%25&height=720&lang=ru_RU&scroll=true';
    
    // Add script to the container div
    const mapContainer = document.getElementById('yandex-map-container');
    if (mapContainer) {
      mapContainer.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (mapContainer && mapContainer.contains(script)) {
        mapContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="yandex-map-container" 
      className="w-full h-[calc(100vh-130px)]"
    />
  );
};

export default YandexMap;
