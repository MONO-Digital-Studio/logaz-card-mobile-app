
import React from 'react';
import Logo from '@/components/Logo';

const Header = () => {
  return (
    <header className="bg-white py-4 px-4 flex items-center justify-center shadow-sm">
      <Logo className="h-6" />
    </header>
  );
};

export default Header;
