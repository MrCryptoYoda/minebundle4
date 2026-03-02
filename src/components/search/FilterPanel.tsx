import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-1 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="font-semibold text-slate-900 text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
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

interface FilterPanelProps {
  activeFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

export function FilterPanel({ activeFilters, onFilterChange, onReset, className }: FilterPanelProps & { className?: string }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    type: true,
    commodity: true,
    location: true,
    stage: false,
    intention: false,
    price: false,
    standard: false,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const allCommodities = React.useMemo(() => 
    COMMODITY_TAXONOMY.flatMap(s => s.commodities).sort((a, b) => a.name.localeCompare(b.name)),
  []);

  const allCountries = React.useMemo(() => 
    LOCATION_TAXONOMY.flatMap(r => r.countries).sort((a, b) => a.name.localeCompare(b.name)),
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
      "bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent",
      className
    )}>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h2 className="font-bold text-slate-900">Filters</h2>
        <button 
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-brand-orange transition-colors"
        >
          Reset all
        </button>
      </div>

      <div className="p-4 pt-0">
        {/* Group A - Listing Type */}
        <FilterGroup 
          title="Listing Type" 
          isOpen={openGroups.type} 
          onToggle={() => toggleGroup('type')}
        >
          {['Mining Project', 'Renewable Asset', 'Claim', 'Royalty Asset', 'Offtake'].map(type => (
            <label 
              key={type} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('type', type)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.type || []).includes(type) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-300 group-hover:border-brand-orange"
              )}>
                {(activeFilters.type || []).includes(type) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{type}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Group B - Commodity Sector */}
        <FilterGroup 
          title="Commodity Sector" 
          isOpen={openGroups.sector} 
          onToggle={() => toggleGroup('sector')}
        >
          {COMMODITY_TAXONOMY.map(sector => (
            <label 
              key={sector.id} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('sector', sector.id)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.sector || []).includes(sector.id) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-300 group-hover:border-brand-orange"
              )}>
                {(activeFilters.sector || []).includes(sector.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{sector.name}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Group C - Individual Commodities */}
        <FilterGroup 
          title="Commodities" 
          isOpen={openGroups.commodity} 
          onToggle={() => toggleGroup('commodity')}
        >
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input 
              placeholder="Search commodities..." 
              className="pl-8 h-8 text-xs bg-slate-50 border-slate-200" 
            />
          </div>
          <div className="max-h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
            {allCommodities.map(commodity => (
              <label 
                key={commodity.id} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleCheckboxChange('commodity', commodity.id)}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  (activeFilters.commodity || []).includes(commodity.id) 
                    ? "bg-brand-orange border-brand-orange" 
                    : "border-slate-300 group-hover:border-brand-orange"
                )}>
                  {(activeFilters.commodity || []).includes(commodity.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{commodity.name}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Group D - Location */}
        <FilterGroup 
          title="Location" 
          isOpen={openGroups.location} 
          onToggle={() => toggleGroup('location')}
        >
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input 
              placeholder="Search country or region..." 
              className="pl-8 h-8 text-xs bg-slate-50 border-slate-200" 
            />
          </div>
          <div className="max-h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
            {allCountries.map(country => (
              <label 
                key={country.name} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleCheckboxChange('location', country.name)}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  (activeFilters.location || []).includes(country.name) 
                    ? "bg-brand-orange border-brand-orange" 
                    : "border-slate-300 group-hover:border-brand-orange"
                )}>
                  {(activeFilters.location || []).includes(country.name) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{country.name}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Group E - Project Stage */}
        <FilterGroup 
          title="Project Stage" 
          isOpen={openGroups.stage} 
          onToggle={() => toggleGroup('stage')}
        >
          {['Early Exploration', 'Advanced Exploration', 'Development', 'Production', 'Care & Maintenance'].map(stage => (
            <label 
              key={stage} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('stage', stage)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.stage || []).includes(stage) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-300 group-hover:border-brand-orange"
              )}>
                {(activeFilters.stage || []).includes(stage) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{stage}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Group F - Intention */}
        <FilterGroup 
          title="Intention" 
          isOpen={openGroups.intention} 
          onToggle={() => toggleGroup('intention')}
        >
          {['Farm in/out', 'Lease', 'Direct Sale', 'Option', 'Joint Venture', 'All Offers'].map(intention => (
            <label 
              key={intention} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('intention', intention)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.intention || []).includes(intention) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-300 group-hover:border-brand-orange"
              )}>
                {(activeFilters.intention || []).includes(intention) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{intention}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Group G - Price Range */}
        <FilterGroup 
          title="Price Range" 
          isOpen={openGroups.price} 
          onToggle={() => toggleGroup('price')}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Min" className="h-8 text-xs" />
              <span className="text-slate-400">-</span>
              <Input placeholder="Max" className="h-8 text-xs" />
            </div>
            <label 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                 onFilterChange('poa', !activeFilters.poa);
              }}
            >
              <div className={cn(
                "w-9 h-5 rounded-full relative transition-colors",
                activeFilters.poa ? "bg-brand-orange" : "bg-slate-200"
              )}>
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                  activeFilters.poa ? "left-4.5" : "left-0.5"
                )} />
              </div>
              <span className="text-sm text-slate-600">Include POA</span>
            </label>
          </div>
        </FilterGroup>

        {/* Group H - Resource Standard */}
        <FilterGroup 
          title="Resource Standard" 
          isOpen={openGroups.standard} 
          onToggle={() => toggleGroup('standard')}
        >
          {['JORC', 'NI 43-101', 'N/A'].map(standard => (
            <label 
              key={standard} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleCheckboxChange('standard', standard)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                (activeFilters.standard || []).includes(standard) 
                  ? "bg-brand-orange border-brand-orange" 
                  : "border-slate-300 group-hover:border-brand-orange"
              )}>
                {(activeFilters.standard || []).includes(standard) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{standard}</span>
            </label>
          ))}
        </FilterGroup>
      </div>
    </div>
  );
}
