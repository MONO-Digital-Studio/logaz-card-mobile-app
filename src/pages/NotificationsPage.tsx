import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Акция на АГЗС №7',
      message: 'Заправьтесь сегодня и получите бонусные баллы на карту!',
      date: '26.04.2025',
      isRead: false,
    },
    {
      id: '2',
      title: 'Плановые работы',
      message: 'АГНКС на ул. Гагарина временно не работает в связи с техническим обслуживанием',
      date: '25.04.2025',
      isRead: true,
    },
  ];

  return (
    <div className="min-h-screen bg-logaz-background">
      <Header />
      <main className="p-4 pb-20">
        <h1 className="text-xl font-semibold mb-4"></h1>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg p-4 shadow ${
                !notification.isRead ? 'border-l-4 border-logaz-blue' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{notification.title}</h3>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          ))}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default NotificationsPage;
