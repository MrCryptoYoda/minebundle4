import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, CheckCircle, MapPin, Lock, FileSignature } from 'lucide-react';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AgentSidebarProps {
  listing: Listing;
  onEnquire: () => void;
  onSave: () => void;
  onSignNda: () => void;
  isSaved: boolean;
  isNdaSigned: boolean;
}

export function AgentSidebar({ listing, onEnquire, onSave, onSignNda, isSaved, isNdaSigned }: AgentSidebarProps) {
  const handleEnquireClick = () => {
    if (!isNdaSigned) {
      onSignNda();
    } else {
      onEnquire();
      const enquirySection = document.getElementById('enquiry-section');
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Agent Card */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Listing Agent</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className={cn(
            "flex items-center gap-4 mb-6 transition-all duration-300",
            !isNdaSigned && "blur-sm opacity-70 select-none pointer-events-none grayscale-[0.5]"
          )}>
            <div className="h-14 w-14 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img 
                src={listing.seller.avatar || `https://i.pravatar.cc/150?u=${listing.seller.name}`} 
                alt={listing.seller.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-lg">
                {listing.seller.name}
                <CheckCircle className="h-4 w-4 text-brand-orange" />
              </h3>
              <p className="text-sm text-slate-500 font-medium">{listing.seller.type}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <MapPin className="h-3 w-3" />
                <span>{listing.location.region}, {listing.location.country}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleEnquireClick} 
              className={cn(
                "w-full gap-2 shadow-sm h-11 text-base font-medium transition-all hover:shadow-md",
                !isNdaSigned ? "bg-slate-900 hover:bg-slate-800" : "bg-brand-orange hover:bg-brand-orange/90"
              )}
            >
              {!isNdaSigned ? (
                <>
                  <Lock className="h-4 w-4" /> Sign NDA to Enquire
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4" /> Enquire Now
                </>
              )}
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full gap-2 border-slate-200 hover:bg-slate-50 hover:text-brand-orange transition-colors",
                  isSaved && "text-brand-orange border-brand-orange bg-brand-orange/5"
                )}
                onClick={onSave}
              >
                <Heart className={cn("h-4 w-4", isSaved && "fill-current")} /> 
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="w-full gap-2 border-slate-200 hover:bg-slate-50 hover:text-brand-orange transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Data Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Key Data</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            <div className="flex justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium">Price</span>
              <span className="font-semibold text-slate-900 text-sm">
                {listing.price.type === 'Contact for Price' ? 'Contact Agent' : 
                 listing.price.amount ? `${listing.price.currency} ${(listing.price.amount / 1000000).toFixed(1)}M` : 'POA'}
              </span>
            </div>
            <div className="flex justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium">Stage</span>
              <span className="font-semibold text-slate-900 text-sm">{listing.stage}</span>
            </div>
            <div className="flex justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium">Commodity</span>
              <span className="font-semibold text-slate-900 text-sm">{listing.commodity[0]}</span>
            </div>
            <div className="flex justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <span className="text-slate-500 text-sm font-medium">Listing ID</span>
              <span className="font-mono text-slate-400 text-xs bg-slate-100 px-2 py-0.5 rounded">{listing.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
