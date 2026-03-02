import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActiveFiltersRowProps {
  activeFilters: Record<string, any>;
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
  onSaveSearch: () => void;
}

export function ActiveFiltersRow({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  onSaveSearch,
}: ActiveFiltersRowProps) {
  if (Object.keys(activeFilters).length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      {Object.entries(activeFilters).map(([key, value]) => (
        <Badge
          key={key}
          variant="secondary"
          className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer whitespace-nowrap border border-slate-200 px-3 py-1.5 rounded-full text-sm font-medium transition-colors group"
          onClick={() => onRemoveFilter(key)}
        >
          <span className="capitalize text-slate-500 mr-1">{key}:</span>
          <span className="text-slate-900 font-semibold">{value}</span>
          <X className="ml-2 h-3 w-3 text-slate-400 group-hover:text-red-500 transition-colors" />
        </Badge>
      ))}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearAll}
        className="text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-medium h-8 px-3 rounded-full transition-colors"
      >
        Clear all
      </Button>
      
      <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block" />
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onSaveSearch}
        className="text-brand-orange hover:text-brand-orange/80 hover:bg-brand-orange/5 text-xs font-medium h-8 px-3 rounded-full transition-colors hidden md:flex items-center gap-1.5"
      >
        <Save className="h-3.5 w-3.5" />
        Save search
      </Button>
    </div>
  );
}
