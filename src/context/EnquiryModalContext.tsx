import React, { createContext, useContext, useState, useCallback } from 'react';

interface EnquiryModalContextType {
  isOpen: boolean;
  selectedVilla: string;
  openModal: (villa?: string) => void;
  closeModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export const EnquiryModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState<string>('');

  const openModal = useCallback((villa?: string) => {
    if (villa) {
      setSelectedVilla(villa);
    } else {
      setSelectedVilla('');
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryModalContext.Provider value={{ isOpen, selectedVilla, openModal, closeModal }}>
      {children}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};
