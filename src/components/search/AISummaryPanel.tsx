import React from 'react';
import { Sparkles, Bot, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AISummaryPanelProps {
  query?: string;
  resultCount?: number;
  type?: 'assets' | 'services';
  className?: string;
  variant?: 'default' | 'dark';
}

export function AISummaryPanel({ 
  query = "Mining Assets", 
  resultCount = 0, 
  type = 'assets',
  className,
  variant = 'default'
}: AISummaryPanelProps) {
  
  // Dynamic placeholder content based on type
  const summaryText = type === 'assets' 
    ? `Analysis of the current market shows strong activity in ${query.toLowerCase()}. There are ${resultCount} verified opportunities matching your criteria, with a notable concentration in early-stage exploration projects. Recent transaction data suggests a 15% increase in buyer interest for high-grade assets in this sector over the last quarter.`
    : `Based on your search for ${query.toLowerCase()}, we found ${resultCount} top-rated service providers. The market for these services is highly competitive, with providers offering specialized expertise in sustainable practices and advanced technologies. Recommended providers have an average rating of 4.8/5.`;

  const isDark = variant === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 shadow-sm",
        isDark 
          ? "border-white/10 bg-slate-900/50" 
          : "border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-white",
        className
      )}
    >
      {/* Decorative Background Elements */}
      <div className={cn("absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full blur-2xl", isDark ? "bg-brand-orange/5" : "bg-brand-orange/10")} />
      <div className={cn("absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full blur-2xl", isDark ? "bg-blue-500/5" : "bg-blue-500/5")} />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        {/* Icon Container */}
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1",
          isDark ? "bg-slate-800 ring-white/10" : "bg-white ring-black/5"
        )}>
          <Sparkles className="h-5 w-5 text-brand-orange" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className={cn("text-sm font-semibold uppercase tracking-wide", isDark ? "text-white" : "text-slate-900")}>
              AI Market Overview
            </h3>
            <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-brand-orange", isDark ? "bg-brand-orange/10" : "bg-brand-orange/10")}>
              Beta
            </span>
          </div>
          
          <p className={cn("text-sm leading-relaxed md:text-base", isDark ? "text-slate-400" : "text-slate-600")}>
            {summaryText}
          </p>

          {/* Action / Insight Tags */}
          <div className="mt-4 flex flex-wrap gap-2 pt-2">
            <div className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm",
              isDark 
                ? "border-white/10 bg-slate-800 text-slate-300" 
                : "border-slate-200 bg-white text-slate-600"
            )}>
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              High Demand
            </div>
            <div className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm",
              isDark 
                ? "border-white/10 bg-slate-800 text-slate-300" 
                : "border-slate-200 bg-white text-slate-600"
            )}>
              <Bot className="h-3.5 w-3.5 text-blue-500" />
              AI Verified Data
            </div>
          </div>
        </div>


        {/* Optional CTA - Removed as per request */}
      </div>
    </motion.div>
  );
}
