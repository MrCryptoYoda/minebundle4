import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, CheckCircle, MapPin, ShieldCheck, Clock, Globe } from 'lucide-react';
import { ServiceListing } from '@/data/marketplaceData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ServiceSidebarProps {
  service: ServiceListing;
  onEnquire: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export function ServiceSidebar({ service, onEnquire, onSave, isSaved }: ServiceSidebarProps) {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Provider Card */}
      <Card className="border-white/5 shadow-sm overflow-hidden bg-slate-950">
        <CardHeader className="bg-slate-950 border-b border-white/5 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Service Provider</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6 transition-all duration-300">
            <div className="h-14 w-14 rounded-full bg-slate-900 overflow-hidden border border-white/5 shadow-sm shrink-0">
              <img 
                src={service.provider?.logo || `https://ui-avatars.com/api/?name=${service.provider?.name}&background=random`} 
                alt={service.provider?.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-1.5 text-lg">
                {service.provider?.name}
                {service.provider?.verified && (
                  <CheckCircle className="h-4 w-4 text-brand-orange" />
                )}
              </h3>
              <p className="text-sm text-slate-400 font-medium line-clamp-1">{service.provider?.tagline}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="h-3 w-3" />
                <span>Perth, WA</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={onEnquire} 
              className="w-full gap-2 shadow-lg shadow-brand-orange/20 h-11 text-base font-medium transition-all hover:shadow-xl bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              <MessageSquare className="h-4 w-4" /> Contact Provider
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full gap-2 border-white/10 text-white bg-slate-900/50 hover:bg-slate-800 hover:text-white transition-colors",
                  isSaved && "text-brand-orange border-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20"
                )}
                onClick={onSave}
              >
                <Heart className={cn("h-4 w-4", isSaved && "fill-current")} /> 
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="w-full gap-2 border-white/10 text-white bg-slate-900/50 hover:bg-slate-800 hover:text-white transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
            <Button asChild variant="ghost" className="w-full h-10 text-slate-400 hover:text-white hover:bg-slate-800">
              <Link to={`/marketplace/provider/${service.providerId}`}>
                View Full Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Data Summary */}
      <Card className="border-white/5 shadow-sm bg-slate-950">
        <CardHeader className="bg-slate-950 border-b border-white/5 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            <div className="flex justify-between p-4 hover:bg-slate-900/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" /> Response Time
              </span>
              <span className="font-semibold text-white text-sm">~24 Hours</span>
            </div>
            <div className="flex justify-between p-4 hover:bg-slate-900/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate-500" /> Regions
              </span>
              <span className="font-semibold text-white text-sm text-right max-w-[50%] truncate">
                {service.regions.join(', ')}
              </span>
            </div>
            <div className="flex justify-between p-4 hover:bg-slate-900/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-500" /> Verified
              </span>
              <span className={cn("font-semibold text-sm flex items-center gap-1", service.provider?.verified ? "text-green-500" : "text-slate-500")}>
                {service.provider?.verified ? (
                  <>Yes <CheckCircle className="h-3 w-3" /></>
                ) : 'No'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="border-white/5 shadow-sm bg-slate-950">
        <CardHeader className="bg-slate-950 border-b border-white/5 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Certifications</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {(service.provider?.certifications || ['ISO 9001', 'Safety First']).map((cert, i) => (
              <Badge key={i} variant="secondary" className="bg-slate-900 text-slate-300 font-normal border border-white/10 hover:bg-slate-800">
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
