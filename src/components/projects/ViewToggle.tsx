import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
  className?: string;
}

export function ViewToggle({ viewMode, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('grid')}
        className={cn(
          "h-8 w-8 p-0 rounded-md transition-all",
          viewMode === 'grid' 
            ? "bg-white text-slate-900 shadow-sm" 
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Grid View</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('list')}
        className={cn(
          "h-8 w-8 p-0 rounded-md transition-all",
          viewMode === 'list' 
            ? "bg-white text-slate-900 shadow-sm" 
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
        )}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List View</span>
      </Button>
    </div>
  );
}
