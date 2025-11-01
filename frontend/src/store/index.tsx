import React, { createContext, useContext, useMemo, useState } from 'react';

export type AppState = {
  counter: number;
  increment: () => void;
  reset: () => void;
};

const StoreContext = createContext<AppState | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const value = useMemo<AppState>(() => ({
    counter,
    increment: () => setCounter((c) => c + 1),
    reset: () => setCounter(0),
  }), [counter]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): AppState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>');
  return ctx;
}
