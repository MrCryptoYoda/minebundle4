import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Check } from 'lucide-react';
import { useInsights } from '@/context/InsightsContext';

export default function InsightsBilling() {
  const { plan, setPlan } = useInsights();

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Unlock the full power of the Insights Workspace with our Pro plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className={`p-8 rounded-3xl border-2 ${plan === 'SP_FREE' ? 'border-slate-700 bg-[#1C1C24] shadow-sm' : 'border-slate-800 bg-[#13131A]'}`}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Free</h3>
            <p className="text-slate-400 text-sm mt-2">Basic access to leads and marketplace.</p>
            <div className="mt-4 text-3xl font-bold text-white">$0 <span className="text-sm font-normal text-slate-500">/mo</span></div>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check className="h-4 w-4 text-slate-500" />
              Access to public leads
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check className="h-4 w-4 text-slate-500" />
              Basic filtering
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-600 line-through">
              <Check className="h-4 w-4 text-slate-700" />
              AI Opportunity Radar
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-600 line-through">
              <Check className="h-4 w-4 text-slate-700" />
              Fit Scores & Urgency
            </li>
          </ul>
          <Button 
            variant={plan === 'SP_FREE' ? 'outline' : 'ghost'} 
            className={`w-full rounded-full ${plan === 'SP_FREE' ? 'border-slate-600 text-white hover:bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            onClick={() => setPlan('SP_FREE')}
            disabled={plan === 'SP_FREE'}
          >
            {plan === 'SP_FREE' ? 'Current Plan' : 'Downgrade'}
          </Button>
        </div>

        {/* Pro Plan */}
        <div className={`p-8 rounded-3xl border-2 relative overflow-hidden ${plan === 'SP_PAID' ? 'border-brand-orange bg-[#1C1C24] shadow-xl ring-4 ring-brand-orange/10' : 'border-slate-700 bg-[#1C1C24]'}`}>
          {plan === 'SP_PAID' && (
            <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              ACTIVE
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Pro</h3>
            <p className="text-slate-400 text-sm mt-2">Full intelligence suite for serious growth.</p>
            <div className="mt-4 text-3xl font-bold text-white">$199 <span className="text-sm font-normal text-slate-500">/mo</span></div>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-5 w-5 rounded-full bg-emerald-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              <strong>Unlimited</strong> lead access
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-5 w-5 rounded-full bg-emerald-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              AI Opportunity Radar
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-5 w-5 rounded-full bg-emerald-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              Fit Scores & Urgency Ratings
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-5 w-5 rounded-full bg-emerald-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              Procurement Readiness
            </li>
          </ul>
          <Button 
            className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full h-12 text-base font-medium shadow-lg shadow-brand-orange/20 border-none"
            onClick={() => setPlan('SP_PAID')}
            disabled={plan === 'SP_PAID'}
          >
            {plan === 'SP_PAID' ? 'Current Plan' : 'Upgrade to Pro'}
          </Button>
        </div>
      </div>
    </div>
  );
}
