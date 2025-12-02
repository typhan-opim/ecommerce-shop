import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export type ModalType = "alert" | "confirm" | "custom";

export interface ModalConfig {
  id: string;
  type: ModalType;
  message?: string;
  // Add more config fields as needed
}

interface ModalContextType {
  modals: ModalConfig[];
  showModal: (modal: Omit<ModalConfig, "id">) => string;
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

let modalIdCounter = 0;

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const showModal = useCallback((modal: Omit<ModalConfig, "id">) => {
    const id = `modal_${++modalIdCounter}`;
    setModals((prev) => [...prev, { ...modal, id }]);
    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ modals, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useModal(): ModalContextType {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
