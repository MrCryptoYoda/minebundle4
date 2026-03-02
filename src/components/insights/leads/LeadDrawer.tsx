import React from 'react';
import { Lead } from '@/data/insightsMockData';
import { useInsights } from '@/context/InsightsContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  UserPlus, 
  FileDown, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Target, 
  TrendingUp, 
  Lock,
  Sparkles,
  Calendar,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

export function LeadDrawer({ lead, open, onClose }: LeadDrawerProps) {
  const { plan } = useInsights();
  const isPaid = plan === 'SP_PAID';

  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl p-0 flex flex-col bg-[#1C1C24] border-l border-slate-800">
        <SheetHeader className="sr-only">
          <SheetTitle>Lead Details: {lead.title}</SheetTitle>
          <SheetDescription>Details and actions for lead {lead.title}</SheetDescription>
        </SheetHeader>
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 bg-[#1C1C24]">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <Badge variant="outline" className="mb-2 bg-[#13131A] text-slate-400 border-slate-700 font-normal">
                  {lead.docType} • {new Date(lead.postedAt).toLocaleDateString()}
                </Badge>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {lead.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="font-semibold text-slate-200">{lead.company}</span>
                  <span>•</span>
                  <span>{lead.ticker} ({lead.exchange})</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-700 bg-transparent hover:bg-slate-800">
                  <Bookmark className="h-4 w-4 text-slate-400" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-700 bg-transparent hover:bg-slate-800">
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="h-8 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-4 border-none">
                Mark Contacted
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full px-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent" asChild>
                <Link to={`/insights/leads/${lead.id}`}>
                  View Full Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full px-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">
                <FileDown className="mr-2 h-3.5 w-3.5" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="px-6 pt-2 border-b border-slate-800">
              <TabsList className="bg-transparent h-12 gap-6 p-0 w-full justify-start">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange text-slate-400 rounded-none px-0 pb-2 h-full font-medium"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="changes" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange text-slate-400 rounded-none px-0 pb-2 h-full font-medium"
                >
                  Changes
                  {lead.changes && lead.changes.length > 0 && (
                    <span className="ml-2 bg-brand-orange/10 text-brand-orange text-[10px] px-1.5 py-0.5 rounded-full">
                      {lead.changes.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="signals" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange text-slate-400 rounded-none px-0 pb-2 h-full font-medium group"
                >
                  Signals
                  {!isPaid && <Lock className="ml-2 h-3 w-3 text-slate-500" />}
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange text-slate-400 rounded-none px-0 pb-2 h-full font-medium"
                >
                  Notes & Tasks
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 bg-[#13131A]">
              <div className="p-6 space-y-8">
                
                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-8 mt-0 focus-visible:ring-0">
                  {/* AI Summary */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand-orange" />
                      <h3 className="font-semibold text-white">AI Summary</h3>
                    </div>
                    <div className="bg-[#1C1C24] p-4 rounded-2xl border border-slate-800 shadow-sm text-sm text-slate-300 leading-relaxed">
                      {lead.aiSummary}
                    </div>
                  </section>

                  {/* Key Facts */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-white">Key Extracted Facts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#1C1C24] p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 block mb-1">Commodity</span>
                        <span className="font-medium text-slate-200">{lead.commodity.join(', ')}</span>
                      </div>
                      <div className="bg-[#1C1C24] p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 block mb-1">Stage</span>
                        <span className="font-medium text-slate-200">{lead.stage.join(', ')}</span>
                      </div>
                      <div className="bg-[#1C1C24] p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 block mb-1">Region</span>
                        <span className="font-medium text-slate-200">{lead.region.join(', ')}</span>
                      </div>
                      <div className="bg-[#1C1C24] p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 block mb-1">Funding</span>
                        <span className="font-medium text-slate-200">See document</span>
                      </div>
                    </div>
                  </section>

                  {/* Suggested Actions */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-white">Suggested Next Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start h-auto py-3 bg-[#1C1C24] hover:bg-slate-800 border-slate-800 text-slate-300">
                        <Mail className="mr-3 h-4 w-4 text-slate-500" />
                        <div className="text-left">
                          <div className="font-medium text-sm">Draft outreach email</div>
                          <div className="text-xs text-slate-500 font-normal">Use template "Introduction to Mining Services"</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-auto py-3 bg-[#1C1C24] hover:bg-slate-800 border-slate-800 text-slate-300">
                        <Clock className="mr-3 h-4 w-4 text-slate-500" />
                        <div className="text-left">
                          <div className="font-medium text-sm">Set reminder</div>
                          <div className="text-xs text-slate-500 font-normal">Follow up in 3 days</div>
                        </div>
                      </Button>
                    </div>
                  </section>
                </TabsContent>

                {/* CHANGES TAB */}
                <TabsContent value="changes" className="space-y-6 mt-0 focus-visible:ring-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">What changed since your last view</h3>
                    <Badge variant="outline" className="bg-[#1C1C24] text-slate-400 border-slate-700">Last view: 2 days ago</Badge>
                  </div>

                  {lead.changes && lead.changes.length > 0 ? (
                    <div className="space-y-4">
                      {lead.changes.map((change, i) => (
                        <div key={i} className="bg-[#1C1C24] p-4 rounded-xl border border-slate-800 shadow-sm flex gap-4">
                          <div className="mt-1 h-8 w-8 rounded-full bg-blue-900/20 flex items-center justify-center shrink-0 border border-blue-900/30">
                            <TrendingUp className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium text-slate-200">
                              {change.field} updated
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-slate-500 line-through">{change.oldValue}</span>
                              <ArrowRight className="h-3 w-3 text-slate-600" />
                              <span className="text-emerald-400 font-medium">{change.newValue}</span>
                            </div>
                            <div className="text-xs text-slate-500 pt-1">
                              Detected {new Date(change.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-[#1C1C24] rounded-xl border border-dashed border-slate-800">
                      <div className="h-12 w-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-6 w-6 text-slate-500" />
                      </div>
                      <p className="text-slate-400 font-medium">No changes detected since last view</p>
                    </div>
                  )}
                </TabsContent>

                {/* SIGNALS TAB (PREMIUM) */}
                <TabsContent value="signals" className="space-y-8 mt-0 focus-visible:ring-0 relative">
                  {!isPaid && (
                    <div className="absolute inset-0 z-10 bg-[#13131A]/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8">
                      <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-xl border border-slate-700">
                        <Lock className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Unlock Premium Signals</h3>
                      <p className="text-slate-400 max-w-xs mb-6 text-sm">
                        Get access to Fit Scores, Urgency ratings, and Procurement Readiness analysis.
                      </p>
                      <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
                        Upgrade Plan
                      </Button>
                    </div>
                  )}

                  {/* Decision Window */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-white">Decision Window</h3>
                    <div className="bg-[#1C1C24] p-5 rounded-2xl border border-slate-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                          lead.urgency === 'Act now' ? "bg-red-900/20 text-red-400 border border-red-900/30" : "bg-slate-800 text-slate-400 border border-slate-700"
                        )}>
                          {lead.urgency}
                        </div>
                        <span className="text-sm text-slate-500">Based on project timeline</span>
                      </div>
                      <p className="text-sm text-slate-300">
                        Tender issued 2 days ago. Closing date is in 14 days. Immediate action required to register interest.
                      </p>
                    </div>
                  </section>

                  {/* Opportunity Fit Score */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-white">Opportunity Fit Score</h3>
                    <div className="bg-[#1C1C24] p-5 rounded-2xl border border-slate-800 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">Total Score</span>
                        <span className="text-2xl font-bold text-emerald-500">{lead.fitScore}/100</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${lead.fitScore}%` }} />
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Region Match</span>
                          <span className="text-slate-200 font-medium">100%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Service Category Match</span>
                          <span className="text-slate-200 font-medium">90%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Commodity Match</span>
                          <span className="text-slate-200 font-medium">85%</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Procurement Readiness */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-white">Procurement Readiness</h3>
                    <div className="bg-[#1C1C24] p-5 rounded-2xl border border-slate-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-brand-orange" />
                        <span className="font-bold text-slate-200">{lead.procurementReadiness}</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Inferred from announcement wording "commencing immediately" and "contractors mobilized".
                      </p>
                    </div>
                  </section>
                </TabsContent>

                {/* NOTES TAB */}
                <TabsContent value="notes" className="space-y-6 mt-0 focus-visible:ring-0">
                  <div className="bg-[#1C1C24] p-4 rounded-xl border border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-semibold text-white">Internal Notes</h3>
                    <textarea 
                      className="w-full min-h-[100px] p-3 rounded-lg border border-slate-800 bg-[#13131A] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange placeholder:text-slate-600"
                      placeholder="Add notes about this lead..."
                    />
                    <div className="flex justify-end">
                      <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Save Note</Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-white">Tasks</h3>
                    <div className="bg-[#1C1C24] p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="h-5 w-5 rounded border border-slate-600 flex items-center justify-center cursor-pointer hover:border-brand-orange bg-[#13131A]"></div>
                      <span className="text-sm text-slate-300 flex-1">Email outreach to Project Manager</span>
                      <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">Tomorrow</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-slate-500 hover:text-brand-orange border border-dashed border-slate-700 hover:bg-slate-800">
                      + Add Task
                    </Button>
                  </div>
                </TabsContent>

              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
