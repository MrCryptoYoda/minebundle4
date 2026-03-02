import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PricingTier } from '@/data/pricingData';

interface PricingTierCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  onCtaClick: (tierId: string) => void;
  customCtaText?: string;
  isCurrentPlan?: boolean;
}

export function PricingTierCard({ 
  tier, 
  isAnnual, 
  onCtaClick, 
  customCtaText, 
  isCurrentPlan 
}: PricingTierCardProps) {
  const price = isAnnual ? tier.price.annual : tier.price.monthly;
  const period = price !== 'Contact' ? '/month' : '';
  
  // Determine CTA state
  const ctaLabel = isCurrentPlan ? 'Current Plan' : (customCtaText || tier.ctaText);
  const isDisabled = tier.isDisabled && !isCurrentPlan; 
  // Note: Tier 2/3 are disabled by default in data, but we might want to enable "Talk to Sales" click
  // The requirement says Tier 3 CTA opens contact modal. So it shouldn't be "disabled" in the UI button sense, just "not purchasable".
  // But Tier 2 is "Coming Soon" which IS disabled.
  
  const isTalkToSales = tier.id === 'tier3';
  const isComingSoon = tier.id === 'tier2';
  
  // Logic for button variant and disabled state
  let buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" = "outline";
  if (tier.isPopular) buttonVariant = "default";
  if (isCurrentPlan) buttonVariant = "secondary";

  return (
    <Card className={`flex flex-col h-full border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${tier.isPopular ? 'border-brand-orange/50 ring-1 ring-brand-orange/50 relative' : ''}`}>
      {tier.isPopular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <Badge className="bg-brand-orange hover:bg-brand-orange text-white border-0 shadow-sm">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-bold text-slate-900">{tier.name}</CardTitle>
          {tier.badge && !tier.isPopular && (
            <Badge variant="secondary" className="text-xs font-normal text-slate-500 bg-slate-100">
              {tier.badge}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm text-slate-500 min-h-[40px]">
          {tier.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <div className="mb-6">
          <span className="text-3xl font-bold text-slate-900">{price}</span>
          <span className="text-slate-500 ml-1">{period}</span>
        </div>
        
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
              <Check className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className={`w-full ${tier.isPopular ? 'bg-brand-orange hover:bg-brand-orange/90 text-white' : ''}`}
          variant={buttonVariant}
          disabled={isComingSoon || isCurrentPlan}
          onClick={() => onCtaClick(tier.id)}
        >
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
