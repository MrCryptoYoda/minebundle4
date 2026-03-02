import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { MARKETPLACE_CATEGORIES } from '@/data/marketplaceData';
import { ChevronLeft, Save, ArrowRight } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';

export default function CreateEditService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: "Your service listing has been saved successfully.",
      });
      navigate('/marketplace/provider/services');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/marketplace/provider/services')}
            className="h-10 w-10 rounded-full hover:bg-white hover:shadow-sm"
          >
            <ChevronLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-medium text-slate-900">{isEdit ? 'Edit Service Listing' : 'Create New Service Listing'}</h1>
            <p className="text-slate-500 font-light mt-1">Fill in the details to list your service on the marketplace.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionCard title="Service Details">
            <div className="space-y-8">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Service Title *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Advanced Geophysical Surveying" 
                  required 
                  className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Category *</Label>
                <Select required>
                  <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKETPLACE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="summary" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Short Summary *</Label>
                <Textarea 
                  id="summary" 
                  placeholder="Brief description (1-2 sentences) for search results..." 
                  className="min-h-[100px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
                  required 
                />
                <p className="text-xs text-slate-400 font-light">This will appear on the service card in search results.</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Detailed Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Full description of your service, capabilities, and value proposition..." 
                  className="min-h-[200px] w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 py-3 text-base font-light ring-offset-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:bg-white focus-visible:border-slate-400 transition-all resize-none"
                  required 
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Target Market">
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Regions Served *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Australia', 'Africa', 'North America', 'South America', 'Asia', 'Europe'].map(region => (
                    <div key={region} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-300 transition-colors">
                      <Checkbox id={`reg-${region}`} className="border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange" />
                      <Label htmlFor={`reg-${region}`} className="font-normal cursor-pointer text-sm text-slate-700">{region}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Commodities Served *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Gold', 'Copper', 'Lithium', 'Iron Ore', 'Coal', 'Nickel', 'Zinc', 'Rare Earths'].map(comm => (
                    <div key={comm} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-300 transition-colors">
                      <Checkbox id={`comm-${comm}`} className="border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange" />
                      <Label htmlFor={`comm-${comm}`} className="font-normal cursor-pointer text-sm text-slate-700">{comm}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Visuals">
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Service Image</Label>
              <UploadDropzone 
                label="Service Hero Image" 
                helperText="Upload a high-quality image (JPG, PNG) to showcase your service."
                accept="image/*"
              />
            </div>
          </SectionCard>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <Button type="button" variant="ghost" onClick={() => navigate('/marketplace/provider/services')} className="text-slate-500 hover:text-slate-900">
              Cancel
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                Save Draft
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : (isEdit ? "Update Service" : "Publish Service")}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
