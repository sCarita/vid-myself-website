"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type StepContextType = {
  currentStep: 1 | 2;
  setCurrentStep: (step: 1 | 2) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);
  if (!context) throw new Error("useStep must be used within StepProvider");
  return context;
}
