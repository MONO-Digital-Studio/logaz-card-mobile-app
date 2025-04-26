
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
  
  // Updated station data for Perm region from Yandex.Maps
  const recentStations: Station[] = [
    {
      id: "1",
      name: "ЛОГАЗ SV АГЗС",
      type: "ЛОГАЗ SV АГЗС",
      address: "Пермский край, Пермь, шоссе Космонавтов, 316/1",
      hours: "Круглосуточно",
      rating: 4.8,
      fuelTypes: ["Метан", "Пропан-бутан", "АИ-92", "АИ-95"],
      distance: "2.3 км"
    },
    {
      id: "2",
      name: "ЛОГАЗ SV АГЗС",
      type: "ЛОГАЗ SV АГЗС",
      address: "Пермский край, Пермь, улица Спешилова, 94",
      hours: "Круглосуточно",
      rating: 4.7,
      fuelTypes: ["Пропан-бутан", "АИ-92", "АИ-95", "ДТ"],
      distance: "4.1 км"
    },
    {
      id: "3",
      name: "ЛОГАЗ SV АГНКС",
      type: "ЛОГАЗ SV АГНКС",
      address: "Пермский край, Краснокамск, улица Энтузиастов, 7",
      hours: "Круглосуточно",
      rating: 4.6,
      fuelTypes: ["Метан", "Пропан-бутан"],
      distance: "6.8 км"
    }
  ];

  const handleShowQR = () => {
    setQrModalOpen(true);
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
