import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { COMMODITY_TAXONOMY } from '@/data/commodityTaxonomy';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function SectionCCommodities() {
  const { 
    commodities, commoditySectors,
    updateField 
  } = useProfileStore();

  const toggleCommodity = (commodityId: string, sectorId: string) => {
    let newCommodities = [...commodities];
    let newSectors = [...commoditySectors];

    if (newCommodities.includes(commodityId)) {
      newCommodities = newCommodities.filter(c => c !== commodityId);
    } else {
      newCommodities.push(commodityId);
    }

    // Auto-update sectors based on selected commodities
    // If any commodity in a sector is selected, the sector is selected
    const sectorHasCommodity = COMMODITY_TAXONOMY.find(s => s.id === sectorId)?.commodities.some(c => newCommodities.includes(c.id));
    
    if (sectorHasCommodity && !newSectors.includes(sectorId)) {
      newSectors.push(sectorId);
    } else if (!sectorHasCommodity && newSectors.includes(sectorId)) {
      newSectors = newSectors.filter(s => s !== sectorId);
    }

    updateField('commodities', newCommodities);
    updateField('commoditySectors', newSectors);
  };

  const toggleSector = (sectorId: string) => {
    const sector = COMMODITY_TAXONOMY.find(s => s.id === sectorId);
    if (!sector) return;

    const allSectorCommodityIds = sector.commodities.map(c => c.id);
    const isFullySelected = allSectorCommodityIds.every(id => commodities.includes(id));

    let newCommodities = [...commodities];
    let newSectors = [...commoditySectors];

    if (isFullySelected) {
      // Deselect all
      newCommodities = newCommodities.filter(id => !allSectorCommodityIds.includes(id));
      newSectors = newSectors.filter(id => id !== sectorId);
    } else {
      // Select all
      newCommodities = [...new Set([...newCommodities, ...allSectorCommodityIds])];
      if (!newSectors.includes(sectorId)) newSectors.push(sectorId);
    }

    updateField('commodities', newCommodities);
    updateField('commoditySectors', newSectors);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Commodities Supported</h2>
        <p className="text-slate-400 text-sm">Select the commodities your services are applicable to.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Commodity Sectors & Specifics *</CardTitle>
          <CardDescription>Select sectors to expand and choose specific commodities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-4">
            {COMMODITY_TAXONOMY.map((sector) => {
              const selectedCount = sector.commodities.filter(c => commodities.includes(c.id)).length;
              const isSectorActive = commoditySectors.includes(sector.id);

              return (
                <AccordionItem key={sector.id} value={sector.id} className="border border-slate-700 rounded-lg bg-[#13131A] px-4">
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox 
                        checked={isSectorActive}
                        onCheckedChange={() => toggleSector(sector.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                      />
                      <AccordionTrigger className="hover:no-underline py-0 flex-1 text-sm font-medium text-slate-200">
                        {sector.name}
                      </AccordionTrigger>
                    </div>
                    {selectedCount > 0 && (
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 mr-4">
                        {selectedCount} selected
                      </Badge>
                    )}
                  </div>
                  <AccordionContent className="pt-0 pb-4 pl-9">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {sector.commodities.map((commodity) => (
                        <div 
                          key={commodity.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox 
                            id={commodity.id}
                            checked={commodities.includes(commodity.id)}
                            onCheckedChange={() => toggleCommodity(commodity.id, sector.id)}
                            className="border-slate-600 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                          />
                          <Label 
                            htmlFor={commodity.id}
                            className="text-sm text-slate-400 font-normal cursor-pointer hover:text-white"
                          >
                            {commodity.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
