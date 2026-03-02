import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, FileText, Lock, PenTool, Sparkles, ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step1Offtake() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();
  const { toast } = useToast();

  // Mode state: 'select' | 'manual' | 'autofill'
  const [mode, setMode] = useState<'select' | 'manual' | 'autofill'>('select');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setListingData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value
      }
    }));
  };

  const handleAutofill = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setListingData(prev => ({
        ...prev,
        title: "AI Extracted: High-Grade Lithium Offtake",
        summary: "AI-generated summary: This opportunity offers 50,000 tpa of high-grade lithium spodumene concentrate. The project is fully permitted and construction is underway.",
        location: {
          country: "Australia",
          region: "Western Australia",
          coordinates: undefined
        },
        commodity: ["Lithium"],
        offtakeDetails: {
           intention: 'Product Sale',
           grade: '6.0% Li2O',
           quantity: '50,000 tpa',
           contractType: 'Long Term'
        }
      }));
      
      setIsAnalyzing(false);
      setMode('manual');
      toast({
        title: "AI Autofill Complete",
        description: "We've populated the offtake details from your documents.",
      });
    }, 2000);
  };

  if (mode === 'select') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-serif font-medium text-slate-900 tracking-tight">How would you like to start?</h2>
          <p className="text-slate-500 font-light text-lg">Choose the most efficient way to input your offtake details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manual Option */}
          <button 
            onClick={() => setMode('manual')}
            className="group relative flex flex-col items-center justify-center p-10 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-80 text-center space-y-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 border border-slate-100">
              <PenTool className="h-8 w-8 text-slate-400 group-hover:text-slate-900 transition-colors duration-300" />
            </div>
            
            <div className="relative space-y-2">
              <h3 className="text-xl font-serif font-medium text-slate-900">Manual Entry</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed max-w-[220px] mx-auto">
                Fill in the details yourself step-by-step using our structured wizard.
              </p>
            </div>
          </button>

          {/* AI Autofill Option */}
          <button 
            onClick={() => setMode('autofill')}
            className="group relative flex flex-col items-center justify-center p-10 bg-slate-900 border border-slate-800 rounded-2xl hover:border-brand-orange/50 hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-300 h-80 text-center space-y-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] uppercase tracking-widest font-bold">New</span>
            </div>

            <div className="relative w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-800 group-hover:shadow-inner transition-all duration-300 border border-slate-700">
              <Sparkles className="h-8 w-8 text-brand-orange group-hover:text-brand-orange/80 transition-colors duration-300" />
            </div>
            
            <div className="relative space-y-2">
              <h3 className="text-xl font-serif font-medium text-white">AI Autofill</h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed max-w-[220px] mx-auto">
                Upload spec sheets or contracts and let AI extract the details for you.
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'autofill') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <Button variant="ghost" size="icon" onClick={() => setMode('select')} className="h-10 w-10 rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div>
            <h2 className="text-3xl font-serif font-medium text-slate-900">Upload Product Documents</h2>
            <p className="text-slate-500 font-light mt-1">Upload product specifications, term sheets, or technical reports.</p>
          </div>
        </div>

        <SectionCard title="Document Upload">
          <div className="space-y-8">
            <UploadDropzone 
              label="Drag & drop files here" 
              helperText="PDF, DOCX, PPTX. Max 20MB."
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              multiple
            />
            
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 flex gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-white/40 to-indigo-50/0 animate-shimmer" />
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 z-10">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="z-10">
                <h4 className="font-serif font-medium text-indigo-900 text-base">AI Processing</h4>
                <p className="text-indigo-800/70 text-sm mt-1 font-light leading-relaxed">
                  Our AI will analyze your documents to extract key information like grade, quantity, and contract terms. You can review and edit everything in the next step.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAutofill} 
              disabled={isAnalyzing}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white text-lg font-medium rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Analyzing Documents...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2 text-brand-orange" />
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
          <span className="text-brand-orange font-mono text-xs uppercase tracking-widest mb-2 block">Step 1 of 3</span>
          <h2 className="text-3xl font-serif font-medium text-slate-900">Product Details</h2>
          <p className="text-slate-500 font-light mt-2">Tell us about the product you are listing.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMode('select')} className="text-xs h-9 border-slate-200 hover:bg-slate-50 text-slate-500">
          Change Mode
        </Button>
      </div>

      <SectionCard title="Basic Information">
        <div className="space-y-8">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Product Listing Title*</Label>
            <Input 
              id="title" 
              placeholder="e.g. High-Grade Lithium Spodumene Offtake" 
              value={listingData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
            <p className="text-xs text-slate-400 font-light">Give your listing a punchy title.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Origin / Mine Location*</Label>
            <Input 
              id="location" 
              placeholder="Search location or enter coordinates" 
              value={listingData.location?.region || ''}
              onChange={(e) => updateNestedField('location', 'region', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid gap-2">
              <Label htmlFor="sector" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Product Sector*</Label>
              <Select>
                <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="battery">Battery Metals</SelectItem>
                  <SelectItem value="base">Base Metals</SelectItem>
                  <SelectItem value="precious">Precious Metals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="commodity" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Product Type*</Label>
              <Select 
                value={listingData.commodity?.[0] || ''}
                onValueChange={(val) => updateField('commodity', [val])}
              >
                <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all">
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lithium">Lithium</SelectItem>
                  <SelectItem value="Cobalt">Cobalt</SelectItem>
                  <SelectItem value="Nickel">Nickel</SelectItem>
                  <SelectItem value="Copper">Copper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="form" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Product Form</Label>
            <Select>
              <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all">
                <SelectValue placeholder="Select form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concentrate">Concentrate</SelectItem>
                <SelectItem value="dore">Doré</SelectItem>
                <SelectItem value="cathode">Cathode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Grade & Quality Parameters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-2">
            <Label htmlFor="grade" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Average Grade*</Label>
            <Input 
              id="grade" 
              placeholder="e.g. 6.0% Li2O" 
              value={listingData.offtakeDetails?.grade || ''}
              onChange={(e) => updateNestedField('offtakeDetails', 'grade', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Quantity (Mt)*</Label>
            <Input 
              id="quantity" 
              placeholder="e.g. 50,000 tpa" 
              value={listingData.offtakeDetails?.quantity || ''}
              onChange={(e) => updateNestedField('offtakeDetails', 'quantity', e.target.value)}
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Intention">
        <div className="grid gap-2">
          <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Intention*</Label>
          <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed w-fit">
            <Lock className="h-4 w-4" />
            <span className="font-medium text-sm">Product Sale Only</span>
          </div>
          <p className="text-xs text-slate-400 font-light mt-1">Offtake listings are locked to Product Sale intention.</p>
        </div>
      </SectionCard>

      <SectionCard title="Product Description">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="summary" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Product Description*</Label>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-brand-orange hover:text-brand-orange/80 hover:bg-brand-orange/5" onClick={() => updateField('summary', "This high-grade project offers significant potential...")}>
              <FileText className="h-3.5 w-3.5" /> Insert Template
            </Button>
          </div>
          <textarea 
            className="min-h-[150px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
            placeholder="Describe the opportunity, key highlights, and strategic value..."
            value={listingData.summary || ''}
            onChange={(e) => updateField('summary', e.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Product Visuals & Specs">
        <div className="space-y-8">
          <UploadDropzone 
            label="Product Image*" 
            helperText="Upload a high-quality hero image (JPG, PNG)"
            accept="image/*"
            onUpload={(files) => {
              // Mock image upload
              updateField('image', URL.createObjectURL(files[0]));
            }}
          />
          <UploadDropzone 
            label="Mine Location Maps / Logistics Maps" 
            helperText="Upload location maps (PDF, JPG, PNG)"
            multiple
          />
        </div>
      </SectionCard>

      <SectionCard title="Contract Supporting Documents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadDropzone label="Metallurgical Testwork" className="min-h-[120px]" />
          <UploadDropzone label="Transport Agreements" className="min-h-[120px]" />
          <UploadDropzone label="Environmental Approvals" className="min-h-[120px]" />
          <UploadDropzone label="Site Photos" className="min-h-[120px]" />
          <UploadDropzone label="Product Specsheets" className="min-h-[120px]" />
          <UploadDropzone label="Additional Imagery" className="min-h-[120px]" />
        </div>
      </SectionCard>

      <SectionCard title="Payment & Financial Terms">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Payment & Financial Terms Summary</Label>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-brand-orange hover:text-brand-orange/80 hover:bg-brand-orange/5">
              <FileText className="h-3.5 w-3.5" /> Insert Template
            </Button>
          </div>
          <textarea 
            className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
            placeholder="Outline proposed payment terms, incoterms, and financial structures..."
          />
        </div>
      </SectionCard>

      <SectionCard title="Producer / Seller Information">
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Company Status*</Label>
            <RadioGroup defaultValue="private" className="flex gap-6">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="public" id="public" className="text-brand-orange border-slate-300" />
                <Label htmlFor="public" className="font-normal cursor-pointer text-base">Public Company</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="private" id="private" className="text-brand-orange border-slate-300" />
                <Label htmlFor="private" className="font-normal cursor-pointer text-base">Private Company</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="operator" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Producer Name*</Label>
            <Input 
              id="operator" 
              placeholder="e.g. Acme Mining Corp" 
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="flex items-center justify-between border border-slate-200 p-5 rounded-xl bg-slate-50/50">
            <div className="space-y-1">
              <Label className="text-base font-medium text-slate-900">Hide Producer Info?</Label>
              <p className="text-sm text-slate-500 font-light">Keep seller identity confidential until NDA is signed.</p>
            </div>
            <Switch />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ownership" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Ownership Structure*</Label>
            <Input 
              id="ownership" 
              placeholder="e.g. 90% Acme Corp / 10% Local Partner" 
              className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end pt-8">
        <Button 
          onClick={() => navigate('/list/offtake/step/2')} 
          className="gap-3 bg-brand-orange hover:bg-brand-orange/90 h-14 px-10 text-lg font-medium shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
        >
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
