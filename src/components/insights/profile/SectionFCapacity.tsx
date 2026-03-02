import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SectionFCapacity() {
  const { maxProjectValue, teamSize, updateField } = useProfileStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Capacity & Scale</h2>
        <p className="text-slate-400 text-sm">Define your operational capacity to get matched with right-sized projects.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Operational Capacity</CardTitle>
          <CardDescription>What scale of projects can you handle?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxVal">Maximum Project Value (USD)</Label>
              <Select value={maxProjectValue} onValueChange={(v) => updateField('maxProjectValue', v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue placeholder="Select Value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<100k">Under $100k</SelectItem>
                  <SelectItem value="100k-500k">$100k - $500k</SelectItem>
                  <SelectItem value="500k-1M">$500k - $1M</SelectItem>
                  <SelectItem value="1M-5M">$1M - $5M</SelectItem>
                  <SelectItem value="5M-20M">$5M - $20M</SelectItem>
                  <SelectItem value="20M+">$20M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Available Team Size</Label>
              <Input 
                id="teamSize" 
                type="number"
                value={teamSize}
                onChange={(e) => updateField('teamSize', e.target.value)}
                placeholder="e.g. 50"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
