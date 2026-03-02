import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GateCard } from '@/components/broker-profile/GateCard';
import { ImportUrlCard } from '@/components/broker-profile/ImportUrlCard';
import { AgentInfoForm } from '@/components/broker-profile/AgentInfoForm';
import { CompanyInfoForm } from '@/components/broker-profile/CompanyInfoForm';
import { FeaturedListingsInputs } from '@/components/broker-profile/FeaturedListingsInputs';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '@/context/DemoContext';

export default function AgentProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userRole } = useDemo();

  // Mock User Data (Agent)
  const [user, setUser] = useState({
    role: "Agent", 
    firstName: "Alex",
    lastName: "Morgan",
    bio: "Experienced mining agent specializing in gold and copper assets across Western Australia.",
    company: {
      name: "Morgan Mining Agency",
      website: "https://morganmining.com",
      description: "Leading agency connecting buyers and sellers in the resources sector.",
      logo: "https://picsum.photos/seed/company/200/200",
    },
    featuredLiveListings: [
      "https://minexchange.com/listing/lst_001",
      "https://minexchange.com/listing/lst_002"
    ],
    featuredSoldListings: [
      "https://minexchange.com/listing/lst_005"
    ]
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFieldChange = (section: 'user' | 'company', field: string, value: any) => {
    setUser(prev => {
      if (section === 'user') {
        return { ...prev, [field]: value };
      } else {
        return { ...prev, company: { ...prev.company, [field]: value } };
      }
    });
    setIsDirty(true);
  };

  const handleFeaturedListingsChange = (type: 'live' | 'sold', listings: string[]) => {
    setUser(prev => ({
      ...prev,
      [type === 'live' ? 'featuredLiveListings' : 'featuredSoldListings']: listings
    }));
    setIsDirty(true);
  };

  const handleImportProfile = async (url: string) => {
    // Mock import logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser(prev => ({
      ...prev,
      firstName: "Imported Name",
      lastName: "Imported Lastname",
      bio: "Imported bio from LinkedIn...",
      company: {
        ...prev.company,
        name: "Imported Agency",
        website: "https://imported.com",
        description: "Imported agency description..."
      }
    }));
    setIsDirty(true);
  };

  const handleSaveChanges = () => {
    setIsDirty(false);
    toast({
      title: "Profile updated",
      description: "Your agent profile has been successfully updated.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-w-3xl mx-auto">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    );
  }

  // Access Gate
  if (userRole !== 'agent') {
    return <GateCard />;
  }

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Agent Profile</h1>
        <p className="text-slate-500">Showcase your agency and featured opportunities to buyers.</p>
      </div>

      <div className="space-y-6">
        {/* Import Profile */}
        <ImportUrlCard
          title="Import Profile"
          description="Quickly populate your profile from LinkedIn or a website."
          placeholder="Paste LinkedIn profile URL or website URL"
          onImport={handleImportProfile}
          helperText="We'll prefill your profile details. You can edit anything."
          manualText="Or enter manually"
          onManualClick={() => {
            document.getElementById('personal-info')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Personal Info */}
        <div id="personal-info">
          <AgentInfoForm
            data={user}
            onChange={(field, value) => handleFieldChange('user', field, value)}
          />
        </div>

        {/* Company Info */}
        <CompanyInfoForm
          data={user.company}
          onChange={(field, value) => handleFieldChange('company', field, value)}
        />

        {/* Featured Live Listings */}
        <FeaturedListingsInputs
          title="Featured Live Listings"
          description="Select up to 3 live listings to feature on your profile."
          listings={user.featuredLiveListings}
          onChange={(listings) => handleFeaturedListingsChange('live', listings)}
          maxListings={3}
        />

        {/* Featured Sold Listings */}
        <FeaturedListingsInputs
          title="Featured Sold Listings"
          description="Showcase your track record with up to 3 sold listings."
          listings={user.featuredSoldListings}
          onChange={(listings) => handleFeaturedListingsChange('sold', listings)}
          maxListings={3}
        />
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-end gap-4 sm:static sm:bg-transparent sm:border-0 sm:p-0">
        <Button variant="outline" onClick={() => navigate('/app/dashboard')}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} disabled={!isDirty}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
