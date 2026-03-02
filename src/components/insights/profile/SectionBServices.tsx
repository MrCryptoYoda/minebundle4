import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { MARKETPLACE_CATEGORIES } from '@/data/marketplaceData';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SectionBServices() {
  const { 
    serviceCategories, capabilityTags, serviceDifferentiators,
    updateField 
  } = useProfileStore();

  const [newTag, setNewTag] = React.useState('');

  const toggleCategory = (categoryName: string) => {
    if (serviceCategories.includes(categoryName)) {
      updateField('serviceCategories', serviceCategories.filter(c => c !== categoryName));
    } else {
      updateField('serviceCategories', [...serviceCategories, categoryName]);
    }
  };

  const addTag = () => {
    if (newTag && !capabilityTags.includes(newTag)) {
      updateField('capabilityTags', [...capabilityTags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    updateField('capabilityTags', capabilityTags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Service Categories & Capabilities</h2>
        <p className="text-slate-400 text-sm">Define what services you offer to match with relevant project needs.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Service Categories *</CardTitle>
          <CardDescription>Select all categories that apply to your business.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKETPLACE_CATEGORIES.map((category) => (
              <div 
                key={category.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                  serviceCategories.includes(category.name) 
                    ? 'bg-brand-orange/10 border-brand-orange/30' 
                    : 'bg-[#13131A] border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => toggleCategory(category.name)}
              >
                <Checkbox 
                  checked={serviceCategories.includes(category.name)}
                  onCheckedChange={() => toggleCategory(category.name)}
                  className="mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-slate-200 cursor-pointer">{category.name}</Label>
                  <p className="text-xs text-slate-500 leading-snug">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Capabilities & Differentiators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Capability Tags</Label>
            <div className="flex gap-2">
              <Input 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add specialized capabilities (e.g. 'Deep Drilling', 'Arctic Logistics')"
                className="bg-[#13131A] border-slate-700"
              />
              <Button onClick={addTag} size="icon" className="shrink-0 bg-slate-700 hover:bg-slate-600">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
              {capabilityTags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 gap-1 pl-2 pr-1 py-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-white rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {capabilityTags.length === 0 && (
                <span className="text-xs text-slate-500 italic">No tags added yet.</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="differentiators">Service Differentiators</Label>
            <Textarea 
              id="differentiators" 
              value={serviceDifferentiators}
              onChange={(e) => updateField('serviceDifferentiators', e.target.value)}
              placeholder="What makes your services unique? List key strengths, proprietary technology, or specialized equipment..."
              className="bg-[#13131A] border-slate-700 min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
