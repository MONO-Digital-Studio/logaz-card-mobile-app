
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  CreditCard, 
  Car,
  Route, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { toast } from "sonner";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data
  const userData = {
    name: 'Иванов Иван',
    company: 'ООО Транспорт-Сервис',
    phone: '+7 (900) 123-45-67',
  };
  
  const handleLogout = () => {
    toast.success('Вы вышли из аккаунта');
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-logaz-background pb-16">
      <Header />
      
      <main className="p-4">
        {/* User Info Section */}
        <section className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center">
            <div className="bg-logaz-blue/10 rounded-full p-4 mr-4">
              <User size={32} className="text-logaz-blue" />
            </div>
            <div>
              <h2 className="font-medium text-lg">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.company}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-xs text-gray-500">Телефон</p>
              <p className="text-sm">{userData.phone}</p>
            </div>
          </div>
        </section>
        
        {/* Settings Sections */}
        <section className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
          {/* Notifications */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bell size={20} className="mr-3 text-logaz-blue" />
                <span>Уведомления</span>
              </div>
              <Switch />
            </div>
          </div>
          
          {/* Cards */}
          <div className="p-4 flex justify-between items-center" onClick={() => navigate('/card')}>
            <div className="flex items-center">
              <CreditCard size={20} className="mr-3 text-logaz-blue" />
              <span>Мои карты</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          {/* Vehicles */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Car size={20} className="mr-3 text-logaz-blue" />
              <span>Мои автомобили</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          {/* Routes History */}
          <div className="p-4 flex justify-between items-center" onClick={() => navigate('/routes')}>
            <div className="flex items-center">
              <Route size={20} className="mr-3 text-logaz-blue" />
              <span>История маршрутов</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          {/* App Settings */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Settings size={20} className="mr-3 text-logaz-blue" />
              <span>Настройки приложения</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          {/* Help */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <HelpCircle size={20} className="mr-3 text-logaz-blue" />
              <span>Помощь</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </section>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full mt-6 border-logaz-error text-logaz-error hover:bg-logaz-error/5"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Выйти из аккаунта
        </Button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;

