
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Clock, Info, DollarSign } from "lucide-react";
import { Station } from './StationCard';

interface StationDetailsModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
}

const StationDetailsModal: React.FC<StationDetailsModalProps> = ({
  station,
  isOpen,
  onClose
}) => {
  if (!station) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{station.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-gray-700">Адрес</div>
              <div>{station.address}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-gray-700">Режим работы</div>
              <div>{station.hours}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-gray-700">Виды топлива</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {station.fuelTypes.map((fuel, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                    {fuel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-gray-700">Цены на топливо</div>
              <div className="space-y-1 mt-1">
                {station.fuelTypes.map((fuel, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{fuel}</span>
                    <span className="font-medium">{(Math.random() * 40 + 20).toFixed(2)} ₽/л</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StationDetailsModal;
