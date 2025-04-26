import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import BottomNavigation from '@/components/BottomNavigation';
import FuelCard from '@/components/FuelCard';
import QRCodeModal from '@/components/QRCodeModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'fill' | 'payment' | 'refund';
  station: string;
  fuelType?: string;
  liters?: number;
}

const CardPage: React.FC = () => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  const cardNumber = "5678 1234 9012 3456";
  const balance = 15750;
  const company = "ООО Транспорт-Сервис";
  
  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date(2023, 3, 15, 14, 30),
      amount: -750,
      type: 'fill',
      station: 'АГЗС №7',
      fuelType: 'Пропан',
      liters: 15
    },
    {
      id: '2',
      date: new Date(2023, 3, 12, 9, 45),
      amount: -1200,
      type: 'fill',
      station: 'МАЗС №12',
      fuelType: 'АИ-95',
      liters: 20
    },
    {
      id: '3',
      date: new Date(2023, 3, 10, 18, 15),
      amount: -600,
      type: 'fill',
      station: 'АГЗС №3',
      fuelType: 'Пропан',
      liters: 12
    },
    {
      id: '4',
      date: new Date(2023, 3, 8, 11, 0),
      amount: 5000,
      type: 'payment',
      station: '-'
    },
    {
      id: '5',
      date: new Date(2023, 3, 5, 16, 30),
      amount: -950,
      type: 'fill',
      station: 'АГНКС Метан',
      fuelType: 'Метан',
      liters: 19
    }
  ];

  const handleShowQR = () => {
    setQrModalOpen(true);
  };
  
  const formatDate = (date: Date) => {
    return format(date, 'dd MMM yyyy, HH:mm', { locale: ru });
  };

  const getTransactionStatusClass = (amount: number) => {
    return amount < 0 
      ? 'text-red-600' 
      : 'text-green-600';
  };

  const getTransactionAmount = (amount: number) => {
    return `${amount < 0 ? '' : '+'}${amount.toLocaleString()} ₽`;
  };

  const getTransactionDescription = (transaction: Transaction) => {
    if (transaction.type === 'fill') {
      return `Заправка ${transaction.fuelType}, ${transaction.liters} л`;
    } else if (transaction.type === 'payment') {
      return 'Пополнение счета';
    } else {
      return 'Возврат средств';
    }
  };

  return (
    <div className="min-h-screen bg-logaz-background pb-16">
      <main className="p-4">
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

        <section>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="history" className="flex-1">История</TabsTrigger>
              <TabsTrigger value="limits" className="flex-1">Лимиты</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <h2 className="text-lg font-medium mb-4">История операций</h2>
              
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{getTransactionDescription(transaction)}</p>
                        <p className="text-sm text-gray-600">{transaction.station}</p>
                        <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                      </div>
                      <div className={`font-medium ${getTransactionStatusClass(transaction.amount)}`}>
                        {getTransactionAmount(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="limits">
              <h2 className="text-lg font-medium mb-4">Лимиты карты</h2>
              
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Суточный лимит</p>
                <p className="font-medium text-lg">10 000 ₽</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-logaz-blue h-2 rounded-full" 
                    style={{ width: '35%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Использовано 3 500 ₽ из 10 000 ₽</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Месячный лимит</p>
                <p className="font-medium text-lg">100 000 ₽</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-logaz-orange h-2 rounded-full" 
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Использовано 65 000 ₽ из 100 000 ₽</p>
              </div>
              
              <Button className="w-full bg-logaz-blue hover:bg-logaz-blue/90 mt-4">
                Запросить изменение лимитов
              </Button>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default CardPage;
