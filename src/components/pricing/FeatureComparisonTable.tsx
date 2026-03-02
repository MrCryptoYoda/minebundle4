import React from 'react';
import { Check, Minus } from 'lucide-react';
import { COMPARISON_FEATURES, PRICING_TIERS, Feature, FeatureCategory } from '@/data/pricingData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FeatureComparisonTable() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">Compare Plans</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="p-4 font-medium text-slate-500 w-1/4">Features</th>
              {PRICING_TIERS.map((tier) => (
                <th key={tier.id} className="p-4 font-semibold text-slate-900 text-center w-1/4">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_FEATURES.map((category: FeatureCategory, catIndex: number) => (
              <React.Fragment key={catIndex}>
                <tr className="bg-slate-50/50 border-y border-slate-100">
                  <td colSpan={4} className="p-3 font-semibold text-slate-900 pl-4">
                    {category.category}
                  </td>
                </tr>
                {category.features.map((feature: Feature, featIndex: number) => (
                  <tr key={featIndex} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 text-slate-600 font-medium">{feature.name}</td>
                    {PRICING_TIERS.map((tier) => {
                      const value = feature.tiers[tier.id as keyof typeof feature.tiers];
                      return (
                        <td key={tier.id} className="p-4 text-center">
                          {value === true ? (
                            <Check className="h-5 w-5 text-brand-orange mx-auto" />
                          ) : value === false ? (
                            <Minus className="h-5 w-5 text-slate-300 mx-auto" />
                          ) : (
                            <span className="text-slate-900 font-medium">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {PRICING_TIERS.map((tier) => (
            <AccordionItem key={tier.id} value={tier.id}>
              <AccordionTrigger className="text-lg font-semibold text-slate-900 px-4">
                {tier.name} Features
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-6">
                  {COMPARISON_FEATURES.map((category: FeatureCategory, catIndex: number) => (
                    <div key={catIndex}>
                      <h4 className="font-medium text-slate-900 mb-2 text-sm uppercase tracking-wide text-xs text-slate-500 mt-4 first:mt-0">
                        {category.category}
                      </h4>
                      <ul className="space-y-3">
                        {category.features.map((feature: Feature, featIndex: number) => {
                          const value = feature.tiers[tier.id as keyof typeof feature.tiers];
                          if (value === false) return null; 
                          
                          return (
                            <li key={featIndex} className="flex items-start justify-between text-sm border-b border-slate-50 pb-2 last:border-0">
                              <span className="text-slate-600">{feature.name}</span>
                              <span className="font-medium text-slate-900 ml-4 text-right">
                                {(value as any) === true ? (
                                  <Check className="h-4 w-4 text-brand-orange" />
                                ) : (
                                  value
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
