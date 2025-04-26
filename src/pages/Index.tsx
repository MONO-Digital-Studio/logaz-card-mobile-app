
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after showing splash screen
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-logaz-background">
      <div className="text-center animate-pulse-slow">
        <Logo className="h-16 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-2">ЛОГАЗ SV</h1>
        <p className="text-gray-600">Система управления топливными картами</p>
      </div>
    </div>
  );
};

export default Index;
