import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const PROJECT_STAGES = [
  { id: 'Exploration', label: 'Exploration', description: 'Greenfield, brownfield, drilling, sampling' },
  { id: 'Feasibility', label: 'Feasibility & Studies', description: 'Scoping, PFS, DFS, permitting' },
  { id: 'Construction', label: 'Construction & Commissioning', description: 'EPC, EPCM, civil works, plant build' },
  { id: 'Operations', label: 'Operations & Production', description: 'Mining, processing, maintenance, logistics' },
  { id: 'CareMaintenance', label: 'Care & Maintenance', description: 'Site preservation, security, monitoring' },
  { id: 'Closure', label: 'Closure & Rehabilitation', description: 'Decommissioning, remediation, land use' },
];

export function SectionEStage() {
  const { projectStages, updateField } = useProfileStore();

  const toggleStage = (stageId: string) => {
    if (projectStages.includes(stageId)) {
      updateField('projectStages', projectStages.filter(id => id !== stageId));
    } else {
      updateField('projectStages', [...projectStages, stageId]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Project Lifecycle Stages</h2>
        <p className="text-slate-400 text-sm">Select the project stages where your services are most relevant.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Supported Stages</CardTitle>
          <CardDescription>We'll match you with leads in these specific phases.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {PROJECT_STAGES.map((stage) => (
              <div 
                key={stage.id} 
                className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${
                  projectStages.includes(stage.id) 
                    ? 'bg-brand-orange/5 border-brand-orange/30' 
                    : 'bg-[#13131A] border-slate-800 hover:border-slate-700'
                }`}
              >
                <Checkbox 
                  id={stage.id} 
                  checked={projectStages.includes(stage.id)}
                  onCheckedChange={() => toggleStage(stage.id)}
                  className="mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <div className="space-y-1 cursor-pointer" onClick={() => toggleStage(stage.id)}>
                  <Label htmlFor={stage.id} className="text-base font-medium text-slate-200 cursor-pointer">
                    {stage.label}
                  </Label>
                  <p className="text-sm text-slate-500">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
