import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lead } from "@/data/mockLeadsData"
import { useDemo } from "@/context/DemoContext"
import { Flame, Zap, MoreHorizontal, Bookmark, CheckCircle2, Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadCardProps {
  lead: Lead;
  onView: (lead: Lead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onView }) => {
  const { hasInsightsSubscription } = useDemo()

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:shadow-md border-slate-200 bg-white cursor-pointer",
        lead.status === 'contacted' && "bg-slate-50 border-slate-200",
        lead.status === 'snoozed' && "opacity-75 bg-slate-50/50"
      )}
      onClick={() => onView(lead)}
    >
      {/* Left Accent Bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 transition-colors",
        lead.status === 'new' ? "bg-brand-orange" : "bg-transparent group-hover:bg-slate-200"
      )} />

      <CardContent className="p-5 pl-7">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-brand-orange transition-colors">
              {lead.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{lead.company}</span>
              <span>•</span>
              <span>{lead.ticker}:{lead.exchange}</span>
              <span>•</span>
              <span>{lead.postedAt}</span>
              {lead.isUpdatedSinceLastView && (
                <span className="flex items-center gap-1 text-brand-orange font-medium bg-brand-orange/10 px-1.5 py-0.5 rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  Updated
                </span>
              )}
            </div>
          </div>

          {/* Right Side Metrics (Locked/Unlocked) */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {hasInsightsSubscription ? (
              <>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                  <Flame className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs font-bold">{lead.fitScore}% Match</span>
                </div>
                <Badge variant={lead.urgency === 'Act now' ? 'default' : 'outline'} className={cn(
                  "text-[10px] font-medium uppercase tracking-wide",
                  lead.urgency === 'Act now' ? "bg-brand-orange hover:bg-brand-orange" : "text-slate-500 border-slate-200"
                )}>
                  {lead.urgency}
                </Badge>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full border border-slate-200" title="Upgrade to see Fit Score">
                  <Flame className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">—</span>
                </div>
                <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-200 font-medium uppercase tracking-wide">
                  Locked
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {lead.aiSummary}
          </p>
          <div className="mt-2 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <Zap className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5 fill-current" />
            <span className="font-medium text-slate-700">{lead.whyThisLead}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
            {lead.commodity}
          </Badge>
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
            {lead.region}
          </Badge>
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
            {lead.stage}
          </Badge>
          {lead.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-slate-500 border-slate-200 font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-200 font-normal">
               {lead.docType}
             </Badge>
             <span className="text-[10px] text-slate-400 font-medium">High Confidence</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700">
              <Clock className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 ml-2 px-4 text-xs font-medium" onClick={() => onView(lead)}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
