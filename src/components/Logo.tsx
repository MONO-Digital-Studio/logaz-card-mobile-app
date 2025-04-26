
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img 
      src="/lovable-uploads/ecd3454b-43cb-4182-b8d1-31af6b7d62b8.png" 
      alt="ЛОГАЗ SV" 
      className={`h-full ${className}`}
    />
  );
};

export default Logo;
