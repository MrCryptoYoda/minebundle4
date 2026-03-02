import React from 'react';
import { VALUE_BLOCKS } from '@/data/pricingData';
import { Search, TrendingUp, MessageSquare, Target } from 'lucide-react';

const ICON_MAP = {
  Search,
  TrendingUp,
  MessageSquare,
  Target,
};

export function ValueBlocks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-4 max-w-7xl mx-auto">
      {VALUE_BLOCKS.map((block, index) => {
        const Icon = ICON_MAP[block.icon as keyof typeof ICON_MAP];
        return (
          <div key={index} className="flex flex-col items-start gap-4 p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{block.description}</p>
          </div>
        );
      })}
    </div>
  );
}
