import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, PenTool, Sparkles, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step1General() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();
  const { toast } = useToast();
  
  // Mode state: 'select' | 'manual' | 'autofill'
  const [mode, setMode] = useState<'select' | 'manual' | 'autofill'>('select');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: string, value: string) => {
    setListingData(prev => ({
      ...prev,
      location: { ...prev.location, [field]: value } as any
    }));
  };

  // Determine next path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  const handleAutofill = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setListingData(prev => ({
        ...prev,
        title: "AI Extracted: Copper Mountain Project",
        summary: "This is an AI-generated summary based on the uploaded documents. The project features significant copper mineralization and is located in a prime mining jurisdiction.",
        location: {
          country: "Chile",
          region: "Antofagasta",
          coordinates: undefined
        },
        commodity: ["Copper", "Gold"]
      }));
      
      setIsAnalyzing(false);
      setMode('manual');
      toast({
        title: "AI Autofill Complete",
        description: "We've populated the form details from your documents. Please review.",
      });
    }, 2000);
  };

  if (mode === 'select') {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-medium text-slate-900 mb-2">How would you like to start?</h2>
          <p className="text-slate-500 font-light text-lg">Choose the most efficient way to input your project details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manual Option */}
          <button 
            onClick={() => setMode('manual')}
            className="group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 h-64"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors border border-slate-100">
              <PenTool className="h-7 w-7 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-serif font-medium text-slate-900">Manual Entry</h3>
              <p className="text-slate-500 text-sm font-light max-w-[240px] mx-auto leading-relaxed">
                Fill in the details yourself step-by-step with our guided form.
              </p>
            </div>
          </button>

          {/* AI Autofill Option */}
          <button 
            onClick={() => setMode('autofill')}
            className="group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/10 hover:-translate-y-1 transition-all duration-300 h-64 overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-brand-orange to-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
              Recommended
            </div>
            
            {/* Subtle gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors border border-orange-100/50 relative z-10">
              <Sparkles className="h-7 w-7 text-brand-orange group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-xl font-serif font-medium text-slate-900">AI Autofill</h3>
              <p className="text-slate-500 text-sm font-light max-w-[240px] mx-auto leading-relaxed">
                Upload documents and let our AI extract key details instantly.
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'autofill') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => setMode('select')} className="rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div>
            <h2 className="text-2xl font-serif font-medium text-slate-900">Upload Project Documents</h2>
            <p className="text-slate-500 font-light">Upload teasers, technical reports, or presentations.</p>
          </div>
        </div>

        <SectionCard title="Document Upload">
          <div className="space-y-8">
            <UploadDropzone 
              label="Drag & drop files here" 
              helperText="PDF, DOCX, PPTX. Max 20MB."
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              multiple
              className="border-slate-200/80 hover:border-brand-orange/40 transition-colors"
            />
            
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex gap-4">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-blue-900 text-sm mb-1">AI Analysis</h4>
                <p className="text-blue-700/80 text-xs leading-relaxed font-light">
                  Our AI will analyze your documents to extract key information like location, commodities, and project summary. You can review and edit everything in the next step.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAutofill} 
              disabled={isAnalyzing}
              className="w-full h-14 bg-brand-orange hover:bg-brand-orange/90 text-lg font-medium tracking-wide shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Analyzing Documents...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Auto-fill Details
                </>
              )}
            </Button>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif font-medium text-slate-900">Project Overview</h2>
          <p className="text-slate-500 font-light mt-2">Start with the basics of your asset.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMode('select')} className="text-xs font-medium uppercase tracking-wider text-slate-400 hover:text-slate-600">
          Change Mode
        </Button>
      </div>

      <SectionCard title="Basic Information">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Project Title*</Label>
            <Input 
              id="title" 
              placeholder="e.g. Copper Mountain Project" 
              value={listingData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all text-lg font-serif placeholder:font-sans placeholder:text-slate-300"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="summary" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Executive Summary*</Label>
            <Textarea 
              id="summary" 
              placeholder="Briefly describe the investment opportunity..." 
              className="min-h-[140px] border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all resize-none text-base font-light leading-relaxed placeholder:text-slate-300"
              value={listingData.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-2">
            <Label htmlFor="country" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Country*</Label>
            <Input 
              id="country" 
              placeholder="Select Country" 
              value={listingData.location?.country || ''}
              onChange={(e) => updateLocation('country', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Region / State*</Label>
            <Input 
              id="region" 
              placeholder="e.g. British Columbia" 
              value={listingData.location?.region || ''}
              onChange={(e) => updateLocation('region', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Project Image">
        <UploadDropzone 
          label="Upload Main Project Image" 
          helperText="JPG, PNG or WEBP. Max 5MB."
          accept="image/*"
          className="border-slate-200/80 hover:border-brand-orange/40 transition-colors bg-slate-50/30"
        />
      </SectionCard>

      <div className="flex justify-end pt-8">
        <Button 
          onClick={() => navigate(`/list/${typeSlug}/step/2`)} 
          className="gap-3 bg-brand-orange hover:bg-brand-orange/90 h-14 px-10 text-lg font-medium shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
        >
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
