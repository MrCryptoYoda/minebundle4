import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProfileSidebar } from '@/components/insights/profile/ProfileSidebar';
import { SectionAIdentity } from '@/components/insights/profile/SectionAIdentity';
import { SectionBServices } from '@/components/insights/profile/SectionBServices';
import { SectionCCommodities } from '@/components/insights/profile/SectionCCommodities';
import { SectionDCoverage } from '@/components/insights/profile/SectionDCoverage';
import { SectionEStage } from '@/components/insights/profile/SectionEStage';
import { SectionFCapacity } from '@/components/insights/profile/SectionFCapacity';
import { SectionGCompliance } from '@/components/insights/profile/SectionGCompliance';
import { SectionHCommercials } from '@/components/insights/profile/SectionHCommercials';
import { SectionIAlerts } from '@/components/insights/profile/SectionIAlerts';
import { SectionJTeam } from '@/components/insights/profile/SectionJTeam';
import { SectionKProjects } from '@/components/insights/profile/SectionKProjects';
import { Save, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function InsightsProfile() {
  const [activeSection, setActiveSection] = useState('identity');
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would trigger an API call.
    // Since we are using Zustand with persist, it's already "saved" locally,
    // but we show this for UX feedback.
    toast({
      title: "Profile Saved",
      description: "Your changes have been successfully saved.",
      duration: 3000,
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'identity': return <SectionAIdentity />;
      case 'services': return <SectionBServices />;
      case 'commodities': return <SectionCCommodities />;
      case 'coverage': return <SectionDCoverage />;
      case 'stage': return <SectionEStage />;
      case 'capacity': return <SectionFCapacity />;
      case 'compliance': return <SectionGCompliance />;
      case 'commercials': return <SectionHCommercials />;
      case 'alerts': return <SectionIAlerts />;
      case 'team': return <SectionJTeam />;
      case 'projects': return <SectionKProjects />;
      default: return (
        <div className="flex flex-col items-center justify-center h-96 text-slate-500">
          <p>Section "{activeSection}" is under construction.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b border-slate-800 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Provider Profile</h1>
          <p className="text-slate-400">Your profile powers lead matching, scoring, and alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview Profile
          </Button>
          <Button onClick={handleSave} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8 flex-1 overflow-hidden">
        {/* Left Rail Navigation */}
        <div className="overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Center Content */}
        <div className="flex-1 overflow-y-auto pb-20 pr-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-3xl">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
