import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, LayoutGrid, List as ListIcon, Save, X, Filter, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  onSaveSearch: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onMobileFilterOpen?: () => void;
}

export function SearchHeader({
  query,
  onQueryChange,
  onSearch,
  viewMode,
  onViewModeChange,
  onSaveSearch,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
}: SearchHeaderProps) {
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  // Simulate query interpretation
  useEffect(() => {
    if (!query) {
      setInterpretation(null);
      setIsInterpreting(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsInterpreting(true);
      // Mock interpretation delay
      setTimeout(() => {
        setIsInterpreting(false);
        setInterpretation(`Interpreted as: Projects matching "${query}"`);
      }, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Row: Search Input & Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input Area */}
            <div className="relative w-full md:max-w-2xl flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
                <Input
                  placeholder="Try 'Copper projects in Chile under $50M' or 'High-grade gold exploration'"
                  className="pl-12 h-12 text-lg bg-slate-50 border-slate-200 focus-visible:ring-brand-orange rounded-full shadow-sm transition-all hover:bg-slate-100 focus:bg-white"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />
              </div>
              
              {/* Interpretation Indicator */}
              <div className="absolute top-full left-0 mt-2 pl-4 h-6">
                <AnimatePresence mode="wait">
                  {isInterpreting ? (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="flex items-center gap-2 text-xs text-brand-orange font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                      Interpreting your query...
                    </motion.div>
                  ) : interpretation ? (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="flex items-center gap-2 text-xs text-slate-500"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {interpretation}
                      <button className="text-brand-orange hover:underline ml-1 font-medium">Edit</button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto ml-auto">
              {/* Mobile Filter Button */}
              <Button 
                variant="outline" 
                className="lg:hidden h-10 border-slate-200 text-slate-700 gap-2 flex-1 md:flex-none"
                onClick={onMobileFilterOpen}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-slate-200 text-slate-700 gap-2 min-w-[140px] justify-between hidden sm:flex">
                    <span className="truncate">Sort: {sortBy}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {['Relevance', 'Newest', 'Price: Low-High', 'Price: High-Low', 'Stage'].map((option) => (
                    <DropdownMenuItem 
                      key={option}
                      onClick={() => onSortChange(option)}
                      className={cn("cursor-pointer", sortBy === option && "bg-slate-100 font-medium")}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden h-10 bg-white">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    "h-full px-3 flex items-center justify-center transition-colors",
                    viewMode === 'grid' ? "bg-slate-100 text-brand-orange" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <div className="w-px h-full bg-slate-200" />
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    "h-full px-3 flex items-center justify-center transition-colors",
                    viewMode === 'list' ? "bg-slate-100 text-brand-orange" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                  aria-label="List view"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
                <div className="w-px h-full bg-slate-200" />
                <button
                  onClick={() => onViewModeChange('map')}
                  className={cn(
                    "h-full px-3 flex items-center justify-center transition-colors",
                    viewMode === 'map' ? "bg-slate-100 text-brand-orange" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                  aria-label="Map view"
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Save Search Button */}
              <Button 
                onClick={onSaveSearch}
                className="h-10 bg-slate-900 text-white hover:bg-slate-800 gap-2 shadow-sm hidden sm:flex"
              >
                <Save className="h-4 w-4" />
                <span className="hidden lg:inline">Save Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
