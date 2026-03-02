import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CoverageMap } from './CoverageMap';
import { Map, List, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const COUNTRIES = ['Australia', 'Canada', 'USA', 'South Africa', 'Chile', 'Peru', 'Brazil', 'China', 'Indonesia'];

export function SectionDCoverage() {
  const { 
    coverageMode, coverageCountries, coverageNotes, serviceRadius, mobilizationDays, remoteWork,
    updateField 
  } = useProfileStore();

  const toggleCountry = (country: string) => {
    if (coverageCountries.includes(country)) {
      updateField('coverageCountries', coverageCountries.filter(c => c !== country));
    } else {
      updateField('coverageCountries', [...coverageCountries, country]);
    }
  };

  // Map simplified regions to countries for the demo
  const handleMapToggle = (region: string) => {
    // In a real app, this would map regions to specific countries or be a region selection itself
    // For this demo, we'll treat the map regions as the "countries" list for simplicity
    toggleCountry(region);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Coverage & Geography</h2>
        <p className="text-slate-400 text-sm">Define where you operate to get matched with local opportunities.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base text-white">Coverage Areas *</CardTitle>
            <CardDescription>Select the regions where you can deliver services.</CardDescription>
          </div>
          <Tabs value={coverageMode} onValueChange={(v) => updateField('coverageMode', v as 'list' | 'map')} className="w-auto">
            <TabsList className="bg-[#13131A] border border-slate-700">
              <TabsTrigger value="list" className="gap-2 data-[state=active]:bg-slate-700">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2 data-[state=active]:bg-slate-700">
                <Map className="h-4 w-4" />
                Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {coverageMode === 'map' ? (
            <CoverageMap 
              selectedRegions={coverageCountries} 
              onToggleRegion={handleMapToggle} 
            />
          ) : (
            <div className="space-y-4">
              <Label>Select Countries/Regions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Australia'].map((country) => (
                  <Button
                    key={country}
                    variant="outline"
                    className={`justify-start ${coverageCountries.includes(country) ? 'border-brand-orange text-brand-orange bg-brand-orange/10' : 'border-slate-700 bg-[#13131A] text-slate-300'}`}
                    onClick={() => toggleCountry(country)}
                  >
                    {country}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Chips */}
          {coverageCountries.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-[#13131A] rounded-lg border border-slate-800">
              <span className="text-sm text-slate-500 py-1 mr-2">Selected:</span>
              {coverageCountries.map(country => (
                <Badge key={country} variant="secondary" className="bg-slate-800 text-slate-300 gap-1 pl-2 pr-1">
                  {country}
                  <button onClick={() => toggleCountry(country)} className="hover:text-white rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs text-slate-500 hover:text-red-400"
                onClick={() => updateField('coverageCountries', [])}
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Preview Action */}
          <div className="flex justify-end">
            <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
              <Link to="/insights/leads" state={{ applyCoverage: true }}>
                Preview leads in my coverage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Logistics & Constraints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="radius">Service Radius / Travel Willingness</Label>
              <Select value={serviceRadius} onValueChange={(v) => updateField('serviceRadius', v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue placeholder="Select Radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Local">Local Only</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobilization">Mobilization Time (Days)</Label>
              <Input 
                id="mobilization" 
                type="number"
                value={mobilizationDays}
                onChange={(e) => updateField('mobilizationDays', e.target.value)}
                placeholder="e.g. 14"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">Remote Work Capability</Label>
              <p className="text-sm text-slate-500">Can your services be delivered remotely?</p>
            </div>
            <Switch 
              checked={remoteWork}
              onCheckedChange={(v) => updateField('remoteWork', v)}
              className="data-[state=checked]:bg-brand-orange"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Coverage Notes</Label>
            <Textarea 
              id="notes" 
              value={coverageNotes}
              onChange={(e) => updateField('coverageNotes', e.target.value)}
              placeholder="Add details about your logistics, bases of operation, or travel restrictions..."
              className="bg-[#13131A] border-slate-700 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
