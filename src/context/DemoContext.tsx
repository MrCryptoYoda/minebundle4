import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type UserRole = 'individual' | 'agent' | 'service_provider' | 'admin';

interface DemoContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  ndaSigned: boolean;
  hasInsightsSubscription: boolean;
  profileCompleteness: number; // 0-100
  login: () => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  setNdaSigned: (signed: boolean) => void;
  setHasInsightsSubscription: (has: boolean) => void;
  setProfileCompleteness: (percent: number) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('demo_isAuthenticated') === 'true');
  const [userRole, setUserRole] = useState<UserRole>(() => (localStorage.getItem('demo_userRole') as UserRole) || 'individual');
  const [ndaSigned, setNdaSigned] = useState(() => localStorage.getItem('demo_ndaSigned') === 'true');
  const [hasInsightsSubscription, setHasInsightsSubscription] = useState(() => localStorage.getItem('demo_hasInsightsSubscription') === 'true');
  const [profileCompleteness, setProfileCompleteness] = useState(() => parseInt(localStorage.getItem('demo_profileCompleteness') || '45', 10));

  React.useEffect(() => {
    localStorage.setItem('demo_isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  React.useEffect(() => {
    localStorage.setItem('demo_userRole', userRole);
  }, [userRole]);

  React.useEffect(() => {
    localStorage.setItem('demo_ndaSigned', String(ndaSigned));
  }, [ndaSigned]);

  React.useEffect(() => {
    localStorage.setItem('demo_hasInsightsSubscription', String(hasInsightsSubscription));
  }, [hasInsightsSubscription]);

  React.useEffect(() => {
    localStorage.setItem('demo_profileCompleteness', String(profileCompleteness));
  }, [profileCompleteness]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setNdaSigned(false);
    setUserRole('individual');
    localStorage.removeItem('demo_isAuthenticated');
    localStorage.removeItem('demo_userRole');
    localStorage.removeItem('demo_ndaSigned');
    localStorage.removeItem('demo_hasInsightsSubscription');
    localStorage.removeItem('demo_profileCompleteness');
  };

  return (
    <DemoContext.Provider value={{
      isAuthenticated,
      userRole,
      ndaSigned,
      hasInsightsSubscription,
      profileCompleteness,
      login,
      logout,
      setUserRole,
      setNdaSigned,
      setHasInsightsSubscription,
      setProfileCompleteness
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
