import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ArrowRight, CheckCircle2, MapPin, Pickaxe, Banknote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Listing } from '@/data/mockData';

interface ListingCardProps {
  listing: Listing;
  className?: string;
  showSaveIcon?: boolean;
  matchReason?: string;
  viewMode?: 'grid' | 'list';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, className, showSaveIcon = false, matchReason, viewMode = 'grid' }) => {
  const isList = viewMode === 'list';

  // Format price for display
  const formatPrice = (price: Listing['price']) => {
    if (price.type === 'Contact for Price') return 'Contact';
    if (price.type === 'Auction') return 'Auction';
    if (price.amount === null) return 'POA';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(price.amount);
  };

  return (
    <Link to={`/listing/${listing.id}`} className="block h-full group">
      <Card className={cn(
        "group overflow-hidden border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl flex p-3 h-full",
        isList ? "flex-row" : "flex-col",
        className
      )}>
        {/* Thumbnail */}
        <div className={cn(
          "relative overflow-hidden shrink-0 rounded-xl bg-slate-100",
          isList ? "w-72 h-full" : "h-52 w-full"
        )}>
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge className="bg-black/30 backdrop-blur-md text-white hover:bg-black/40 shadow-sm font-medium border border-white/20 px-3 py-1 text-xs tracking-wide rounded-md">
              {listing.type === 'Offtake Listing' ? 'Offtake' : listing.type}
            </Badge>
            {listing.isFeatured && (
               <Badge className="bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white border-none px-3 py-1 text-xs tracking-wide rounded-md shadow-sm">
                 Featured
               </Badge>
            )}
          </div>

          {/* Top Right Icons */}
          <div className="absolute top-3 right-3 flex gap-2">
            {listing.isNdaRequired && (
              <div className="bg-black/40 backdrop-blur-md text-white rounded-full p-1.5 border border-white/20" title="NDA Required">
                <ShieldCheck className="h-3.5 w-3.5" /> 
              </div>
            )}
          </div>
        </div>

        <div className={cn("flex flex-col flex-1", isList ? "px-6 py-2" : "pt-4 px-2 pb-2")}>
          <div className="flex justify-between items-start">
            <div className="space-y-1 w-full pr-2">
              {/* Seller Name (Orange) */}
              <div className="text-brand-orange font-bold text-sm flex items-center gap-1">
                {listing.seller?.name || 'Verified Seller'}
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg leading-tight text-slate-900 line-clamp-2 group-hover:text-brand-orange transition-colors">
                {listing.title}
              </h3>

              {/* Summary (Gray) */}
              <p className="text-slate-500 text-xs line-clamp-2 pt-1 leading-relaxed">
                {listing.summary}
              </p>
              
              {/* Match Reason (Optional) */}
              {matchReason && (
                <div className="mt-2 bg-brand-orange/5 p-1.5 rounded-md inline-flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-brand-orange shrink-0" />
                  <span className="text-[10px] font-medium text-brand-orange">{matchReason}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0 ml-1 border border-slate-100 shadow-sm group/pin">
               <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-orange transition-colors -rotate-45 group-hover:rotate-0 duration-300" />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="border-t border-slate-100 my-4" />

          {/* Footer Icons */}
          <div className="flex items-center justify-between text-slate-500 text-sm">
            {/* Region */}
            <div className="flex items-center gap-2" title={`${listing.location.region}, ${listing.location.country}`}>
               <MapPin className="h-4 w-4 text-slate-400" />
               <span className="font-medium text-xs truncate max-w-[80px]">
                 {listing.location.region}
               </span>
            </div>

            {/* Commodity */}
            <div className="flex items-center gap-2" title={listing.commodity.join(', ')}>
               <Pickaxe className="h-4 w-4 text-slate-400" />
               <span className="font-medium text-xs truncate max-w-[80px]">
                 {listing.commodity[0]}
                 {listing.commodity.length > 1 && <span className="text-slate-400 ml-1">+{listing.commodity.length - 1}</span>}
               </span>
            </div>

            {/* Price/Type */}
            <div className="flex items-center gap-2" title="Price">
               <Banknote className="h-4 w-4 text-slate-400" />
               <span className="font-medium text-xs truncate max-w-[80px]">
                 {formatPrice(listing.price)}
               </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
