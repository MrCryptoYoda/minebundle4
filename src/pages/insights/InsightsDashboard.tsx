import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Zap, Flame, CheckCircle2, AlertCircle, ArrowUpRight, Target, Briefcase } from "lucide-react"
import { MOCK_LEADS } from "@/data/insightsMockData"
import { cn } from "@/lib/utils"
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useInsights } from '@/context/InsightsContext';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { useProfileStore } from '@/store/profileStore';
import { LeadCard } from '@/components/insights/leads/LeadCard';

export default function InsightsDashboard() {
  const { plan } = useInsights();
  const isFree = plan === 'SP_FREE';
  const completeness = useProfileStore(state => state.calculateCompleteness());

  // Filter for "Top Leads" - e.g., high fit score or high urgency
  const topLeads = MOCK_LEADS
    .filter(lead => lead.fitScore >= 85 || lead.urgency === 'Act now')
    .slice(0, 3);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto text-slate-100">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Command Center
          </h1>
          <p className="text-slate-400 mt-1 text-lg">Your daily overview of pipeline performance and high-priority actions.</p>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-2">
                <Zap className="h-4 w-4" />
                Quick Actions
             </Button>
             <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
                <Target className="h-4 w-4" />
                Find New Leads
             </Button>
        </div>
      </div>

      {/* Profile Completion Banner */}
      {completeness < 100 && (
        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-4">
            <div className="bg-brand-orange/20 p-2 rounded-full mt-1 md:mt-0">
              <AlertCircle className="h-5 w-5 text-brand-orange" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Complete your profile ({completeness}%)</h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                Your profile is incomplete. Add more details about your services, team, and compliance to improve your lead matching score and visibility to project owners.
              </p>
            </div>
          </div>
          <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white whitespace-nowrap shrink-0">
            <Link to="/insights/onboarding">
              Finish Profile <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1C1C24] border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Briefcase className="h-5 w-5 text-emerald-500" />
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex gap-1 items-center">
                            <ArrowUpRight className="h-3 w-3" /> +12%
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-white">$2.4M</h3>
                        <p className="text-sm text-slate-400 font-medium">Pipeline Value</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="bg-[#1C1C24] border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Target className="h-5 w-5 text-blue-500" />
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex gap-1 items-center">
                            <ArrowUpRight className="h-3 w-3" /> +5%
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-white">18%</h3>
                        <p className="text-sm text-slate-400 font-medium">Win Rate</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#1C1C24] border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-brand-orange/10 rounded-lg">
                            <Flame className="h-5 w-5 text-brand-orange" />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Last 30 days</span>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-white">8</h3>
                        <p className="text-sm text-slate-400 font-medium">Active Leads</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Daily Focus (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">Daily Focus</h2>
                  <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange border-0 font-medium px-2.5 py-0.5 rounded-full text-xs">
                      Top 3 Priorities
                  </Badge>
              </div>
              <Button variant="link" className="text-brand-orange hover:text-brand-orange/80 p-0 h-auto text-sm" asChild>
                  <Link to="/insights/leads">View all leads <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>

            <div className="space-y-4">
              {topLeads.map((lead) => (
                <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    onClick={() => {}} 
                    isSelected={false}
                />
              ))}
              {topLeads.length === 0 && (
                  <div className="text-center py-12 bg-[#1C1C24] rounded-[24px] border border-slate-800 border-dashed">
                      <p className="text-slate-400">No high priority leads found today.</p>
                      <Button variant="link" className="text-brand-orange" asChild>
                          <Link to="/insights/leads">Browse all leads</Link>
                      </Button>
                  </div>
              )}
            </div>

            {/* Market Intelligence */}
            <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all rounded-[32px]">
                <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-base font-bold text-white">Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-2">
                <LockedOverlay isLocked={isFree} title="Market Intelligence" description="Get live commodity prices and trends." className="h-full">
                  <div className="divide-y divide-slate-800">
                      {[
                          { name: 'Gold', price: '$2,341.60', change: '+1.2%', up: true, data: [2300, 2310, 2305, 2320, 2335, 2341] },
                          { name: 'Uranium', price: '$91.25', change: '+1.6%', up: true, data: [88, 89, 90, 89, 90, 91] },
                          { name: 'Copper', price: '$4.57', change: '+0.7%', up: true, data: [4.2, 4.3, 4.4, 4.5, 4.55, 4.57] }
                      ].map((item, i) => (
                          <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer group">
                              <div>
                                  <span className="block font-bold text-slate-200 text-sm">{item.name}</span>
                                  <span className="block text-xs text-slate-500 font-mono mt-0.5">{item.price}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                  <div className="h-8 w-16">
                                      <ResponsiveContainer width="100%" height="100%">
                                          <AreaChart data={item.data.map((val, idx) => ({ val, idx }))}>
                                              <Area type="monotone" dataKey="val" stroke={item.up ? "#10B981" : "#EF4444"} fill="transparent" strokeWidth={2} />
                                          </AreaChart>
                                      </ResponsiveContainer>
                                  </div>
                                  <span className={cn("text-[10px] font-bold mt-1", item.up ? "text-emerald-500" : "text-red-500")}>{item.change}</span>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="p-4 pt-0">
                      <Button variant="ghost" size="sm" className="w-full bg-[#2D2D35] hover:bg-slate-700 text-slate-300 rounded-xl h-9 text-xs font-medium border border-slate-700" asChild>
                          <Link to="/insights/intelligence">View market data</Link>
                      </Button>
                  </div>
                </LockedOverlay>
                </CardContent>
            </Card>
          </div>

          {/* Right Column: Widgets (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex flex-col gap-6">
              {/* Uncontacted Leads Widget */}
              <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative rounded-[32px]">
                  <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-full bg-[#2D2D35] flex items-center justify-center text-white mb-4">
                          <Zap className="h-5 w-5 fill-current text-brand-orange" />
                      </div>
                      <h3 className="font-bold text-white text-lg leading-tight">New Opportunities</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          3 new uncontacted leads waiting for your review.
                      </p>
                      <Button variant="secondary" className="w-full mt-4 bg-[#2D2D35] hover:bg-slate-700 text-white rounded-xl h-9 text-xs font-medium border border-slate-700" asChild>
                          <Link to="/insights/leads?filter=new">Review now</Link>
                      </Button>
                  </CardContent>
              </Card>

              {/* Contacted Leads Widget */}
              <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all rounded-[32px]">
                  <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-full bg-[#2D2D35] flex items-center justify-center text-white mb-4">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      </div>
                      <h3 className="font-bold text-white text-lg leading-tight">Follow Ups</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          2 leads contacted. Follow up required for Gold Processing.
                      </p>
                      <Button variant="secondary" className="w-full mt-4 bg-[#2D2D35] hover:bg-slate-700 text-white rounded-xl h-9 text-xs font-medium border border-slate-700" asChild>
                          <Link to="/insights/leads?filter=contacted">View contacted</Link>
                      </Button>
                  </CardContent>
              </Card>
            </div>

            {/* AI Opportunity Radar */}
            <Card className="bg-gradient-to-br from-[#1C1C24] to-[#13131A] text-white border-slate-800 shadow-xl shadow-black/20 overflow-hidden relative rounded-[32px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-3xl rounded-full -mr-8 -mt-8" />
              
              <CardContent className="p-6 relative z-10">
                <LockedOverlay isLocked={isFree} title="AI Opportunity Radar" description="Unlock real-time opportunity signals with Pro.">
                  <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold">AI Opportunity Radar</h3>
                        <p className="text-slate-400 text-xs mt-0.5">Emerging Signals Based On Your Services</p>
                      </div>
                  </div>

                  <div className="space-y-5">
                    {[1, 2].map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <Flame className="h-4 w-4 text-brand-orange fill-current" />
                                    <span className="text-brand-orange font-bold text-sm">Hot</span>
                                </div>
                                <span className="text-slate-500 font-mono text-xs font-medium">{i === 0 ? '$2M - $5M' : '$4M - $8M'}</span>
                            </div>
                            <p className="text-slate-200 text-sm font-medium leading-snug group-hover:text-brand-orange transition-colors">
                                {i === 0 ? "4 companies raised funds for drilling in WA last 7 days" : "2 projects moved to PFS stage in copper"}
                            </p>
                            <div className="mt-2 text-xs text-slate-500">
                                Why this matters to you: <br/>
                                <span className="text-slate-400">Multiple exploration campaigns will need RC Drilling soon.</span>
                            </div>
                        </div>
                    ))}
                  </div>
                </LockedOverlay>
              </CardContent>
            </Card>

            <div className="space-y-6">
                  {/* Services Listed */}
                  <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[32px]">
                      <CardContent className="p-6">
                          <h3 className="font-bold text-white text-sm">Number of Services listed</h3>
                          <div className="mt-3">
                              <div className="flex justify-between items-end mb-2">
                                  <span className="text-2xl font-bold text-brand-orange">24</span>
                                  <span className="text-xs text-slate-500 font-medium mb-1">of 50 available</span>
                              </div>
                              <div className="h-2 w-full bg-[#2D2D35] rounded-full overflow-hidden">
                                  <div className="h-full bg-brand-orange w-[48%]" />
                              </div>
                              <Button variant="outline" className="w-full mt-4 rounded-xl h-9 text-xs border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white" asChild>
                                  <Link to="/insights/service-listings">
                                    + Create new service listing
                                  </Link>
                              </Button>
                          </div>
                      </CardContent>
                  </Card>

                  {/* Team Members */}
                  <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[32px] overflow-hidden">
                      <CardContent className="p-0">
                          <div className="h-24 bg-[#2D2D35] relative">
                               {/* Placeholder for Map */}
                               <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center invert" />
                               <div className="absolute bottom-3 right-3 text-right">
                                   <div className="text-xs text-slate-400 font-medium">Operations spread</div>
                                   <div className="text-lg font-bold text-white">$195M</div>
                               </div>
                          </div>
                          <div className="p-4 flex items-center justify-between bg-[#1C1C24]">
                              <span className="text-xs font-bold text-slate-300">Number of team members</span>
                              <div className="flex -space-x-2">
                                  {[1,2,3].map(i => (
                                      <div key={i} className="h-6 w-6 rounded-full bg-slate-700 border-2 border-[#1C1C24] flex items-center justify-center text-[8px] font-bold text-slate-300 overflow-hidden">
                                          <img src={`https://picsum.photos/seed/${i}/100`} className="h-full w-full rounded-full object-cover" />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>

          </div>
        </div>
      </div>
    </div>
  )
}
