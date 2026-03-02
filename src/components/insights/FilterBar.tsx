import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  className?: string;
}

export function FilterBar({ className }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = React.useState<string[]>(['Region: WA', 'Commodity: Gold'])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter))
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Filter Buttons Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button variant="outline" size="sm" className="h-9 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium shadow-sm shrink-0">
          <Filter className="h-3.5 w-3.5 mr-2 text-slate-500" />
          All Filters
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {['Status', 'Region', 'Commodity', 'Stage', 'Service Category', 'Time Range', 'Source'].map((label) => (
          <Button 
            key={label} 
            variant="ghost" 
            size="sm" 
            className="h-9 rounded-full px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium whitespace-nowrap shrink-0"
          >
            {label} <ChevronDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
          </Button>
        ))}
      </div>

      {/* Active Chips Row */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-1">Active:</span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary" 
              className="h-7 px-3 rounded-full bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 border-0 flex items-center gap-1.5 transition-colors"
            >
              {filter}
              <button onClick={() => removeFilter(filter)} className="hover:bg-brand-orange/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-slate-500 hover:text-slate-900 px-2"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
