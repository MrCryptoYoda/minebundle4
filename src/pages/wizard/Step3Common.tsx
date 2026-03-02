import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { Listing } from '@/data/mockData';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step3Common() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  // Determine previous path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = () => {
    // Mock publish action
    alert("Publishing listing...");
    navigate('/listing/lst_003');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <span className="text-brand-orange font-mono text-xs uppercase tracking-widest mb-2 block">Step 3 of 3</span>
          <h2 className="text-3xl font-serif font-medium text-slate-900">Final Details</h2>
          <p className="text-slate-500 font-light mt-2">Logistics, agreements, and commercial terms.</p>
        </div>
      </div>

      {typeSlug === 'offtake' ? (
        <SectionCard title="Logistics & Delivery">
          <div className="space-y-8">
            <div className="grid gap-2">
              <Label htmlFor="infrastructure" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Logistics Infrastructure</Label>
              <textarea 
                className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
                placeholder="Describe logistics setup and transport routes (Port, Rail, Road)..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="permits" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Export Permits / Licenses</Label>
              <Input 
                id="permits" 
                placeholder="e.g. All export permits secured" 
                className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="taxes" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Royalties / Taxes</Label>
              <Input 
                id="taxes" 
                placeholder="e.g. Standard state royalties apply" 
                className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid gap-2">
                <Label htmlFor="incoterms" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Shipping Terms (Incoterms)</Label>
                <Input 
                  id="incoterms" 
                  placeholder="e.g. FOB, CIF" 
                  className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Delivery Schedule</Label>
                <Input 
                  id="schedule" 
                  placeholder="e.g. Monthly shipments starting Q3" 
                  className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Infrastructure & Agreements">
          <div className="space-y-8">
            <div className="grid gap-2">
              <Label htmlFor="infrastructure" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Material Infrastructure</Label>
              <textarea 
                className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
                placeholder="Describe existing infrastructure (power, water, roads)..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="native-title" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Native Title Agreements</Label>
              <Input 
                id="native-title" 
                placeholder="e.g. Agreement in place with..." 
                className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="royalty" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Royalty Details</Label>
              <Input 
                id="royalty" 
                placeholder="e.g. 1.5% NSR to previous owner" 
                className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid gap-2">
                <Label htmlFor="rental-fees" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Yearly Rental Fees</Label>
                <Input 
                  id="rental-fees" 
                  placeholder="e.g. $15,000 AUD" 
                  className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paid-status" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Paid Status</Label>
                <Input 
                  id="paid-status" 
                  placeholder="e.g. Paid until Dec 2025" 
                  className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 flex items-start gap-4">
        <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-serif font-medium text-emerald-900 text-lg">Ready to Publish?</h4>
          <p className="text-sm text-emerald-800/80 mt-1 font-light leading-relaxed">
            Your listing has reached the required quality score. You can publish now to make it visible to investors, or save as a draft to review later.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button variant="ghost" onClick={() => navigate(`/list/${typeSlug}/step/2`)} className="gap-2 h-14 px-8 text-slate-500 hover:text-slate-800">
          <ChevronLeft className="h-5 w-5" /> Previous Step
        </Button>
        <Button 
          onClick={handlePublish} 
          className="gap-3 bg-emerald-600 hover:bg-emerald-500 h-14 px-10 text-lg font-medium shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
        >
          Publish Listing <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
