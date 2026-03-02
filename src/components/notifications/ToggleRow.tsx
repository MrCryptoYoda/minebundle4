import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ToggleRowProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  tooltipText?: string;
  disabled?: boolean;
}

export function ToggleRow({ 
  id, 
  label, 
  description, 
  checked, 
  onCheckedChange, 
  tooltipText,
  disabled 
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <Label htmlFor={id} className="text-sm font-medium text-slate-900 cursor-pointer">
            {label}
          </Label>
          {description && (
            <span className="text-xs text-slate-500 mt-0.5">{description}</span>
          )}
        </div>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}
