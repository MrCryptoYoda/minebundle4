import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  Briefcase, 
  Pickaxe, 
  Globe, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Wallet, 
  Bell, 
  Users,
  FolderKanban
} from 'lucide-react';
import { useProfileStore } from '@/store/profileStore';

interface ProfileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SECTIONS = [
  { id: 'identity', label: 'Company Identity', icon: Building2 },
  { id: 'services', label: 'Services & Capabilities', icon: Briefcase },
  { id: 'commodities', label: 'Commodities', icon: Pickaxe },
  { id: 'coverage', label: 'Coverage & Geography', icon: Globe },
  { id: 'stage', label: 'Project Stage', icon: Layers },
  { id: 'capacity', label: 'Capacity & Availability', icon: BarChart3 },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'commercials', label: 'Commercial', icon: Wallet },
  { id: 'projects', label: 'Past Projects', icon: FolderKanban },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'team', label: 'Team', icon: Users },
];

export function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
  const completeness = useProfileStore(state => state.calculateCompleteness());

  return (
    <div className="w-64 shrink-0 space-y-6">
      {/* Completeness Card */}
      <div className="bg-[#1C1C24] rounded-xl p-4 border border-slate-800">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-slate-300">Profile Completion</span>
          <span className="text-xl font-bold text-brand-orange">{completeness}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-orange transition-all duration-500 ease-out"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Complete your profile to unlock better lead matching and visibility.
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-brand-orange/10 text-brand-orange" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-brand-orange" : "text-slate-500")} />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
