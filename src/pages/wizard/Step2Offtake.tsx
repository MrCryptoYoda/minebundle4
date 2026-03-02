import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step2Offtake() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <span className="text-brand-orange font-mono text-xs uppercase tracking-widest mb-2 block">Step 2 of 3</span>
          <h2 className="text-3xl font-serif font-medium text-slate-900">Product Availability & Specs</h2>
          <p className="text-slate-500 font-light mt-2">Provide details about product specifications and availability.</p>
        </div>
      </div>

      <SectionCard title="Source Validation (Resource/Reserve)">
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">JORC or NI43-101 compliant?*</Label>
            <RadioGroup defaultValue="jorc" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['JORC Compliant Resource', '43-101 (PEA)', 'N/A'].map((option) => (
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
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Additional Source Info*</Label>
            <RadioGroup defaultValue="pfs" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'pfs', label: 'PFS' },
                { value: 'scoping', label: 'Scoping Study' },
                { value: 'bfs', label: 'Bank Feasibility Study' },
                { value: 'pea', label: 'PEA' },
                { value: 'dfs', label: 'DFS' },
                { value: 'na-res', label: 'N/A' }
              ].map((item) => (
                <div key={item.value} className="relative">
                  <RadioGroupItem value={item.value} id={item.value} className="peer sr-only" />
                  <Label 
                    htmlFor={item.value}
                    className="flex items-center p-3 rounded-lg border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-300 peer-data-[state=checked]:border-brand-orange peer-data-[state=checked]:bg-brand-orange/5 peer-data-[state=checked]:text-brand-orange cursor-pointer transition-all duration-200"
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-300 mr-3 peer-data-[state=checked]:border-brand-orange peer-data-[state=checked]:bg-brand-orange flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 transition-opacity peer-data-[state=checked]:opacity-100" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Availability">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-2">
            <Label htmlFor="tonnage" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Available Tonnage and Volume</Label>
            <Input 
              id="tonnage" 
              placeholder="e.g. 100,000 tonnes per annum" 
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="grade-avail" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Available Grade</Label>
            <Input 
              id="grade-avail" 
              placeholder="e.g. 5.5% - 6.0%" 
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Product / Corporate Presentation">
        <UploadDropzone 
          label="Upload Presentation or Information Memorandum" 
          helperText="Upload PDF or PPTX files"
          accept=".pdf,.ppt,.pptx"
        />
      </SectionCard>

      <div className="flex justify-between pt-8">
        <Button variant="ghost" onClick={() => navigate('/list/offtake/step/1')} className="gap-2 h-14 px-8 text-slate-500 hover:text-slate-800">
          <ChevronLeft className="h-5 w-5" /> Previous Step
        </Button>
        <Button 
          onClick={() => navigate('/list/offtake/step/3')} 
          className="gap-3 bg-brand-orange hover:bg-brand-orange/90 h-14 px-10 text-lg font-medium shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
        >
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
