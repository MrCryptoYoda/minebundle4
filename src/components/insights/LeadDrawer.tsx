import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Lead } from "@/data/mockLeadsData"
import { useDemo } from "@/context/DemoContext"
import { cn } from "@/lib/utils"
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  UserPlus, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Lock,
  Calendar,
  MessageSquare,
  Clock
} from "lucide-react"

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

export function LeadDrawer({ lead, open, onClose }: LeadDrawerProps) {
  const { hasInsightsSubscription } = useDemo()

  if (!lead) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full bg-white border-l border-slate-200 shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Lead Details: {lead.title}</SheetTitle>
          <SheetDescription>Details for lead {lead.title}</SheetDescription>
        </SheetHeader>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-start justify-between gap-4 mb-2">
            <Badge variant="outline" className="bg-white text-slate-500 border-slate-200 font-normal text-[10px] uppercase tracking-wide">
              {lead.docType}
            </Badge>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">
            {lead.title}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <span className="font-medium text-slate-700">{lead.company}</span>
            <span>•</span>
            <span>{lead.ticker}:{lead.exchange}</span>
            <span>•</span>
            <span>{lead.postedAt}</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
              <ExternalLink className="h-3.5 w-3.5 mr-2" />
              Open Source
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
              <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
              Mark Contacted
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
              <UserPlus className="h-3.5 w-3.5 mr-2" />
              Assign
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
              <FileText className="h-3.5 w-3.5 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 border-b border-slate-100 bg-white">
            <TabsList className="h-10 bg-transparent p-0 gap-6">
              <TabsTrigger value="overview" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange px-0 font-medium text-slate-500 hover:text-slate-700 bg-transparent shadow-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="changes" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange px-0 font-medium text-slate-500 hover:text-slate-700 bg-transparent shadow-none">
                Changes
                {lead.changes && lead.changes.length > 0 && (
                  <span className="ml-1.5 bg-brand-orange text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {lead.changes.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="signals" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange px-0 font-medium text-slate-500 hover:text-slate-700 bg-transparent shadow-none flex items-center gap-1.5">
                Signals
                {!hasInsightsSubscription && <Lock className="h-3 w-3 text-slate-400" />}
              </TabsTrigger>
              <TabsTrigger value="notes" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange data-[state=active]:text-brand-orange px-0 font-medium text-slate-500 hover:text-slate-700 bg-transparent shadow-none">
                Notes & Tasks
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 bg-slate-50/30">
            <div className="p-6 space-y-6">
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                {/* AI Summary */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    AI Summary
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lead.aiSummary}
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Key Extracted Facts</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Project</span>
                      <span className="text-sm font-medium text-slate-900">Hemi Gold Project</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Commodity</span>
                      <span className="text-sm font-medium text-slate-900">{lead.commodity}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Stage</span>
                      <span className="text-sm font-medium text-slate-900">{lead.stage}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Timeline</span>
                      <span className="text-sm font-medium text-slate-900">Q3 2024 (DFS)</span>
                    </div>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Suggested Next Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-slate-600 hover:text-brand-orange hover:border-brand-orange/30 h-10">
                      <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                      Draft outreach email
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-slate-600 hover:text-brand-orange hover:border-brand-orange/30 h-10">
                      <Clock className="h-4 w-4 mr-3 text-slate-400" />
                      Add reminder for Tuesday
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Changes Tab */}
              <TabsContent value="changes" className="space-y-4 mt-0">
                {lead.changes && lead.changes.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">What changed since last view</h3>
                      <span className="text-xs text-slate-500">Last viewed 2 days ago</span>
                    </div>
                    {lead.changes.map((change) => (
                      <div key={change.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-3">
                        <div className="mt-1">
                          <div className="h-2 w-2 rounded-full bg-brand-orange" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium text-slate-900">{change.field} updated</span>
                            <span className="text-xs text-slate-400">{change.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-500 line-through">{change.oldValue}</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 rounded">{change.newValue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">No changes detected</h3>
                    <p className="text-xs text-slate-500 mt-1">This lead hasn't changed since you last viewed it.</p>
                  </div>
                )}
              </TabsContent>

              {/* Signals Tab (Premium) */}
              <TabsContent value="signals" className="space-y-6 mt-0">
                {hasInsightsSubscription ? (
                  <>
                    {/* Decision Window */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Decision Window</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="default" className={cn(
                          "px-3 py-1 text-xs font-bold uppercase tracking-wide",
                          lead.urgency === 'Act now' ? "bg-brand-orange hover:bg-brand-orange" : "bg-slate-500"
                        )}>
                          {lead.urgency}
                        </Badge>
                        <span className="text-sm text-slate-600">Tender issued, closing in 14 days.</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-orange w-[85%]" />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                        <span>Opened</span>
                        <span>Closing Soon</span>
                      </div>
                    </div>

                    {/* Fit Score Breakdown */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Opportunity Fit Score</h3>
                        <span className="text-2xl font-bold text-emerald-600">{lead.fitScore}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Region Match (WA)</span>
                            <span className="font-medium text-slate-900">100%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Service Category (Drilling)</span>
                            <span className="font-medium text-slate-900">90%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[90%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Commodity (Gold)</span>
                            <span className="font-medium text-slate-900">85%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[85%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Procurement Readiness */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Procurement Readiness</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                          Now
                        </Badge>
                        <span className="text-xs text-slate-500">Inferred from "Definitive Feasibility Study imminent"</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 text-center">
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Unlock Premium Insights</h3>
                      <p className="text-sm text-slate-500 mb-6 max-w-[260px]">
                        Get access to Fit Scores, Decision Windows, and Procurement Readiness data.
                      </p>
                      <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
                        View Plans
                      </Button>
                    </div>
                    
                    {/* Blurred Content Preview */}
                    <div className="opacity-30 blur-sm select-none pointer-events-none" aria-hidden="true">
                       <div className="space-y-4">
                         <div className="h-24 bg-slate-100 rounded-xl w-full" />
                         <div className="h-32 bg-slate-100 rounded-xl w-full" />
                         <div className="h-20 bg-slate-100 rounded-xl w-full" />
                       </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4 mt-0">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Internal Notes</h3>
                  <textarea 
                    className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none resize-none"
                    placeholder="Add notes about this lead..."
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">Save Note</Button>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Tasks</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 italic">
                    <Calendar className="h-4 w-4" />
                    No tasks assigned yet.
                  </div>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
