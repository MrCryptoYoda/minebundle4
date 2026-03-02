import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useDemo } from '@/context/DemoContext';
import { useProfileStore } from '@/store/profileStore';
import { CheckCircle2, Building2, Globe, MapPin, Pickaxe } from 'lucide-react';

export default function ProviderOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUserRole, setHasInsightsSubscription } = useDemo();
  const { updateField, companyName, website, description, coverageCountries, commodities } = useProfileStore();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Local state for form inputs to avoid direct store updates on every keystroke if desired,
  // but for simplicity we can update store directly or use local state and sync on next.
  // Let's use local state for the form and sync to store on "Next".
  const [formData, setFormData] = useState({
    companyName: companyName || '',
    website: website || '',
    tagline: '',
    description: description || '',
    regions: coverageCountries || [],
    commodities: commodities || [],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field: 'regions' | 'commodities', item: string) => {
    setFormData(prev => {
      const list = prev[field] as string[];
      if (list.includes(item)) {
        return { ...prev, [field]: list.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...list, item] };
      }
    });
  };

  const handleNext = () => {
    // Sync to store before moving next
    if (step === 1) {
      updateField('companyName', formData.companyName);
      updateField('website', formData.website);
      updateField('description', formData.description);
      // Tagline isn't in store, maybe append to description or ignore for now
    } else if (step === 2) {
      updateField('coverageCountries', formData.regions);
      updateField('commodities', formData.commodities);
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Final sync just in case
    updateField('companyName', formData.companyName);
    updateField('website', formData.website);
    updateField('description', formData.description);
    updateField('coverageCountries', formData.regions);
    updateField('commodities', formData.commodities);

    setTimeout(() => {
      setUserRole('service_provider');
      // Auto-subscribe them for the demo flow
      setHasInsightsSubscription(true);
      
      setIsLoading(false);
      toast({
        title: "Profile Created",
        description: "Welcome to Minexchange! Your profile has been initialized.",
      });
      // Redirect to Insights Dashboard instead of Service Management
      navigate('/insights/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Become a Service Provider</h1>
          <p className="text-slate-500">Complete your profile to start listing services and receiving leads.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300'}`}>1</div>
            <span className="font-medium hidden sm:inline">Company Basics</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-brand-orange' : 'bg-slate-300'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300'}`}>2</div>
            <span className="font-medium hidden sm:inline">Coverage</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-brand-orange' : 'bg-slate-300'}`} />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300'}`}>3</div>
            <span className="font-medium hidden sm:inline">Review</span>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Tell us about your business.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="company-name" 
                      placeholder="Acme Mining Services" 
                      className="pl-9" 
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="website" 
                      placeholder="https://example.com" 
                      className="pl-9" 
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Short Tagline</Label>
                  <Input 
                    id="tagline" 
                    placeholder="Ex: Leading provider of drilling solutions" 
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">About Company</Label>
                  <Textarea 
                    id="about" 
                    placeholder="Describe your company's expertise and history..." 
                    className="min-h-[100px]" 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} className="bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={!formData.companyName}>
                  Next: Coverage
                </Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Service Coverage</CardTitle>
                <CardDescription>Where do you operate and what commodities do you serve?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Regions Served</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Australia', 'Africa', 'North America', 'South America', 'Asia', 'Europe'].map(region => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`reg-${region}`} 
                          checked={formData.regions.includes(region)}
                          onCheckedChange={() => toggleSelection('regions', region)}
                        />
                        <Label htmlFor={`reg-${region}`} className="font-normal cursor-pointer">{region}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="flex items-center gap-2"><Pickaxe className="h-4 w-4" /> Commodities Served</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Gold', 'Copper', 'Lithium', 'Iron Ore', 'Coal', 'Nickel', 'Zinc', 'Rare Earths'].map(comm => (
                      <div key={comm} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`comm-${comm}`} 
                          checked={formData.commodities.includes(comm)}
                          onCheckedChange={() => toggleSelection('commodities', comm)}
                        />
                        <Label htmlFor={`comm-${comm}`} className="font-normal cursor-pointer">{comm}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next: Review</Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Verify your information before creating your profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg space-y-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900">Profile Ready</h4>
                      <p className="text-sm text-slate-500">Your profile will be visible to project owners once approved.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900">Insights Dashboard</h4>
                      <p className="text-sm text-slate-500">You will be redirected to your new Insights Dashboard.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600 border-t pt-4">
                   <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Company:</span>
                      <span className="col-span-2">{formData.companyName}</span>
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Regions:</span>
                      <span className="col-span-2">{formData.regions.join(', ') || 'None'}</span>
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Commodities:</span>
                      <span className="col-span-2">{formData.commodities.join(', ') || 'None'}</span>
                   </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm font-normal text-slate-600 cursor-pointer">
                    I agree to the <span className="text-brand-orange hover:underline">Terms of Service</span> and <span className="text-brand-orange hover:underline">Provider Guidelines</span>.
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>Back</Button>
                <Button onClick={handleSubmit} className="bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={isLoading}>
                  {isLoading ? "Creating Profile..." : "Create Provider Profile"}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
