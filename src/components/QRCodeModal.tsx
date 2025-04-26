
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardNumber: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, cardNumber }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Карта {cardNumber}</DialogTitle>
          <DialogDescription>
            Отсканируйте QR-код для оплаты на АЗС
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <div className="w-64 h-64 bg-white flex items-center justify-center">
            <img 
              src="/lovable-uploads/c1c479e3-8881-4535-a7c6-6ed725f6e8ac.png"
              alt="QR код для оплаты"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose} className="bg-logaz-blue hover:bg-logaz-blue/90">
            Закрыть <X size={16} className="ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
