
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
  // For now we'll just show a placeholder for the QR code
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
          <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-logaz-blue p-4 flex items-center justify-center">
              <p className="text-center text-sm">QR код для карты {cardNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-logaz-blue hover:bg-logaz-blue/90">
            Закрыть <X size={16} className="ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
