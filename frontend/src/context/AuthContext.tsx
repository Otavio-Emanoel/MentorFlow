import React, { createContext, useContext, useMemo, useState } from 'react';

export type User = { id: string; name: string } | null;

type AuthContextValue = {
  user: User;
  signIn: (name: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    signIn: (name: string) => setUser({ id: 'local', name }),
    signOut: () => setUser(null),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
