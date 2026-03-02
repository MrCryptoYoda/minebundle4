import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfileStore } from '@/store/profileStore';
import { Check } from 'lucide-react';

const SERVICE_CATEGORIES = [
  'Drilling', 'Engineering', 'Geophysics', 'Geology', 
  'Environmental', 'Construction', 'Mining Services', 
  'Maintenance', 'Logistics', 'Consulting', 'Legal', 
  'HR', 'IT', 'Finance', 'Camp Services', 'Water', 
  'Power', 'Safety', 'Training', 'Laboratory'
];

export function Step2Services() {
  const { 
    serviceCategories, serviceDifferentiators, 
    updateField 
  } = useProfileStore();

  const toggleCategory = (category: string) => {
    if (serviceCategories.includes(category)) {
      updateField('serviceCategories', serviceCategories.filter(c => c !== category));
    } else {
      updateField('serviceCategories', [...serviceCategories, category]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Select Service Categories</Label>
        <p className="text-sm text-slate-400">Choose the primary services your company offers. This helps us match you with relevant leads.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SERVICE_CATEGORIES.map((category) => {
            const isSelected = serviceCategories.includes(category);
            return (
              <div 
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  cursor-pointer rounded-xl border p-3 flex items-center justify-between transition-all
                  ${isSelected 
                    ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' 
                    : 'bg-[#13131A] border-slate-700 text-slate-300 hover:border-slate-500'}
                `}
              >
                <span className="text-sm font-medium">{category}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="differentiators" className="text-lg font-semibold text-white">Key Differentiators</Label>
        <p className="text-sm text-slate-400 mb-2">What sets your services apart from competitors?</p>
        <Textarea 
          id="differentiators" 
          value={serviceDifferentiators} 
          onChange={(e) => updateField('serviceDifferentiators', e.target.value)}
          className="bg-[#13131A] border-slate-700 text-white min-h-[120px]"
          placeholder="e.g. Proprietary technology, 24/7 support, specialized equipment..."
        />
      </div>
    </div>
  );
}
