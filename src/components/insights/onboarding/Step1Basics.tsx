import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfileStore } from '@/store/profileStore';

export function Step1Basics() {
  const { 
    companyName, website, hqCountry, description, 
    updateField 
  } = useProfileStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-slate-200">Company Name</Label>
          <Input 
            id="companyName" 
            value={companyName} 
            onChange={(e) => updateField('companyName', e.target.value)}
            className="bg-[#13131A] border-slate-700 text-white"
            placeholder="e.g. Acme Drilling Co."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website" className="text-slate-200">Website</Label>
          <Input 
            id="website" 
            value={website} 
            onChange={(e) => updateField('website', e.target.value)}
            className="bg-[#13131A] border-slate-700 text-white"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hqCountry" className="text-slate-200">HQ Country</Label>
        <Input 
          id="hqCountry" 
          value={hqCountry} 
          onChange={(e) => updateField('hqCountry', e.target.value)}
          className="bg-[#13131A] border-slate-700 text-white"
          placeholder="e.g. Australia"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-200">Company Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => updateField('description', e.target.value)}
          className="bg-[#13131A] border-slate-700 text-white min-h-[150px]"
          placeholder="Tell us about your company, your expertise, and what makes you unique..."
        />
        <p className="text-xs text-slate-500">This will be visible to project owners.</p>
      </div>
    </div>
  );
}
