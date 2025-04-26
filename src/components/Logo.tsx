
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img 
      src="/lovable-uploads/d649b731-5ecb-4621-8f85-15b26f4ac5ec.png" 
      alt="ЛОГАЗ SV" 
      className={`h-full object-contain ${className}`}
    />
  );
};

export default Logo;
