import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Pickaxe, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { ServiceListing, ServiceProvider } from '@/data/marketplaceData';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: ServiceListing;
  provider?: ServiceProvider;
  viewMode?: 'grid' | 'list';
}

export function ServiceCard({ service, provider, viewMode = 'grid' }: ServiceCardProps) {
  const displayProvider = provider || service.provider;
  const isList = viewMode === 'list';
  
  return (
    <Card className={cn(
      "group overflow-hidden border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-900 rounded-3xl flex p-3 h-full",
      isList ? "flex-row" : "flex-col"
    )}>
      {/* Thumbnail */}
      <div className={cn(
        "relative overflow-hidden shrink-0 rounded-xl bg-slate-800",
        isList ? "w-72 h-full" : "h-52 w-full"
      )}>
        <Link to={`/marketplace/service/${service.id}`} className="block w-full h-full">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Category Badge (Top Left) */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/50 backdrop-blur-md text-white hover:bg-black/60 shadow-sm font-medium border border-white/10 px-3 py-1 text-xs tracking-wide rounded-md">
            {service.category}
          </Badge>
        </div>

        {/* Provider Logo Badge (Top Right) */}
        {displayProvider && (
          <div className="absolute top-3 right-3">
             <div className="bg-slate-900/90 backdrop-blur-md rounded-full p-1 shadow-sm border border-slate-700/50" title={displayProvider.name}>
                <img 
                  src={displayProvider.logo} 
                  alt={displayProvider.name} 
                  className="w-6 h-6 rounded-full object-cover"
                />
             </div>
          </div>
        )}
      </div>

      <div className={cn("flex flex-col flex-1", isList ? "px-6 py-2" : "pt-4 px-2 pb-2")}>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {/* Provider Name (Orange) */}
            <div className="text-brand-orange font-bold text-sm flex items-center gap-1">
              {displayProvider?.name}
              {displayProvider?.verified && <CheckCircle2 className="h-3.5 w-3.5" />}
            </div>

            {/* Title */}
            <Link to={`/marketplace/service/${service.id}`} className="block group-hover:text-brand-orange transition-colors">
              <h3 className="font-bold text-lg leading-tight text-white line-clamp-2">
                {service.title}
              </h3>
            </Link>

            {/* Summary (Gray) */}
            <p className="text-slate-400 text-xs line-clamp-2 pt-1 leading-relaxed">
              {service.summary}
            </p>
          </div>

          {/* Action Button */}
          <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center shrink-0 ml-3 border border-slate-700 shadow-sm group/pin">
             <ArrowRight className="h-5 w-5 text-slate-400 group-hover/pin:text-brand-orange transition-colors -rotate-45 group-hover/pin:rotate-0 duration-300" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-slate-800 my-4" />

        {/* Footer Icons */}
        <div className="flex items-center justify-between text-slate-400 text-sm">
          {/* Region */}
          <div className="flex items-center gap-2" title="Regions">
             <MapPin className="h-4 w-4 text-slate-500" />
             <span className="font-medium text-xs truncate max-w-[80px]">
               {service.regions[0]}
               {service.regions.length > 1 && <span className="text-slate-500 ml-1">+{service.regions.length - 1}</span>}
             </span>
          </div>

          {/* Commodity */}
          <div className="flex items-center gap-2" title="Commodities">
             <Pickaxe className="h-4 w-4 text-slate-500" />
             <span className="font-medium text-xs truncate max-w-[80px]">
               {service.commodities[0]}
               {service.commodities.length > 1 && <span className="text-slate-500 ml-1">+{service.commodities.length - 1}</span>}
             </span>
          </div>

          {/* Status/Type */}
          <div className="flex items-center gap-2" title="Status">
             <Building2 className="h-4 w-4 text-slate-500" />
             <span className="font-medium text-xs capitalize">
               Service
             </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
