import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FilterDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDrawer({ isOpen, onOpenChange }: FilterDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your search results.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 py-4">
          <div className="space-y-6">
            {/* Regions */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-slate-900">Regions Served</h4>
              <div className="grid gap-2">
                {['Australia', 'Africa', 'North America', 'South America', 'Asia', 'Europe'].map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox id={`region-${region}`} />
                    <Label htmlFor={`region-${region}`} className="text-sm font-normal text-slate-600 cursor-pointer">
                      {region}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Commodities */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-slate-900">Commodities</h4>
              <div className="grid gap-2">
                {['Gold', 'Copper', 'Lithium', 'Iron Ore', 'Coal', 'Nickel', 'Zinc'].map((commodity) => (
                  <div key={commodity} className="flex items-center space-x-2">
                    <Checkbox id={`comm-${commodity}`} />
                    <Label htmlFor={`comm-${commodity}`} className="text-sm font-normal text-slate-600 cursor-pointer">
                      {commodity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Provider Type */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-slate-900">Provider Type</h4>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-company" />
                  <Label htmlFor="type-company" className="text-sm font-normal text-slate-600 cursor-pointer">Company</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-independent" />
                  <Label htmlFor="type-independent" className="text-sm font-normal text-slate-600 cursor-pointer">Independent Consultant</Label>
                </div>
              </div>
            </div>
            
            <Separator />

            {/* Verification */}
            <div className="flex items-center justify-between">
              <Label htmlFor="verified-only" className="text-sm font-medium text-slate-900">Verified Providers Only</Label>
              <Checkbox id="verified-only" />
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="pt-4 border-t border-slate-100 flex-col sm:flex-row gap-2">
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
          </SheetClose>
          <Button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
