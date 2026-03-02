import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MarketplaceHeroSearchProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
}

export function MarketplaceHeroSearch({ onSearch, onFilterClick }: MarketplaceHeroSearchProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-full bg-white shadow-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-brand-orange/50 transition-all">
        <div className="pl-6 pr-2 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <Input 
          className="flex-1 border-0 bg-transparent h-full text-base placeholder:text-slate-400 focus-visible:ring-0 px-2"
          placeholder="Search services, providers, projects or location"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <div className="pr-2 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 gap-2 hidden sm:flex"
            onClick={onFilterClick}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button 
            size="sm" 
            className="h-10 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white px-6 font-medium"
          >
            Search
          </Button>
        </div>
      </div>
      
      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-sm text-slate-400 mr-1">Try:</span>
        <Badge variant="secondary" className="bg-white/10 text-slate-300 hover:bg-white/20 border-white/20 cursor-pointer font-normal">
          Drilling contractors WA
        </Badge>
        <Badge variant="secondary" className="bg-white/10 text-slate-300 hover:bg-white/20 border-white/20 cursor-pointer font-normal">
          Geology consulting Canada
        </Badge>
        <Badge variant="secondary" className="bg-white/10 text-slate-300 hover:bg-white/20 border-white/20 cursor-pointer font-normal">
          ESG compliance audit
        </Badge>
      </div>
    </div>
  );
}
