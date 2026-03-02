import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Layers, Share2, Heart, Lock, ArrowRight, DollarSign, 
  Briefcase, Globe, Maximize2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  CheckCircle2, ShieldCheck, Star
} from 'lucide-react';
import { ServiceListing } from '@/data/marketplaceData';
import { IMAGES } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';

interface ServiceListingHeroProps {
  service: ServiceListing;
  onSave: () => void;
  isSaved: boolean;
  onEnquire: () => void;
}

export function ServiceListingHero({ service, onSave, isSaved, onEnquire }: ServiceListingHeroProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Generate mock gallery images based on ID
  const idNum = parseInt(service.id.replace(/\D/g, ''), 10) || 1;
  const galleryImages = [
    service.image,
    IMAGES[(idNum + 1) % IMAGES.length],
    IMAGES[(idNum + 2) % IMAGES.length],
    IMAGES[(idNum + 3) % IMAGES.length],
    IMAGES[(idNum + 4) % IMAGES.length],
  ];

  return (
    <div className="bg-slate-950 border-b border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Media Gallery (60% -> 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:h-full">
            <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
              {/* Thumbnail Rail */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-20 shrink-0 scrollbar-hide">
                {galleryImages.slice(0, 5).map((img, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-16 lg:w-20 lg:h-20 shrink-0 aspect-square rounded-xl overflow-hidden cursor-pointer relative group border border-white/5 hover:border-brand-orange/50 transition-all"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${i+1}`} 
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    {i === 4 && galleryImages.length > 5 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-white backdrop-blur-[1px]">
                        +{galleryImages.length - 5}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px] rounded-[24px] overflow-hidden shadow-sm group bg-slate-900">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                
                {/* Overlay Chips */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-black/50 text-white backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm">
                    {service.category}
                  </Badge>
                  {service.provider?.verified && (
                    <Badge className="bg-brand-blue/90 text-white backdrop-blur-sm border-none px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>

                {/* View Gallery Button */}
                <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-4 right-4 gap-2 bg-black/50 hover:bg-black/70 text-white border border-white/10 shadow-sm transition-transform hover:scale-105 backdrop-blur-md"
                    >
                      <Maximize2 className="h-4 w-4" /> View Gallery
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black border-none overflow-hidden flex flex-col">
                    <DialogTitle className="sr-only">Image Gallery</DialogTitle>
                    <div className="relative flex-1 w-full h-full flex items-center justify-center bg-black">
                      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
                        <div className="flex h-full">
                          {galleryImages.map((img, index) => (
                            <div className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center" key={index}>
                              <img 
                                src={img} 
                                alt={`Gallery ${index + 1}`} 
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12"
                        onClick={scrollPrev}
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12"
                        onClick={scrollNext}
                      >
                        <ChevronRight className="h-8 w-8" />
                      </Button>

                      <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
                        Swipe or use arrows to navigate
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          {/* Right Column: Listing Summary Panel (40% -> 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
              {service.title}
            </h1>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Badge variant="outline" className="text-slate-300 border-white/5 bg-slate-900 px-2.5 py-0.5 text-xs font-medium">
                {service.category}
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-700" />
              <Badge variant="outline" className="text-slate-300 border-white/5 bg-slate-900 px-2.5 py-0.5 text-xs font-medium">
                {service.regions[0]}
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <Star className="h-3 w-3 text-brand-orange fill-brand-orange" />
                <span>4.9 (12 Reviews)</span>
              </div>
            </div>
            
            {/* Key Facts Grid (2 Columns) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8 border-y border-white/5 py-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Regions</span>
                <div className="flex items-start gap-2 text-white font-medium">
                  <Globe className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">{service.regions.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Commodities</span>
                <div className="flex items-start gap-2 text-white font-medium">
                  <Layers className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">{service.commodities.slice(0, 2).join(', ')}{service.commodities.length > 2 ? ` +${service.commodities.length - 2}` : ''}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Response Time</span>
                <div className="flex items-start gap-2 text-white font-medium">
                  <Briefcase className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">~24 Hours</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Listing ID</span>
                <div className="flex items-start gap-2 text-white font-medium">
                  <span className="font-mono text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-300">{service.id}</span>
                </div>
              </div>
            </div>

            {/* Short Summary */}
            <div className="mb-8">
              <div className={cn("prose prose-sm prose-invert max-w-none text-slate-400 leading-relaxed", !isSummaryExpanded && "line-clamp-3")}>
                <p>{service.summary}</p>
              </div>
              <button 
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium inline-flex items-center gap-1 mt-2 transition-colors"
              >
                {isSummaryExpanded ? (
                  <>Read less <ChevronUp className="h-3 w-3" /></>
                ) : (
                  <>Read more <ChevronDown className="h-3 w-3" /></>
                )}
              </button>
            </div>

            {/* Provider Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-900 rounded-xl border border-white/5 transition-all duration-300">
              {service.provider?.logo ? (
                <img src={service.provider.logo} alt={service.provider.name} className="h-12 w-12 rounded-full object-cover border border-slate-600" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-brand-orange font-bold text-lg shadow-sm">
                  {service.provider?.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Service Provider</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{service.provider?.name}</span>
                  {service.provider?.verified && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border-blue-800 gap-1">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{service.provider?.tagline}</p>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  size="lg"
                  onClick={onEnquire}
                  className="w-full gap-2 text-base font-semibold shadow-md transition-all hover:shadow-lg h-12 sm:col-span-2 bg-brand-orange hover:bg-brand-orange/90 text-white"
                >
                  Enquire Now <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className={cn(
                    "w-full gap-2 border-white/10 text-white bg-slate-900/50 hover:bg-slate-800 hover:text-white h-11 transition-all",
                    isSaved && "text-brand-orange border-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20"
                  )}
                  onClick={onSave}
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-current")} /> 
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full gap-2 border-white/10 text-white bg-slate-900/50 hover:bg-slate-800 hover:text-white h-11 transition-all"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
