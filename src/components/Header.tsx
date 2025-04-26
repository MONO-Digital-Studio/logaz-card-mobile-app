import React from 'react';
import Logo from './Logo';
import { Bell, Search } from 'lucide-react';
const Header: React.FC = () => {
  return <header className="bg-white px-5 shadow-sm flex justify-between items-center py-[14px]">
      <Logo className="h-8 w-auto" />
      <div className="flex items-center space-x-4">
        <button className="text-logaz-text">
          <Search size={18} />
        </button>
        <button className="text-logaz-text">
          <Bell size={18} />
        </button>
      </div>
    </header>;
};
export default Header;