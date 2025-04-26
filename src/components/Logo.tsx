
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-logaz-blue p-2 rounded-lg">
        <span className="text-white font-bold">ЛОГАЗ</span>
      </div>
      <div className="bg-logaz-orange p-2 rounded-lg ml-1">
        <span className="text-white font-bold">SV</span>
      </div>
    </div>
  );
};

export default Logo;
