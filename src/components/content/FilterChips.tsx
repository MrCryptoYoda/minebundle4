
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterChipsProps {
  categories: string[]
  selected: string[]
  onToggle: (category: string) => void
  onClear: () => void
  className?: string
}

export function FilterChips({ categories, selected, onToggle, onClear, className }: FilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {categories.map(cat => (
        <Badge
          key={cat}
          variant={selected.includes(cat) ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-3 py-1.5 text-sm font-medium transition-colors",
            selected.includes(cat) 
              ? "bg-brand-orange hover:bg-brand-orange/90 text-white border-transparent" 
              : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
          )}
          onClick={() => onToggle(cat)}
        >
          {cat}
        </Badge>
      ))}
      {selected.length > 0 && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={onClear}
          className="text-slate-500 hover:text-brand-orange h-auto p-0 ml-2"
        >
          Clear filters
        </Button>
      )}
    </div>
  )
}
