import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LockedTabContentProps {
  title: string;
  description?: string;
  isAuthenticated: boolean;
  onAction: () => void;
  actionLabel?: string;
}

export function LockedTabContent({ 
  title, 
  description = "Sign the NDA to unlock project information", 
  isAuthenticated, 
  onAction,
  actionLabel
}: LockedTabContentProps) {
  const defaultActionLabel = isAuthenticated ? "Sign NDA to unlock" : "Sign in to continue";

  return (
    <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-4">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>

      {/* Content Area with Blur/Skeleton Effect */}
      <div className="p-6 sm:p-8 relative min-h-[300px]">
        {/* Blurred Content Placeholder */}
        <div className="space-y-6 opacity-40 blur-[2px] select-none pointer-events-none" aria-hidden="true">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-32 bg-slate-100 rounded-lg border border-slate-200 w-full mt-6"></div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="h-24 bg-slate-100 rounded-lg border border-slate-200"></div>
            <div className="h-24 bg-slate-100 rounded-lg border border-slate-200"></div>
          </div>
        </div>

        {/* Locked Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/60 backdrop-blur-[1px] z-10 p-6 text-center">
          <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Lock className="h-6 w-6 text-slate-500" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">
            {isAuthenticated ? "Confidential Information" : "Sign in to view details"}
          </h4>
          <p className="text-slate-500 max-w-md mb-6">
            {description}
          </p>
          <Button 
            onClick={onAction} 
            className={cn(
              "gap-2 shadow-sm font-medium px-6",
              isAuthenticated ? "bg-brand-orange hover:bg-brand-orange/90" : "bg-slate-900 hover:bg-slate-800"
            )}
          >
            <Lock className="h-4 w-4" /> {actionLabel || defaultActionLabel}
          </Button>
          
          {isAuthenticated && (
            <p className="text-xs text-slate-400 mt-4">
              This information is protected by a Non-Disclosure Agreement.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
