import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { generateSearchOverview, AIOverviewResponse } from '@/services/geminiService';

interface AIOverviewPanelProps {
  query: string;
  resultsCount: number;
  isLoading: boolean;
  onRefine: (filter: string) => void;
  resultsSummary?: string; // Add this prop to pass context to AI
}

export function AIOverviewPanel({ query, resultsCount, isLoading, onRefine, resultsSummary }: AIOverviewPanelProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [aiData, setAiData] = useState<AIOverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query && !isLoading) {
      fetchOverview();
    }
  }, [query, isLoading]);

  const fetchOverview = async () => {
    setIsRegenerating(true);
    setError(null);
    try {
      const data = await generateSearchOverview(query, resultsSummary || `Found ${resultsCount} listings matching "${query}".`);
      setAiData(data);
    } catch (err) {
      console.error("Failed to fetch AI overview", err);
      setError("Failed to generate overview.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleRegenerate = () => {
    fetchOverview();
  };

  if (!query && resultsCount === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
        <Sparkles className="h-8 w-8 text-slate-300 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-900 mb-1">AI Overview</h3>
        <p className="text-sm text-slate-500">
          Enter a search query to get an AI-powered market summary and insights.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-orange" />
          <h3 className="font-bold text-slate-900 text-sm">AI Overview</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-slate-400 hover:text-brand-orange"
            onClick={handleRegenerate}
            disabled={isLoading || isRegenerating}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", (isLoading || isRegenerating) && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {isLoading || isRegenerating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
              <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
              </div>
            </motion.div>
          ) : error ? (
            <div className="text-sm text-red-500 text-center py-4">{error}</div>
          ) : aiData ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Query Understanding */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">
                  Based on <span className="font-medium text-slate-900">"{query}"</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {aiData.suggestedRefinements.map((refinement, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-slate-100 text-slate-600 text-[10px] border-slate-200 font-normal cursor-pointer hover:bg-slate-200"
                      onClick={() => onRefine(refinement)}
                    >
                      {refinement}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Summary Bullets */}
              <ul className="space-y-3 mb-6">
                {aiData.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                    {takeaway}
                  </li>
                ))}
              </ul>
              
              {/* Main Summary Text */}
              <p className="text-sm text-slate-600 mb-4 italic border-l-2 border-brand-orange/20 pl-3">
                "{aiData.summary}"
              </p>

              {/* Disclaimer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] text-slate-400">
                  Generated from listing data; verify in each listing.
                </p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 hover:text-slate-600">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 hover:text-slate-600">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
