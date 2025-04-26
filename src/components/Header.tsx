
import React from 'react';
import Logo from './Logo';
import { Bell, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 px-5 shadow-sm flex justify-between items-center">
      <Logo className="h-8" />
      <div className="flex items-center space-x-4">
        <button className="text-logaz-text">
          <Search size={20} />
        </button>
        <button className="text-logaz-text">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
