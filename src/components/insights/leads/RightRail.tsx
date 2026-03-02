import React from 'react';
import { useInsights } from '@/context/InsightsContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Target, 
  Lock, 
  ChevronRight,
  Sparkles,
  Users,
  Newspaper
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function RightRail() {
  const { plan } = useInsights();
  const isPaid = plan === 'SP_PAID';

  return (
    <div className="space-y-6 w-full max-w-sm">
      
      {/* Daily Focus Widget */}
      <Card className="border-slate-800 shadow-sm bg-gradient-to-br from-[#1C1C24] to-[#13131A]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Daily Focus</CardTitle>
            <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 border-brand-orange/20">
              3 Actionable
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2D2D35] border border-transparent hover:border-slate-700 transition-all cursor-pointer group">
            <div className="h-8 w-8 rounded-full bg-red-900/20 flex items-center justify-center shrink-0 border border-red-900/30">
              <Zap className="h-4 w-4 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate group-hover:text-brand-orange">Aurum Resources DFS</p>
              <p className="text-xs text-slate-500 truncate">Act now • High fit</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2D2D35] border border-transparent hover:border-slate-700 transition-all cursor-pointer group">
             <div className="h-8 w-8 rounded-full bg-emerald-900/20 flex items-center justify-center shrink-0 border border-emerald-900/30">
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate group-hover:text-brand-orange">Green Energy Permit</p>
              <p className="text-xs text-slate-500 truncate">Procurement ready</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
          </div>
        </CardContent>
      </Card>

      {/* Uncontacted Leads */}
      <Card className="bg-[#1C1C24] text-white border-slate-800 shadow-md overflow-hidden relative">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Target className="h-24 w-24 text-slate-500" />
        </div>
        <CardContent className="p-6">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Uncontacted Leads</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-white">12</span>
            <span className="text-sm text-slate-400">new this week</span>
          </div>
          <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
            View Leads
          </Button>
        </CardContent>
      </Card>

      {/* All Contacted Leads */}
      <Card className="bg-[#1C1C24] text-white border-slate-800 shadow-md overflow-hidden relative">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Users className="h-24 w-24 text-slate-500" />
        </div>
        <CardContent className="p-6">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Contacted Leads</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-white">45</span>
            <span className="text-sm text-slate-400">total active</span>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">
            View History
          </Button>
        </CardContent>
      </Card>

      {/* AI Opportunity Radar (Premium) */}
      <Card className="border-slate-800 shadow-sm overflow-hidden relative bg-[#1C1C24]">
        {!isPaid && (
          <div className="absolute inset-0 z-10 bg-[#13131A]/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
            <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center mb-3 shadow-lg border border-slate-700">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-bold text-white mb-1">Unlock Radar</h4>
            <p className="text-xs text-slate-400 mb-4">See real-time market signals.</p>
            <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Upgrade</Button>
          </div>
        )}
        
        <CardHeader className="pb-2 border-b border-slate-800 bg-[#13131A]/50">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-purple-900/20 flex items-center justify-center border border-purple-900/30">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            </div>
            <CardTitle className="text-sm font-bold text-slate-200">AI Opportunity Radar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800">
            <div className="p-3 hover:bg-[#2D2D35] transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-purple-400 bg-purple-900/20 px-1.5 py-0.5 rounded border border-purple-900/30">Hot Region</span>
                <span className="text-[10px] text-slate-500">2h ago</span>
              </div>
              <p className="text-sm font-medium text-slate-200 mb-1">Funding raises in WA</p>
              <p className="text-xs text-slate-500">3 companies raised $15M+ for drilling in Goldfields.</p>
            </div>
            <div className="p-3 hover:bg-[#2D2D35] transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-blue-400 bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-900/30">Trend</span>
                <span className="text-[10px] text-slate-500">5h ago</span>
              </div>
              <p className="text-sm font-medium text-slate-200 mb-1">Projects moved to PFS</p>
              <p className="text-xs text-slate-500">High conversion rate in Lithium sector this month.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Intelligence Mini */}
      <Card className="border-slate-800 shadow-sm bg-[#1C1C24]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Market Pulse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-900/20 flex items-center justify-center border border-yellow-900/30">
                <span className="text-xs font-bold text-yellow-500">Au</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Gold</p>
                <p className="text-xs text-slate-500">$2,045 /oz</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.2%
              </div>
              <p className="text-[10px] text-slate-500">1M Trend</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-900/20 flex items-center justify-center border border-orange-900/30">
                <span className="text-xs font-bold text-orange-500">Cu</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Copper</p>
                <p className="text-xs text-slate-500">$3.85 /lb</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-red-500 text-xs font-medium">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.5%
              </div>
              <p className="text-[10px] text-slate-500">1M Trend</p>
            </div>
          </div>

          <Button variant="outline" className="w-full text-xs h-8 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 bg-transparent">
            View Full Intelligence
          </Button>
        </CardContent>
      </Card>

      {/* Latest News Feed */}
      <Card className="border-slate-800 shadow-sm bg-[#1C1C24]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-slate-400" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Latest News</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="group cursor-pointer">
              <p className="text-xs text-slate-500 mb-1">Mining Weekly • 2h ago</p>
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-brand-orange leading-snug">
                BHP announces new copper expansion in South Australia
              </h4>
            </div>
            <div className="h-px bg-slate-800" />
            <div className="group cursor-pointer">
              <p className="text-xs text-slate-500 mb-1">Reuters • 4h ago</p>
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-brand-orange leading-snug">
                Lithium prices stabilize as EV demand forecasts revised
              </h4>
            </div>
            <div className="h-px bg-slate-800" />
            <div className="group cursor-pointer">
              <p className="text-xs text-slate-500 mb-1">ASX Announcements • 5h ago</p>
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-brand-orange leading-snug">
                Pilbara Minerals quarterly production report
              </h4>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500 hover:text-white hover:bg-slate-800">
            View All News
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
