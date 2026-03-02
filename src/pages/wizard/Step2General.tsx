import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '@/components/wizard/SectionCard';
import { Listing } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step2General() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  // Determine next path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <span className="text-brand-orange font-mono text-xs uppercase tracking-widest mb-2 block">Step 2 of 3</span>
          <h2 className="text-3xl font-serif font-medium text-slate-900">Project Details</h2>
          <p className="text-slate-500 font-light mt-2">Technical specifications and resource data.</p>
        </div>
      </div>

      {/* Resource or Reserve Details */}
      <SectionCard title="Resource & Reserve">
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">JORC / NI 43-101 Compliance*</Label>
            <RadioGroup 
              value={listingData.jorcCompliant} 
              onValueChange={(val) => updateField('jorcCompliant', val)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {['JORC Compliant', '43-101 (PEA)', 'N/A'].map((option) => (
                <div key={option}>
                  <RadioGroupItem value={option} id={`jorc-${option}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`jorc-${option}`}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-300 hover:shadow-md peer-data-[state=checked]:border-brand-orange peer-data-[state=checked]:bg-brand-orange/5 peer-data-[state=checked]:text-brand-orange cursor-pointer transition-all duration-200 h-full text-center font-medium"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Resource Classification*</Label>
            <RadioGroup 
              value={listingData.additionalResourceInfo} 
              onValueChange={(val) => updateField('additionalResourceInfo', val)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {[
                'Preliminary Feasibility Study (PFS)', 
                'Preliminary Economic Assessment (PEA)', 
                'Definitive Feasibility Study (DFS)', 
                'Scoping Study', 
                'Bank Feasibility Study', 
                'N/A'
              ].map((item) => (
                <div key={item} className="relative">
                  <RadioGroupItem value={item} id={`info-${item}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`info-${item}`}
                    className="flex items-center p-3 rounded-lg border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-300 peer-data-[state=checked]:border-brand-orange peer-data-[state=checked]:bg-brand-orange/5 peer-data-[state=checked]:text-brand-orange cursor-pointer transition-all duration-200"
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-300 mr-3 peer-data-[state=checked]:border-brand-orange peer-data-[state=checked]:bg-brand-orange flex items-center justify-center shrink-0">
                      <div className={cn("w-2 h-2 rounded-full bg-brand-orange opacity-0 transition-opacity", listingData.additionalResourceInfo === item && "opacity-100")} />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-4">
              <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Tonnage & Volume Data</Label>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => updateField('tonnageVolume', true)}
                  className={cn("flex-1 h-11 border-slate-200", listingData.tonnageVolume && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
                >
                  Available
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => updateField('tonnageVolume', false)}
                  className={cn("flex-1 h-11 border-slate-200", !listingData.tonnageVolume && listingData.tonnageVolume !== undefined && "bg-slate-100 text-slate-500")}
                >
                  Not Available
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Resource Grade Data</Label>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => updateField('resourceContainedGrade', true)}
                  className={cn("flex-1 h-11 border-slate-200", listingData.resourceContainedGrade && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
                >
                  Available
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => updateField('resourceContainedGrade', false)}
                  className={cn("flex-1 h-11 border-slate-200", !listingData.resourceContainedGrade && listingData.resourceContainedGrade !== undefined && "bg-slate-100 text-slate-500")}
                >
                  Not Available
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Additional Geological Information */}
      <SectionCard title="Geological Data">
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Project Area Size</Label>
            <div className="flex gap-4">
              <Input 
                placeholder="e.g. 30" 
                value={listingData.sizeOfArea || ''}
                onChange={(e) => updateField('sizeOfArea', e.target.value)}
                className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all font-mono text-lg"
              />
              <Select>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 bg-slate-50/30">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km2">km²</SelectItem>
                  <SelectItem value="hectares">Hectares</SelectItem>
                  <SelectItem value="acres">Acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Claims / Tenements</Label>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => updateField('numberOfClaims', true)}
                  className={cn("flex-1 h-11 border-slate-200", listingData.numberOfClaims && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
                >
                  Yes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => updateField('numberOfClaims', false)}
                  className={cn("flex-1 h-11 border-slate-200", !listingData.numberOfClaims && listingData.numberOfClaims !== undefined && "bg-slate-100 text-slate-500")}
                >
                  No
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Drill Ready / Permits</Label>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => updateField('drillingPermits', true)}
                  className={cn("flex-1 h-11 border-slate-200", listingData.drillingPermits && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
                >
                  Yes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => updateField('drillingPermits', false)}
                  className={cn("flex-1 h-11 border-slate-200", !listingData.drillingPermits && listingData.drillingPermits !== undefined && "bg-slate-100 text-slate-500")}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Project Presentation */}
      <SectionCard title="Project Presentation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Presentation / IM Upload</Label>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => updateField('uploadPresentation', true)}
                className={cn("flex-1 h-11 border-slate-200", listingData.uploadPresentation && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
              >
                Yes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => updateField('uploadPresentation', false)}
                className={cn("flex-1 h-11 border-slate-200", !listingData.uploadPresentation && listingData.uploadPresentation !== undefined && "bg-slate-100 text-slate-500")}
              >
                No
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Recent Material Announcement</Label>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => updateField('recentAnnouncement', true)}
                className={cn("flex-1 h-11 border-slate-200", listingData.recentAnnouncement && "border-brand-orange bg-brand-orange/5 text-brand-orange")}
              >
                Yes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => updateField('recentAnnouncement', false)}
                className={cn("flex-1 h-11 border-slate-200", !listingData.recentAnnouncement && listingData.recentAnnouncement !== undefined && "bg-slate-100 text-slate-500")}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-between pt-8">
        <Button variant="ghost" onClick={() => navigate(`/list/${typeSlug}/step/1`)} className="gap-2 h-14 px-8 text-slate-500 hover:text-slate-800">
          <ChevronLeft className="h-5 w-5" /> Previous Step
        </Button>
        <Button 
          onClick={() => navigate(`/list/${typeSlug}/step/3`)} 
          className="gap-3 bg-brand-orange hover:bg-brand-orange/90 h-14 px-10 text-lg font-medium shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
        >
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
