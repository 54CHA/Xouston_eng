"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isRequestModalOpen: boolean;
  openRequestModal: () => void;
  closeRequestModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);

  return (
    <ModalContext.Provider
      value={{ isRequestModalOpen, openRequestModal, closeRequestModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
