
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Logo from '@/components/Logo';
import { MessageSquare, Lock } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (phone && password) {
        toast.success('Вы успешно вошли в систему');
        navigate('/home');
      } else {
        toast.error('Пожалуйста, заполните все поля');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleTelegramLogin = () => {
    toast.info('Вход через Telegram (в разработке)');
  };

  return (
    <div className="min-h-screen bg-logaz-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-12 mb-4" />
          <h1 className="text-2xl font-bold text-logaz-text"></h1>
          <p className="text-gray-500 mt-1">Введите данные для входа</p>
        </div>

        <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10"
              autoComplete="tel"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              autoComplete="current-password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-logaz-orange hover:bg-logaz-orange/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Или войти через</span>
          </div>
        </div>

        <Button
          onClick={handleTelegramLogin}
          className="w-full bg-logaz-blue text-white"
        >
          Войти через Telegram
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет учетной записи?{' '}
            <a href="#" className="text-logaz-blue hover:text-logaz-orange font-medium">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
