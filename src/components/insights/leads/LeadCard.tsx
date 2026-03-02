import React from 'react';
import { Lead } from '@/data/insightsMockData';
import { useInsights } from '@/context/InsightsContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MoreHorizontal, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  Flame, 
  FileText, 
  MapPin, 
  Pickaxe,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LeadCardProps {
  lead: Lead;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
  onClick: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, isSelected, onSelect, onClick }) => {
  const { plan } = useInsights();
  const isPaid = plan === 'SP_PAID';

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Act now': return 'bg-red-900/20 text-red-400 border-red-900/30';
      case 'Monitor': return 'bg-amber-900/20 text-amber-400 border-amber-900/30';
      case 'Long horizon': return 'bg-blue-900/20 text-blue-400 border-blue-900/30';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/30';
    if (score >= 70) return 'text-amber-400 bg-amber-900/20 border-amber-900/30';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:shadow-md border-slate-800 cursor-pointer bg-[#1C1C24]",
        isSelected && "border-brand-orange ring-1 ring-brand-orange bg-brand-orange/5",
        lead.status === 'Contacted' && "bg-[#1C1C24]/50",
        lead.status === 'Snoozed' && "opacity-75 bg-[#1C1C24]"
      )}
      onClick={onClick}
    >
      <div className="p-5 space-y-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <Checkbox checked={isSelected} onCheckedChange={onSelect} className="border-slate-600 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-white leading-snug group-hover:text-brand-orange transition-colors">
                {lead.title}
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-medium text-xs text-slate-400">{lead.company}</span>
                <span className="text-slate-600">•</span>
                {lead.commodity.map(c => (
                  <Badge key={c} variant="outline" className="text-[10px] h-5 px-1.5 bg-[#13131A] text-slate-400 border-slate-700 font-normal">
                    {c}
                  </Badge>
                ))}
                {lead.region.map(r => (
                  <Badge key={r} variant="outline" className="text-[10px] h-5 px-1.5 bg-[#13131A] text-slate-400 border-slate-700 font-normal">
                    {r}
                  </Badge>
                ))}
                {lead.stage.map(s => (
                  <Badge key={s} variant="outline" className="text-[10px] h-5 px-1.5 bg-[#13131A] text-slate-400 border-slate-700 font-normal">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Metrics */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              {lead.hotStreak && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20 gap-1 h-5 px-1.5 text-[10px] uppercase tracking-wider font-bold cursor-help">
                        <Flame className="h-3 w-3" />
                        Hot Streak
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>3+ positive announcements in the last 30 days</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {lead.isUpdatedSinceLastView && (
                <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" title="Updated since last view" />
              )}
              
              {/* Fit Score */}
              <div className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold",
                isPaid ? getFitScoreColor(lead.fitScore) : "bg-slate-800 text-slate-500 border-slate-700"
              )}>
                <Flame className="h-3 w-3" />
                {isPaid ? lead.fitScore : "—"}
              </div>

              {/* Urgency Pill */}
              <div className={cn(
                "px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wide",
                isPaid ? getUrgencyColor(lead.urgency) : "bg-slate-800 text-slate-500 border-slate-700"
              )}>
                {isPaid ? lead.urgency : "LOCKED"}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {new Date(lead.postedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {lead.aiSummary}
          </p>
          <div className="flex items-start gap-2 bg-blue-900/10 p-2 rounded-lg border border-blue-900/20">
            <Sparkles className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-300 font-medium leading-snug">
              {lead.whyThisLead}
            </p>
          </div>
        </div>

        {/* Metadata & Actions Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {lead.docType}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                lead.confidence === 'High' ? "bg-emerald-500" : 
                lead.confidence === 'Medium' ? "bg-amber-500" : "bg-red-500"
              )} />
              {lead.confidence} Confidence
            </span>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-300 hover:bg-slate-800">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-300 hover:bg-slate-800">
              <CheckCircle2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1 ml-2 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white group-hover:border-brand-orange/30 group-hover:text-brand-orange">
              View Details
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
