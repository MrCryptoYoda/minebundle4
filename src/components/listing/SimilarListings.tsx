import React from 'react';
import { ListingCard } from '@/components/listing/ListingCard';
import { MOCK_LISTINGS, Listing } from '@/data/mockData';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimilarListingsProps {
  currentListingId: string;
}

export function SimilarListings({ currentListingId }: SimilarListingsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const similarListings = MOCK_LISTINGS
    .filter(l => l.id !== currentListingId)
    .slice(0, 6); // Show more listings for carousel

  if (similarListings.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Similar listings viewed by Minexchange users</h2>
            <p className="text-slate-500 mt-1">Based on your search criteria and viewing history</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="h-9 w-9 rounded-full border-slate-300 hover:bg-white hover:text-brand-orange">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="h-9 w-9 rounded-full border-slate-300 hover:bg-white hover:text-brand-orange">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 py-4">
            {similarListings.map(listing => (
              <div key={listing.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                <ListingCard listing={listing} showSaveIcon={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
