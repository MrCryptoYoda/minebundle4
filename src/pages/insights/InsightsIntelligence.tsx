import React from 'react';
import { useInsights } from '@/context/InsightsContext';
import { ExpandedMarketIntelligence } from '@/components/insights/ExpandedMarketIntelligence';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function InsightsIntelligence() {
  const { plan, setPlan } = useInsights();
  const isPaid = plan === 'SP_PAID';

  if (!isPaid) {
    return (
      <div className="relative min-h-[80vh] p-6">
        {/* Blurred Background Content */}
        <div className="absolute inset-0 overflow-hidden filter blur-lg opacity-30 pointer-events-none p-6">
           <ExpandedMarketIntelligence onCollapse={() => {}} />
        </div>

        {/* Paywall Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 p-6">
          <Card className="max-w-lg w-full shadow-2xl border-brand-orange/20 bg-[#1C1C24]">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-brand-orange/10 p-4 rounded-full w-fit mb-4">
                <Lock className="h-10 w-10 text-brand-orange" />
              </div>
              <CardTitle className="text-2xl text-white">Unlock Market Intelligence</CardTitle>
              <CardDescription className="text-base text-slate-400">
                Get real-time commodity trends, funding data, and competitor analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Live <strong>Commodity Prices</strong> & Trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Competitor <strong>Fundraising</strong> Alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Project <strong>Stage Changes</strong></span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-lg py-6 text-white border-none" asChild>
                <Link to="/insights/billing">View Plans & Upgrade</Link>
              </Button>
              <div className="text-center text-xs text-slate-500 mt-2">
                <span className="block mb-2">Demo Control:</span>
                <Button variant="link" size="sm" onClick={() => setPlan('SP_PAID')} className="text-brand-orange">
                  [Simulate Upgrade]
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto text-slate-100">
      <ExpandedMarketIntelligence onCollapse={() => {}} />
    </div>
  );
}
