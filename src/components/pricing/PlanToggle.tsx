import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PlanToggleProps {
  isAnnual: boolean;
  onToggle: (checked: boolean) => void;
}

export function PlanToggle({ isAnnual, onToggle }: PlanToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Label 
        htmlFor="billing-toggle" 
        className={`text-sm font-medium cursor-pointer transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}
        onClick={() => onToggle(false)}
      >
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={isAnnual}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-brand-orange"
      />
      <Label 
        htmlFor="billing-toggle" 
        className={`text-sm font-medium cursor-pointer transition-colors flex items-center gap-2 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}
        onClick={() => onToggle(true)}
      >
        Annual
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          Save 20%
        </span>
      </Label>
    </div>
  );
}
