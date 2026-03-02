import React from 'react';
import { useInsights, PlanType, ProfileCompleteness } from '@/context/InsightsContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings2 } from 'lucide-react';

export function QAToggles() {
  const { plan, setPlan, profileCompleteness, setProfileCompleteness } = useInsights();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-[#1C1C24] border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
        onClick={() => setIsOpen(true)}
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 p-4 w-64 shadow-xl border-slate-700 bg-[#1C1C24]">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-bold uppercase text-slate-400">QA Controls</h4>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-800" onClick={() => setIsOpen(false)}>
          ×
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1 block">Plan</label>
          <div className="flex gap-1">
            {(['SP_FREE', 'SP_PAID'] as PlanType[]).map((p) => (
              <Button
                key={p}
                variant={plan === p ? 'default' : 'outline'}
                size="sm"
                className={`flex-1 text-xs h-7 ${plan === p ? 'bg-brand-orange hover:bg-brand-orange/90 text-white border-none' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 bg-transparent'}`}
                onClick={() => setPlan(p)}
              >
                {p === 'SP_FREE' ? 'Free' : 'Paid'}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300 mb-1 block">Profile Completeness</label>
          <div className="flex gap-1">
            {([45, 85, 100] as ProfileCompleteness[]).map((pc) => (
              <Button
                key={pc}
                variant={profileCompleteness === pc ? 'default' : 'outline'}
                size="sm"
                className={`flex-1 text-xs h-7 ${profileCompleteness === pc ? 'bg-brand-orange hover:bg-brand-orange/90 text-white border-none' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 bg-transparent'}`}
                onClick={() => setProfileCompleteness(pc)}
              >
                {pc}%
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
