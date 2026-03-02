import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getProviderById, MOCK_SERVICES, ServiceListing } from '@/data/marketplaceData';
import { ServiceCard } from '@/components/marketplace/ServiceCard';
import { MapPin, Pickaxe, CheckCircle2, Globe, Mail, ChevronRight } from 'lucide-react';

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<any>(undefined);
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        const result = getProviderById(id);
        setProvider(result);
        if (result) {
          const providerServices = MOCK_SERVICES.filter(s => s.providerId === id);
          setServices(providerServices);
        }
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return <div className="p-12 text-center">Provider not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-slate-500">
          <Link to="/marketplace" className="hover:text-brand-orange">Marketplace</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-slate-900">{provider.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
              <img 
                src={provider.logo} 
                alt={provider.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{provider.name}</h1>
                {provider.verified && (
                  <Badge className="bg-brand-blue text-white border-0 w-fit">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Verified Provider
                  </Badge>
                )}
              </div>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {provider.tagline}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-orange">
                    <Globe className="h-4 w-4" /> Website
                  </a>
                )}
                {provider.contactEmail && (
                  <a href={`mailto:${provider.contactEmail}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-orange">
                    <Mail className="h-4 w-4" /> Contact
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20">
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">About</h2>
            <p className="text-slate-600 leading-relaxed">
              {provider.about}
            </p>
          </section>
          
          {/* Services */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Services ({services.length})</h2>
            </div>
            
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => (
                  <React.Fragment key={service.id}>
                    <ServiceCard service={{...service, provider}} />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 text-slate-500">
                No services listed yet.
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-slate-400" /> Regions Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {provider.regions.map((region: string) => (
                  <Badge key={region} variant="secondary" className="bg-slate-100 text-slate-700">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Pickaxe className="h-5 w-5 text-slate-400" /> Commodities
              </h3>
              <div className="flex flex-wrap gap-2">
                {provider.commodities.map((comm: string) => (
                  <Badge key={comm} variant="secondary" className="bg-slate-100 text-slate-700">
                    {comm}
                  </Badge>
                ))}
              </div>
            </div>
            
            {provider.certifications && provider.certifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-400" /> Certifications
                </h3>
                <ul className="space-y-2">
                  {provider.certifications.map((cert: string) => (
                    <li key={cert} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
