import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Pickaxe, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceProvider } from '@/data/marketplaceData';

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full bg-white">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Link to={`/marketplace/provider/${provider.id}`} className="block w-full h-full">
          <img
            src={provider.logo}
            alt={provider.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[0.1] group-hover:grayscale-0"
            loading="lazy"
          />
        </Link>
        
        {/* Verified Badge */}
        {provider.verified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1.5 shadow-sm border border-white/50">
            <CheckCircle2 className="h-3 w-3 text-brand-blue fill-brand-blue/10" />
            <span className="text-xs font-medium text-slate-700">Verified</span>
          </div>
        )}
      </div>

      <CardContent className="flex-1 p-5 flex flex-col gap-3">
        {/* Title */}
        <Link to={`/marketplace/provider/${provider.id}`} className="group-hover:text-brand-orange transition-colors">
          <h3 className="font-semibold text-slate-900 line-clamp-1 text-lg leading-tight">
            {provider.name}
          </h3>
        </Link>

        {/* Tagline */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {provider.tagline}
        </p>

        {/* Metadata */}
        <div className="mt-auto pt-2 flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="truncate">{provider.regions.join(', ')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Pickaxe className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="truncate">{provider.commodities.join(', ')}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center gap-3 border-t border-slate-50 mt-auto bg-slate-50/30">
        <Button asChild variant="outline" size="sm" className="w-full border-slate-200 hover:bg-white hover:text-brand-orange">
          <Link to={`/marketplace/provider/${provider.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
