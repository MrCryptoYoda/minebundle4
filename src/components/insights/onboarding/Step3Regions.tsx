import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useProfileStore } from '@/store/profileStore';
import { Check } from 'lucide-react';

const COMMODITIES = [
  'Gold', 'Copper', 'Lithium', 'Nickel', 'Iron Ore', 
  'Coal', 'Uranium', 'Rare Earths', 'Zinc', 'Silver', 
  'PGM', 'Cobalt', 'Potash', 'Graphite'
];

export function Step3Regions() {
  const { 
    coverageCountries, commodities, 
    updateField 
  } = useProfileStore();

  const toggleCommodity = (commodity: string) => {
    if (commodities.includes(commodity)) {
      updateField('commodities', commodities.filter(c => c !== commodity));
    } else {
      updateField('commodities', [...commodities, commodity]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Regions of Operation</Label>
        <p className="text-sm text-slate-400">Where are you able to deploy your services?</p>
        
        <div className="space-y-2">
          <Label htmlFor="countries" className="text-slate-200">Countries</Label>
          <Input 
            id="countries" 
            value={coverageCountries.join(', ')} 
            onChange={(e) => updateField('coverageCountries', e.target.value.split(',').map(s => s.trim()))}
            className="bg-[#13131A] border-slate-700 text-white"
            placeholder="e.g. Australia, Canada, USA (comma separated)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Target Commodities</Label>
        <p className="text-sm text-slate-400">Which commodities are most relevant to your business?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMMODITIES.map((commodity) => {
            const isSelected = commodities.includes(commodity);
            return (
              <div 
                key={commodity}
                onClick={() => toggleCommodity(commodity)}
                className={`
                  cursor-pointer rounded-xl border p-3 flex items-center justify-between transition-all
                  ${isSelected 
                    ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' 
                    : 'bg-[#13131A] border-slate-700 text-slate-300 hover:border-slate-500'}
                `}
              >
                <span className="text-sm font-medium">{commodity}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
