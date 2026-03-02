import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, LayoutGrid, List as ListIcon, Filter } from 'lucide-react';
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

interface ServiceSearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onMobileFilterOpen?: () => void;
}

export function ServiceSearchHeader({
  query,
  onQueryChange,
  onSearch,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
}: ServiceSearchHeaderProps) {
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
        setInterpretation(`Interpreted as: Services matching "${query}"`);
      }, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-16 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Row: Search Input & Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input Area */}
            <div className="relative w-full md:max-w-2xl flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-brand-orange transition-colors" />
                <Input
                  placeholder="Search services, providers, or capabilities..."
                  className="pl-12 h-12 text-lg bg-slate-900 border-white/5 focus-visible:ring-brand-orange rounded-full shadow-sm transition-all hover:border-white/10 focus:bg-slate-900 text-white placeholder:text-slate-500"
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
                      className="flex items-center gap-2 text-xs text-slate-400"
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
                className="lg:hidden h-10 border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white gap-2 flex-1 md:flex-none"
                onClick={onMobileFilterOpen}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white gap-2 min-w-[140px] justify-between hidden sm:flex bg-slate-950">
                    <span className="truncate">Sort: {sortBy}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] bg-slate-950 border-white/10 text-slate-300">
                  {['Relevance', 'Newest', 'Rating: High-Low'].map((option) => (
                    <DropdownMenuItem 
                      key={option}
                      onClick={() => onSortChange(option)}
                      className={cn("cursor-pointer focus:bg-slate-900 focus:text-white", sortBy === option && "bg-slate-900 font-medium text-white")}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center border border-white/10 rounded-lg overflow-hidden h-10 bg-slate-950">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    "h-full px-3 flex items-center justify-center transition-colors",
                    viewMode === 'grid' ? "bg-slate-900 text-brand-orange" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <div className="w-px h-full bg-white/5" />
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    "h-full px-3 flex items-center justify-center transition-colors",
                    viewMode === 'list' ? "bg-slate-900 text-brand-orange" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                  )}
                  aria-label="List view"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
