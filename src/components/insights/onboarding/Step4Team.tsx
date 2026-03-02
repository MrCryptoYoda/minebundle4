import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfileStore } from '@/store/profileStore';

export function Step4Team() {
  const { 
    teamSize, contactEmail, contactPhone, 
    updateField 
  } = useProfileStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Team Size & Structure</Label>
        <p className="text-sm text-slate-400">Help us understand your capacity.</p>
        
        <div className="space-y-2">
          <Label htmlFor="teamSize" className="text-slate-200">Number of Employees</Label>
          <Select 
            value={teamSize} 
            onValueChange={(value) => updateField('teamSize', value)}
          >
            <SelectTrigger className="bg-[#13131A] border-slate-700 text-white">
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C24] border-slate-800 text-white">
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="500+">500+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <Label className="text-lg font-semibold text-white">Primary Contact</Label>
        <p className="text-sm text-slate-400">Who should we contact for new opportunities?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-slate-200">Email Address</Label>
            <Input 
              id="contactEmail" 
              type="email"
              value={contactEmail} 
              onChange={(e) => updateField('contactEmail', e.target.value)}
              className="bg-[#13131A] border-slate-700 text-white"
              placeholder="e.g. sales@acme.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-slate-200">Phone Number</Label>
            <Input 
              id="contactPhone" 
              type="tel"
              value={contactPhone} 
              onChange={(e) => updateField('contactPhone', e.target.value)}
              className="bg-[#13131A] border-slate-700 text-white"
              placeholder="e.g. +61 400 000 000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
