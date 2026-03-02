import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, User, Globe, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface SellerInfoSectionProps {
  listing: Listing;
}

export function SellerInfoSection({ listing }: SellerInfoSectionProps) {
  const [isOperatorHidden, setIsOperatorHidden] = useState(listing.seller.isOperatorHidden || false);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-orange/10 rounded-full flex items-center justify-center">
            <Building2 className="h-5 w-5 text-brand-orange" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">Seller Information</CardTitle>
            <p className="text-sm text-slate-500">Ownership and operator details</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Company Details */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Company Profile</h4>
              <div className="flex items-start gap-4">
                {listing.seller.avatar ? (
                  <img src={listing.seller.avatar} alt={listing.seller.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User className="h-6 w-6 text-slate-400" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-slate-900 text-lg">{listing.seller.companyName || listing.seller.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      listing.seller.companyType === 'Public' 
                        ? "bg-blue-50 text-blue-700 border-blue-200" 
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    )}>
                      {listing.seller.companyType || listing.seller.type}
                    </span>
                    {listing.seller.companyType === 'Public' && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Globe className="h-3 w-3" /> Listed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Ownership Structure</h4>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                {listing.seller.ownership || 'Ownership details not specified'}
              </div>
            </div>
          </div>

          {/* Operator Details */}
          <div className="space-y-6">
             <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Project Operator</h4>
                {listing.seller.isOperatorHidden && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-slate-400 hover:text-slate-600"
                    onClick={() => setIsOperatorHidden(!isOperatorHidden)}
                  >
                    {isOperatorHidden ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                    {isOperatorHidden ? 'Show Info' : 'Hide Info'}
                  </Button>
                )}
              </div>
              
              <div className={cn(
                "p-4 rounded-lg border transition-all",
                isOperatorHidden 
                  ? "bg-slate-50 border-dashed border-slate-300 flex flex-col items-center justify-center py-8 text-center" 
                  : "bg-white border-slate-200"
              )}>
                {isOperatorHidden ? (
                  <>
                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center mb-2">
                      <EyeOff className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Operator Information Hidden</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                      The seller has chosen to keep the operator details confidential at this stage.
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-brand-orange" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{listing.seller.companyName || 'Same as Seller'}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Primary Operator</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h5 className="text-blue-900 font-semibold text-sm mb-1">About the Seller</h5>
              <p className="text-blue-800/80 text-sm leading-relaxed">
                {listing.seller.companyName || listing.seller.name} is a {listing.seller.companyType?.toLowerCase() || 'private'} entity focused on developing high-value assets in the {listing.location.country} region.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
