
import React from 'react';

interface StationMarkerProps {
  type: string;
  onClick: () => void;
  isActive?: boolean;
}

const StationMarker: React.FC<StationMarkerProps> = ({ type, onClick, isActive = false }) => {
  // Choose color based on station type
  let bgColor = 'bg-logaz-blue';
  if (type.includes('АГЗС')) bgColor = 'bg-logaz-orange';
  if (type.includes('АГНКС')) bgColor = 'bg-logaz-success';

  return (
    <div 
      className={`cursor-pointer transform transition-transform ${isActive ? 'scale-125 z-20' : 'hover:scale-110'}`}
      onClick={onClick}
    >
      {/* Using the logo image instead of the circle+dot design */}
      <div className={`relative ${isActive ? 'shadow-lg' : 'shadow-sm'}`}>
        <img 
          src="/lovable-uploads/b954a2fb-4e63-4313-b6a0-c9eb5c6835ae.png" 
          alt="ЛОГАЗ SV"
          className={`w-8 h-8 object-contain ${isActive ? 'scale-110' : ''}`}
        />
        {/* Triangle pointer at bottom */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
                        border-l-[6px] border-l-transparent 
                        border-r-[6px] border-r-transparent 
                        ${type.includes('АГЗС') 
                          ? 'border-t-[8px] border-t-logaz-orange' 
                          : type.includes('АГНКС')
                            ? 'border-t-[8px] border-t-logaz-success'
                            : 'border-t-[8px] border-t-logaz-blue'
                        }`}>
        </div>
      </div>
      {isActive && (
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
          {type}
        </div>
      )}
    </div>
  );
};

export default StationMarker;
