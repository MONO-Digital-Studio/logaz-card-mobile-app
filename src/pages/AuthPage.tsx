
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Logo from '@/components/Logo';
import { MessageSquare, Lock, User } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone] = useState('7 (999) 123-45-67');
  const [password] = useState('********');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      toast.success('Вы успешно вошли в систему');
      navigate('/home');
    } else {
      if (name) {
        toast.success('Регистрация успешно завершена');
        setIsLogin(true);
      } else {
        toast.error('Пожалуйста, введите ваше имя');
      }
    }
    setIsLoading(false);
  };

  const handleTelegramLogin = () => {
    toast.info('Вход через Telegram (в разработке)');
  };

  return (
    <div className="min-h-screen bg-logaz-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-12 mb-4" />
          <h1 className="text-2xl font-bold text-logaz-text">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isLogin ? 'Войдите в ваш аккаунт' : 'Создание нового аккаунта'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={() => {}} // Empty onChange to suppress React warning
              className="pl-10 bg-gray-100 text-gray-600"
              disabled
              readOnly
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
              onChange={() => {}} // Empty onChange to suppress React warning
              className="pl-10 bg-gray-100 text-gray-600"
              disabled
              readOnly
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-logaz-orange hover:bg-logaz-orange/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (isLogin ? 'Вход...' : 'Регистрация...') : (isLogin ? 'Войти' : 'Зарегистрироваться')}
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
            {isLogin ? 'Нет учетной записи?' : 'Уже есть аккаунт?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-logaz-blue hover:text-logaz-orange font-medium"
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
