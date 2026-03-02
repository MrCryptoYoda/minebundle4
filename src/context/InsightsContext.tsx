import React, { createContext, useContext, useState, useEffect } from 'react';

export type PlanType = 'SP_FREE' | 'SP_PAID';
export type ProfileCompleteness = 45 | 85 | 100;

interface InsightsContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  profileCompleteness: ProfileCompleteness;
  setProfileCompleteness: (val: ProfileCompleteness) => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

export function InsightsProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanType>(() => {
    return (localStorage.getItem('insights_plan') as PlanType) || 'SP_FREE';
  });

  const [profileCompleteness, setProfileCompleteness] = useState<ProfileCompleteness>(() => {
    const stored = localStorage.getItem('insights_profile_completeness');
    return stored ? (parseInt(stored) as ProfileCompleteness) : 45;
  });

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem('insights_plan', plan);
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('insights_profile_completeness', profileCompleteness.toString());
  }, [profileCompleteness]);

  return (
    <InsightsContext.Provider
      value={{
        plan,
        setPlan,
        profileCompleteness,
        setProfileCompleteness,
        isSidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
}

export function useInsights() {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }
  return context;
}
