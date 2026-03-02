import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  ChevronDown, 
  X, 
  Calendar, 
  Globe, 
  Pickaxe, 
  Layers, 
  Briefcase, 
  Building2 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterBarProps {
  onOpenAdvanced: () => void;
}

export function FilterBar({ onOpenAdvanced }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = React.useState<string[]>(['Status: New', 'Region: WA']);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {/* Advanced Filters Trigger */}
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-2 border-dashed border-slate-700 text-slate-400 hover:border-brand-orange hover:text-brand-orange bg-transparent"
          onClick={onOpenAdvanced}
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </Button>

        <div className="h-6 w-px bg-slate-800 mx-2" />

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Status
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Lead Status</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem checked className="focus:bg-slate-800 focus:text-white">New</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Contacted</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Snoozed</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Region Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Region
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Region</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem checked className="focus:bg-slate-800 focus:text-white">Western Australia</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Queensland</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">South Australia</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Northern Territory</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Canada</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">USA</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Africa</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">South America</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Commodity Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Commodity
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Commodity</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Gold</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Copper</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Lithium</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Nickel</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Iron Ore</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Rare Earths</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Uranium</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Stage Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Stage
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Project Stage</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Exploration</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Scoping / PFS</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">DFS / BFS</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Development</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Production</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Care & Maintenance</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Service Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Service Category
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Service Category</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Drilling</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Engineering</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Environmental</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Construction</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Mining Services</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Consulting</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Legal</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Logistics</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Time Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Time Range
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Posted Within</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Last 24 Hours</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Last 7 Days</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Last 30 Days</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Last 90 Days</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">Custom Range...</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

         {/* Source Exchange Filter */}
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-300 font-normal bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full px-3">
              Exchange
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-[#1C1C24] border-slate-800 text-slate-300">
            <DropdownMenuLabel className="text-white">Source Exchange</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">ASX</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">TSX</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">TSX-V</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">LSE</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="focus:bg-slate-800 focus:text-white">NYSE</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary" 
              className="h-7 px-2 gap-1 bg-[#2D2D35] text-slate-300 hover:bg-slate-700 border border-slate-700 font-normal"
            >
              {filter}
              <button 
                onClick={() => removeFilter(filter)}
                className="hover:bg-slate-600 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-slate-500 hover:text-red-400 hover:bg-transparent"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
