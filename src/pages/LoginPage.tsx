
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Logo from '@/components/Logo';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      if (username && password) {
        toast.success('Вы успешно вошли в систему');
        navigate('/');
      } else {
        toast.error('Пожалуйста, заполните все поля');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-logaz-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-12 mb-4" />
          <h1 className="text-2xl font-bold text-logaz-text">Добро пожаловать</h1>
          <p className="text-gray-500 mt-1">Войдите в учетную запись</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Имя пользователя
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              autoComplete="username"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              autoComplete="current-password"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Запомнить меня
              </label>
            </div>
            
            <a href="#" className="text-sm text-logaz-blue hover:text-logaz-orange">
              Забыли пароль?
            </a>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-logaz-orange hover:bg-logaz-orange/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет учетной записи?{' '}
            <a href="#" className="text-logaz-blue hover:text-logaz-orange font-medium">
              Регистрация
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
