import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoverageMap } from '@/components/insights/profile/CoverageMap';
import { useProfileStore } from '@/store/profileStore';
import { Map, List, X, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  forceApplyCoverage?: boolean;
}

export function FilterDrawer({ open, onClose, forceApplyCoverage }: FilterDrawerProps) {
  const { coverageCountries: profileCoverage } = useProfileStore();
  
  // Local filter state
  const [geoMode, setGeoMode] = useState<'list' | 'map'>('map');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // Effect to handle force apply
  React.useEffect(() => {
    if (forceApplyCoverage && open) {
      const newSelection = [...new Set([...selectedRegions, ...profileCoverage])];
      setSelectedRegions(newSelection);
    }
  }, [forceApplyCoverage, open, profileCoverage]);
  const [fitScore, setFitScore] = useState([70]);
  const [urgency, setUrgency] = useState<string[]>([]);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [docTypes, setDocTypes] = useState<string[]>([]);

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const applyMyCoverage = () => {
    // Merge profile coverage with current selection
    const newSelection = [...new Set([...selectedRegions, ...profileCoverage])];
    setSelectedRegions(newSelection);
  };

  const toggleFilter = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleReset = () => {
    setSelectedRegions([]);
    setFitScore([0]);
    setUrgency([]);
    setReadiness([]);
    setDocTypes([]);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-[#1C1C24] border-l-slate-800 text-white overflow-y-auto p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b border-slate-800 shrink-0">
          <SheetTitle className="text-white">Advanced Filters</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          
          {/* Geography Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-white">Geography</Label>
              <Tabs value={geoMode} onValueChange={(v) => setGeoMode(v as 'list' | 'map')} className="w-auto">
                <TabsList className="bg-[#13131A] border border-slate-700 h-8">
                  <TabsTrigger value="list" className="h-6 text-xs gap-1 data-[state=active]:bg-slate-700">
                    <List className="h-3 w-3" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="map" className="h-6 text-xs gap-1 data-[state=active]:bg-slate-700">
                    <Map className="h-3 w-3" />
                    Map
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">Filter by project location</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={applyMyCoverage}
                disabled={profileCoverage.length === 0}
                className="h-7 text-xs border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Use My Coverage
              </Button>
            </div>

            {profileCoverage.length === 0 && (
              <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-3 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-slate-300 mb-2">
                    You haven't defined your coverage area yet.
                  </p>
                  <Link to="/insights/profile" className="text-xs font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1">
                    Complete coverage in Profile
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}

            {geoMode === 'map' ? (
              <CoverageMap 
                selectedRegions={selectedRegions} 
                onToggleRegion={toggleRegion} 
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Australia'].map((region) => (
                  <Button
                    key={region}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleRegion(region)}
                    className={`justify-start ${selectedRegions.includes(region) ? 'border-brand-orange text-brand-orange bg-brand-orange/10' : 'border-slate-700 bg-[#13131A] text-slate-300'}`}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            )}

            {selectedRegions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedRegions.map(region => (
                  <Badge key={region} variant="secondary" className="bg-slate-800 text-slate-300 gap-1 pl-2 pr-1">
                    {region}
                    <button onClick={() => toggleRegion(region)} className="hover:text-white rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-slate-800" />

          {/* Fit Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-white">Fit Score</Label>
              <span className="text-sm font-mono text-brand-orange">{fitScore[0]}+</span>
            </div>
            <Slider 
              value={fitScore} 
              onValueChange={setFitScore} 
              max={100} 
              step={5}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Any match</span>
              <span>Perfect fit</span>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Urgency */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-white">Urgency</Label>
            <div className="flex flex-wrap gap-2">
              {['Act now', 'Monitor', 'Long horizon'].map(item => (
                <Badge
                  key={item}
                  variant="outline"
                  className={`cursor-pointer px-3 py-1.5 text-sm font-normal ${
                    urgency.includes(item) 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-[#13131A] text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                  onClick={() => toggleFilter(urgency, item, setUrgency)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Procurement Readiness */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-white">Procurement Readiness</Label>
            <div className="flex flex-wrap gap-2">
              {['Now', '30-90 days', '90+ days'].map(item => (
                <Badge
                  key={item}
                  variant="outline"
                  className={`cursor-pointer px-3 py-1.5 text-sm font-normal ${
                    readiness.includes(item) 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-[#13131A] text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                  onClick={() => toggleFilter(readiness, item, setReadiness)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Document Types */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-white">Document Types</Label>
            <div className="flex flex-wrap gap-2">
              {['Announcement', 'Presentation', 'Quarterly', 'Permit', 'Tender', 'Funding'].map(item => (
                <Badge
                  key={item}
                  variant="outline"
                  className={`cursor-pointer px-3 py-1.5 text-sm font-normal ${
                    docTypes.includes(item) 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-[#13131A] text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                  onClick={() => toggleFilter(docTypes, item, setDocTypes)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Exclude Keywords */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-white">Exclude Keywords</Label>
            <Input 
              placeholder="e.g. coal, uranium (comma separated)" 
              className="bg-[#13131A] border-slate-700"
            />
          </div>

        </div>

        <SheetFooter className="px-6 py-4 border-t border-slate-800 shrink-0 bg-[#1C1C24]">
          <Button variant="ghost" onClick={handleReset} className="text-slate-400 hover:text-white mr-auto">
            Reset Filters
          </Button>
          <Button onClick={onClose} className="bg-brand-orange hover:bg-brand-orange/90 text-white w-32">
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
