
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-logaz-background">
      <Logo className="mb-8 h-12" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4 text-center">
        Страница не найдена
      </p>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Запрошенная страница не существует или была удалена
      </p>
      <Button asChild className="bg-logaz-blue hover:bg-logaz-blue/90">
        <a href="/">
          <Home className="mr-2" size={18} /> На главную
        </a>
      </Button>
    </div>
  );
};

export default NotFound;
