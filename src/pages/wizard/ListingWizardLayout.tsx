import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreviewPanel } from '@/components/wizard/PreviewPanel';
import { Listing } from '@/data/mockData';

const STEPS = [
  { id: 1, label: 'Property Details' },
  { id: 2, label: 'Resource & Availability' },
  { id: 3, label: 'Review & Publish' },
];

export default function ListingWizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const typeSlug = pathSegments[2] || 'offtake';
  const currentStep = parseInt(pathSegments[4] || '1');

  const getTitleFromSlug = (slug: string) => {
    switch(slug) {
      case 'mining-project': return 'Mining Project';
      case 'renewable-asset': return 'Renewable Asset';
      case 'claim': return 'Claim';
      case 'royalty-asset': return 'Royalty Asset';
      case 'offtake': return 'Offtake Listing';
      default: return 'Listing';
    }
  };

  const listingType = getTitleFromSlug(typeSlug);

  const [listingData, setListingData] = useState<Partial<Listing>>({
    type: listingType,
    stage: 'Production',
  });
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [missingItems, setMissingItems] = useState<string[]>([]);

  // Mock auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDraftSaved(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [listingData]);

  useEffect(() => {
    const items: string[] = [];
    if (!listingData.title) items.push('Project Title');
    if (!listingData.location?.region) items.push('Location');
    if (!listingData.commodity?.length) items.push('Commodity');
    if (!listingData.summary) items.push('Project Summary');
    if (!listingData.image) items.push('Listing Image');
    
    setMissingItems(items);
  }, [listingData]);

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    // In a real app, this would trigger an API call
  };

  const handlePublish = () => {
    alert("Listing published! Redirecting to listing page...");
    navigate('/listing/lst_003');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/app/dashboard" className="font-serif font-bold text-xl text-slate-900 tracking-tight">The Minexchange</Link>
            <span className="text-slate-300 font-light">|</span>
            <span className="font-medium text-slate-600 text-sm uppercase tracking-wide">List an Asset: {listingType}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold hidden sm:block">
              {isDraftSaved ? "Saved as draft" : "Saving..."}
            </div>
            <Button variant="ghost" onClick={handleSaveDraft} className="hidden sm:flex gap-2 text-slate-600 hover:text-brand-orange hover:bg-brand-orange/5">
              <Save className="h-4 w-4" /> <span className="text-xs font-semibold uppercase tracking-wide">Save Draft</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/app/dashboard')} className="hover:bg-slate-100 rounded-full">
              <span className="sr-only">Close</span>
              <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Form Area */}
        <main className="flex-1 py-12 px-6 lg:px-12 max-w-5xl mx-auto w-full">
          {/* Progress Rail Stepper */}
          <nav aria-label="Progress" className="mb-16">
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 rounded-full" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-brand-orange -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
              <ol role="list" className="relative flex justify-between w-full">
                {STEPS.map((step) => (
                  <li key={step.label} className="relative">
                    <Link 
                      to={`/list/${typeSlug}/step/${step.id}`}
                      className="group flex flex-col items-center"
                    >
                      <div className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 bg-slate-50 z-10",
                        step.id < currentStep ? "border-brand-orange bg-brand-orange" : 
                        step.id === currentStep ? "border-brand-orange scale-125" : "border-slate-300 group-hover:border-slate-400"
                      )}>
                        {step.id < currentStep && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <span className={cn(
                        "absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300",
                        step.id <= currentStep ? "text-brand-orange" : "text-slate-400"
                      )}>
                        {step.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet context={{ listingData, setListingData }} />
          </div>
        </main>

        {/* Preview Sidebar (Dark Mode) */}
        <aside className="hidden xl:block w-[420px] bg-[#0F172A] border-l border-slate-800 p-8 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h3 className="font-serif text-white text-xl italic opacity-90">Live Preview</h3>
            <p className="text-slate-400 text-xs mt-1 font-mono">Real-time investor view</p>
          </div>
          <PreviewPanel 
            listing={listingData} 
            step={currentStep}
            onPreview={() => alert("Preview modal would open here")}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            isPublishEnabled={currentStep === 3}
            missingItems={missingItems}
          />
        </aside>
      </div>
    </div>
  );
}
