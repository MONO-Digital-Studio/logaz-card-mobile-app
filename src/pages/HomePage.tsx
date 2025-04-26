
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import FuelCard from '@/components/FuelCard';
import QRCodeModal from '@/components/QRCodeModal';
import { Button } from '@/components/ui/button';
import { MapPin, Route, CreditCard, Clock } from 'lucide-react';
import StationCard, { Station } from '@/components/StationCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  // Mock data
  const cardNumber = "5678 1234 9012 3456";
  const balance = 15750;
  const company = "ООО Транспорт-Сервис";
  
  const recentStations: Station[] = [
    {
      id: "1",
      name: "АГЗС №7",
      type: "АГЗС",
      address: "ул. Ленина, 123",
      hours: "24 часа",
      rating: 4.8,
      fuelTypes: ["Пропан", "АИ-92", "АИ-95"],
      distance: "1.2 км"
    },
    {
      id: "2",
      name: "АГНКС Метан",
      type: "АГНКС",
      address: "ул. Гагарина, 45А",
      hours: "06:00 - 22:00",
      rating: 4.5,
      fuelTypes: ["Метан"],
      distance: "3.5 км"
    }
  ];

  const handleShowQR = () => {
    setQrModalOpen(true);
  };

  const handleCardClick = () => {
    navigate('/card'); // Перенаправляем на страницу с деталями карты
  };

  const handleRouteClick = (stationId: string) => {
    navigate(`/routes?station=${stationId}`);
  };

  const handleStationClick = (stationId: string) => {
    navigate(`/map?station=${stationId}`);
  };

  return (
    <div className="min-h-screen bg-logaz-background pb-16">
      <Header />
      
      <main className="p-4">
        {/* Card Section */}
        <section className="mb-6">
          <FuelCard 
            cardNumber={cardNumber}
            balance={balance}
            company={company}
            onShowQR={handleShowQR}
            onClick={handleCardClick}
          />
          <QRCodeModal 
            isOpen={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
            cardNumber={cardNumber.substring(0, 4) + "..." + cardNumber.substring(cardNumber.length - 4)}
          />
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-2"
              onClick={() => navigate('/map')}
            >
              <MapPin className="h-6 w-6 mb-2 text-logaz-blue" />
              <span>Найти АГЗС</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-2"
              onClick={() => navigate('/routes')}
            >
              <Route className="h-6 w-6 mb-2 text-logaz-orange" />
              <span>Построить маршрут</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-2"
              onClick={() => navigate('/card')}
            >
              <CreditCard className="h-6 w-6 mb-2 text-logaz-blue" />
              <span>История операций</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-2"
              onClick={() => navigate('/profile')}
            >
              <Clock className="h-6 w-6 mb-2 text-logaz-orange" />
              <span>Мои маршруты</span>
            </Button>
          </div>
        </section>

        {/* Recent Stations */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Ближайшие заправки</h2>
            <Button 
              variant="link" 
              className="text-logaz-blue p-0 h-auto"
              onClick={() => navigate('/map')}
            >
              Смотреть все
            </Button>
          </div>
          
          {recentStations.map(station => (
            <StationCard 
              key={station.id}
              station={station}
              onRouteClick={handleRouteClick}
              onDetailsClick={handleStationClick}
            />
          ))}
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
