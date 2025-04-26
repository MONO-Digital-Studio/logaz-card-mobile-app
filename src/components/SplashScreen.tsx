
import React from 'react';
import Logo from '@/components/Logo';
import { Loader } from 'lucide-react';

const SplashScreen = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-logaz-background">
      <div className="text-center space-y-6">
        <Logo className="h-20 mb-4 mx-auto" />
        <p className="text-gray-600 text-lg text-center px-[10px]">
          Виртуальные топливные<br />карты для бизнеса
        </p>
        <Loader className="w-8 h-8 mx-auto text-logaz-blue animate-spin" />
      </div>
    </div>;
};

export default SplashScreen;
