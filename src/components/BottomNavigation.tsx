
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, CreditCard, Route, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Главная' },
    { path: '/notifications', icon: Bell, label: 'Сообщения' },
    { path: '/card', icon: CreditCard, label: 'Карта' },
    { path: '/routes', icon: Route, label: 'Маршруты' },
    { path: '/profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-1 py-2 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-3 py-1 ${
                isActive 
                  ? 'text-logaz-blue' 
                  : 'text-gray-500 hover:text-logaz-orange'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
