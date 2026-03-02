import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Share2, CheckCircle, Trash2, ArrowUpRight, ShieldCheck, MapPin, Pickaxe, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ListingCardProps {
  listing: Listing;
  onShare: (id: string) => void;
  onConvertToSold: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onShare, onConvertToSold, onDelete }) => {
  
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
    <Card className="group h-full bg-[#1C1C24] rounded-[32px] p-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-800 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0 rounded-[24px] bg-[#13131A] mb-4">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Left Badge (Stage/Type) */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/70 border-none px-3 py-1.5 rounded-lg font-medium text-xs tracking-wide">
            {listing.stage || listing.type}
          </Badge>
        </div>

        {/* Top Right Actions (Avatar + Menu) */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Seller Avatar Placeholder */}
          <div className="h-9 w-9 rounded-full bg-[#1C1C24]/90 backdrop-blur-md flex items-center justify-center text-slate-400 shadow-sm border border-white/10">
             {listing.seller.avatar ? (
                <img src={listing.seller.avatar} alt={listing.seller.name} className="h-full w-full rounded-full object-cover" />
             ) : (
                <span className="text-xs font-bold text-brand-orange">{listing.seller.name.charAt(0)}</span>
             )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-[#1C1C24]/90 backdrop-blur-md text-slate-400 hover:bg-[#1C1C24] hover:text-brand-orange shadow-sm border border-white/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl bg-[#1C1C24] border-slate-800 text-slate-300">
              <DropdownMenuItem onClick={() => onShare(listing.id)} className="cursor-pointer focus:bg-white/5 focus:text-white">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onConvertToSold(listing.id)} className="cursor-pointer focus:bg-white/5 focus:text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Convert to Sold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(listing.id)} className="cursor-pointer text-red-500 focus:text-red-400 focus:bg-red-500/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 relative px-2">
        
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1 min-w-0 pt-1">
            {/* Seller Name */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-brand-orange font-bold text-xs truncate">{listing.seller.name}</span>
              <CheckCircle className="h-3.5 w-3.5 text-brand-orange shrink-0" />
            </div>

            {/* Title */}
            <Link to={`/listing/${listing.id}`} className="block group-hover:text-brand-orange transition-colors">
              <h3 className="font-bold text-xl text-white leading-tight line-clamp-2">
                {listing.title}
              </h3>
            </Link>
          </div>

          {/* Circular Arrow Button */}
          <Button asChild className="h-12 w-12 rounded-full bg-[#13131A] hover:bg-white/5 text-slate-400 hover:text-brand-orange p-0 shrink-0 shadow-sm border border-slate-800 transition-colors">
            <Link to={`/listing/${listing.id}`}>
              <ArrowUpRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6 pr-2">
          {listing.summary}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer Divider */}
        <div className="border-t border-slate-800 mb-4" />

        {/* Footer Details Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Location */}
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate" title={`${listing.location.region}, ${listing.location.country}`}>
              {listing.location.region}
            </span>
          </div>

          {/* Commodity */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate">
              {listing.commodity[0]}
              {listing.commodity.length > 1 && ` +${listing.commodity.length - 1}`}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Banknote className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate font-medium">
              {formatPrice(listing.price)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
