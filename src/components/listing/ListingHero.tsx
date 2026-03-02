import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Layers, Share2, Heart, Lock, ArrowRight, DollarSign, 
  Briefcase, Globe, Maximize2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Listing, IMAGES } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';

interface ListingHeroProps {
  listing: Listing;
  isGated: boolean;
  onSave: () => void;
  isSaved: boolean;
  onEnquire: () => void;
  onSignNda: () => void;
}

export function ListingHero({ listing, isGated, onSave, isSaved, onEnquire, onSignNda }: ListingHeroProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Generate some mock gallery images based on the listing ID
  // We use the listing ID to deterministically pick images from the IMAGES array
  const idNum = parseInt(listing.id.replace(/\D/g, ''), 10) || 1;
  
  const galleryImages = [
    listing.image,
    IMAGES[(idNum + 1) % IMAGES.length],
    IMAGES[(idNum + 2) % IMAGES.length],
    IMAGES[(idNum + 3) % IMAGES.length],
    IMAGES[(idNum + 4) % IMAGES.length],
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Media Gallery (60% -> 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:h-full">
            <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
              {/* Thumbnail Rail (Vertical on Desktop, Horizontal on Mobile) */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-20 shrink-0 scrollbar-hide">
                {galleryImages.slice(0, 5).map((img, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-16 lg:w-20 lg:h-20 shrink-0 aspect-square rounded-xl overflow-hidden cursor-pointer relative group border border-slate-100 hover:border-brand-orange/50 transition-all"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${i+1}`} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-300 group-hover:scale-110",
                        isGated && i > 0 && "blur-[1px]"
                      )}
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
              <div className="relative flex-1 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[750px] rounded-[24px] overflow-hidden shadow-sm group bg-slate-100">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                
                {/* Overlay Chips */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm border-none px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm">
                    {listing.type}
                  </Badge>
                  <Badge className="bg-brand-orange/90 text-white backdrop-blur-sm border-none px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm">
                    {listing.stage}
                  </Badge>
                </div>

                {/* View Gallery Button */}
                <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-4 right-4 gap-2 bg-white/90 hover:bg-white text-slate-900 shadow-sm transition-transform hover:scale-105"
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
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
              {listing.title}
            </h1>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Badge variant="outline" className="text-slate-700 border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs font-medium">
                {listing.type}
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <Badge variant="outline" className="text-slate-700 border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs font-medium">
                {listing.stage}
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <Badge variant="outline" className="text-slate-700 border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs font-medium">
                {listing.commodity.join(', ')}
              </Badge>
            </div>
            
            {/* Key Facts Grid (2 Columns) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8 border-y border-slate-100 py-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">{listing.location.region}, {listing.location.country}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Commodity</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <Layers className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">{listing.commodity.join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Intention</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <Briefcase className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">{listing.intention || 'Not Specified'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <DollarSign className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    {listing.price.type === 'Contact for Price' ? 'Contact for Price' : 
                     listing.price.amount ? `${listing.price.currency} ${(listing.price.amount / 1000000).toFixed(1)}M` : 'POA'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Listing ID</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{listing.id}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Updated</span>
                <div className="flex items-start gap-2 text-slate-900 font-medium">
                  <span className="text-sm text-slate-600">Oct 24, 2025</span>
                </div>
              </div>
            </div>

            {/* Short Summary */}
            <div className="mb-8">
              <div className={cn("prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed", !isSummaryExpanded && "line-clamp-3")}>
                <p>{listing.summary}</p>
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

            {/* Seller Info */}
            <div className={cn(
              "flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all duration-300",
              isGated && "filter blur-sm opacity-70 select-none pointer-events-none grayscale-[0.5]"
            )}>
              {listing.seller.avatar ? (
                <img src={listing.seller.avatar} alt={listing.seller.name} className="h-12 w-12 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-orange font-bold text-lg shadow-sm">
                  {listing.seller.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Listed by</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{listing.seller.name}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-slate-200 text-slate-600 hover:bg-slate-200">
                    {listing.seller.type}
                  </Badge>
                </div>
                {listing.seller.companyName && (
                  <p className="text-xs text-slate-600 mt-0.5">{listing.seller.companyName}</p>
                )}
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  size="lg"
                  onClick={isGated ? onSignNda : onEnquire}
                  className={cn(
                    "w-full gap-2 text-base font-semibold shadow-md transition-all hover:shadow-lg h-12 sm:col-span-2",
                    isGated ? "bg-slate-900 hover:bg-slate-800" : "bg-brand-orange hover:bg-brand-orange/90"
                  )}
                >
                  {isGated ? (
                    <>
                      <Lock className="h-4 w-4" /> Sign NDA to Enquire
                    </>
                  ) : (
                    <>
                      Enquire Now <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className={cn(
                    "w-full gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-11",
                    isSaved && "text-brand-orange border-brand-orange bg-brand-orange/5"
                  )}
                  onClick={onSave}
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-current")} /> 
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-11"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>

              {/* NDA Lock Messaging Card */}
              {isGated && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-4 mt-2">
                  <div className="bg-slate-200 p-2 rounded-full shrink-0">
                    <Lock className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Project Details Locked</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Sign the NDA to unlock full project details, data room files, and enquiries.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-brand-orange p-0 h-auto text-xs font-bold hover:text-brand-orange/80"
                      onClick={onSignNda}
                    >
                      Sign NDA to Unlock &rarr;
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
