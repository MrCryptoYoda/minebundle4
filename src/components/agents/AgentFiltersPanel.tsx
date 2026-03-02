
import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface AgentFiltersPanelProps {
  filters: {
    regions: string[]
    commodities: string[]
    verified: boolean
  }
  onFilterChange: (key: string, value: any) => void
  onClearAll: () => void
  className?: string
}

export function AgentFiltersPanel({ filters, onFilterChange, onClearAll, className }: AgentFiltersPanelProps) {
  const regions = ["Australia", "North America", "South America", "Africa", "Europe", "Asia"]
  const commodities = ["Gold", "Copper", "Lithium", "Silver", "Zinc", "Rare Earths"]

  const toggleArrayFilter = (key: 'regions' | 'commodities', value: string) => {
    const current = filters[key]
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    onFilterChange(key, updated)
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearAll} className="text-slate-500 h-auto p-0 hover:bg-transparent hover:text-brand-orange">
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["regions", "commodities", "verification"]} className="w-full">
        
        {/* Verification */}
        <AccordionItem value="verification" className="border-b border-slate-200">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">Verification</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 py-1">
              <Checkbox 
                id="verified" 
                checked={filters.verified}
                onCheckedChange={(c) => onFilterChange('verified', c as boolean)}
              />
              <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">Verified Agents Only</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Regions */}
        <AccordionItem value="regions" className="border-b border-slate-200">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">Regions Served</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {regions.map(region => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`region-${region}`} 
                    checked={filters.regions.includes(region)}
                    onCheckedChange={() => toggleArrayFilter('regions', region)}
                  />
                  <Label htmlFor={`region-${region}`} className="text-sm font-normal cursor-pointer">{region}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Commodities */}
        <AccordionItem value="commodities" className="border-b border-slate-200">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">Specialties</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {commodities.map(comm => (
                <div key={comm} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`comm-${comm}`} 
                    checked={filters.commodities.includes(comm)}
                    onCheckedChange={() => toggleArrayFilter('commodities', comm)}
                  />
                  <Label htmlFor={`comm-${comm}`} className="text-sm font-normal cursor-pointer">{comm}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
