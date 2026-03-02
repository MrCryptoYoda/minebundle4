import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { COMMODITY_TAXONOMY } from '@/data/commodityTaxonomy';
import { LOCATION_TAXONOMY } from '@/data/locationTaxonomy';

interface FilterGroupProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterGroup({ title, isOpen, onToggle, children }: FilterGroupProps) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-1 hover:bg-slate-900 transition-colors text-left"
      >
        <span className="font-semibold text-white text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-1 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ServiceFilterPanelProps {
  activeFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
  className?: string;
}

export function ServiceFilterPanel({ activeFilters, onFilterChange, onReset, className }: ServiceFilterPanelProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    regions: true,
    commodities: true,
    type: true,
    verification: true,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const allCommodities = React.useMemo(() => 
    COMMODITY_TAXONOMY.flatMap(s => s.commodities).sort((a, b) => a.name.localeCompare(b.name)),
  []);

  const allRegions = React.useMemo(() => 
    LOCATION_TAXONOMY.map(r => r.name).sort(),
  []);

  const handleCheckboxChange = (key: string, value: string) => {
    const current = activeFilters[key] || [];
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    
    onFilterChange(key, updated.length > 0 ? updated : undefined);
  };

  return (
    <div className={cn(
      "bg-slate-950 rounded-xl border border-white/5 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent",
      className
    )}>
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950 sticky top-0 z-10">
        <h2 className="font-bold text-white">Filters</h2>
        <button 
          onClick={onReset}
          className="text-xs font-medium text-slate-400 hover:text-brand-orange transition-colors"
        >
          Reset all
        </button>
      </div>

      <div className="p-4 pt-0">
        {/* Group 1 - Regions Served */}
        <FilterGroup 
          title="Regions Served" 
          isOpen={openGroups.regions} 
          onToggle={() => toggleGroup('regions')}
        >
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <Input 
              placeholder="Search regions..." 
              className="pl-8 h-8 text-xs bg-slate-900 border-white/5 text-white placeholder:text-slate-500" 
            />
          </div>
          <div className="max-h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
            {allRegions.map(region => (
              <label 
                key={region} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleCheckboxChange('regions', region)}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  (activeFilters.regions || []).includes(region) 
                    ? "bg-brand-orange border-brand-orange" 
                    : "border-slate-700 group-hover:border-brand-orange"
                )}>
                  {(activeFilters.regions || []).includes(region) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white">{region}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Group 2 - Commodities */}
        <FilterGroup 
          title="Commodities" 
          isOpen={openGroups.commodities} 
          onToggle={() => toggleGroup('commodities')}
        >
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <Input 
              placeholder="Search commodities..." 
              className="pl-8 h-8 text-xs bg-slate-900 border-white/5 text-white placeholder:text-slate-500" 
            />
          </div>
          <div className="max-h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
            {allCommodities.map(commodity => (
              <label 
                key={commodity.id} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleCheckboxChange('commodities', commodity.id)}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  (activeFilters.commodities || []).includes(commodity.id) 
                    ? "bg-brand-orange border-brand-orange" 
                    : "border-slate-700 group-hover:border-brand-orange"
                )}>
                  {(activeFilters.commodities || []).includes(commodity.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white">{commodity.name}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Group 3 - Provider Type */}
        <FilterGroup 
          title="Provider Type" 
          isOpen={openGroups.type} 
          onToggle={() => toggleGroup('type')}
        >
          {['Company', 'Independent Consultant'].map(type => (
            <label 
              key={type} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('type', type)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.type || []).includes(type) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-700 group-hover:border-brand-orange"
              )}>
                {(activeFilters.type || []).includes(type) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white">{type}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Group 4 - Verification */}
        <FilterGroup 
          title="Verification" 
          isOpen={openGroups.verification} 
          onToggle={() => toggleGroup('verification')}
        >
          <label 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
               onFilterChange('verified', !activeFilters.verified);
            }}
          >
            <div className={cn(
              "w-9 h-5 rounded-full relative transition-colors",
              activeFilters.verified ? "bg-brand-orange" : "bg-slate-800"
            )}>
              <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                activeFilters.verified ? "left-4.5" : "left-0.5"
              )} />
            </div>
            <span className="text-sm text-slate-300">Verified Providers Only</span>
          </label>
        </FilterGroup>
      </div>
    </div>
  );
}
