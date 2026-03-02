import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle, Eye, Save, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Listing } from '@/data/mockData';

interface PreviewPanelProps {
  listing: Partial<Listing>;
  step: number;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isPublishEnabled: boolean;
  missingItems: string[];
}

export function PreviewPanel({ listing, step, onPreview, onSaveDraft, onPublish, isPublishEnabled, missingItems }: PreviewPanelProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple mock progress calculation
    let score = 0;
    if (listing.title) score += 10;
    if (listing.location?.region) score += 10;
    if (listing.commodity?.length) score += 10;
    if (listing.stage) score += 10;
    if (listing.price?.amount) score += 10;
    if (listing.summary) score += 10;
    if (listing.image) score += 10;
    if (listing.highlights?.length) score += 10;
    if (step > 1) score += 20;

    setProgress(Math.min(score, 100));
  }, [listing, step]);

  // Calculate circumference for radial progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* Video Tile */}
      <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-700/50 shadow-2xl shadow-black/50">
        <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Play Button */}
          <div className="h-14 w-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
            <div className="border-l-[14px] border-l-white border-y-[9px] border-y-transparent ml-1" />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
             <div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1 block">Tutorial</span>
               <p className="text-white font-medium text-sm">How to create a winning listing</p>
             </div>
             <span className="text-xs text-slate-400 font-mono bg-black/40 px-2 py-1 rounded">02:14</span>
          </div>
        </div>
      </div>

      {/* Listing Summary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Listing Preview</h3>
          <span className="text-[10px] text-slate-600 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700">DRAFT MODE</span>
        </div>
        
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm hover:bg-slate-800/60 transition-colors group cursor-pointer" onClick={onPreview}>
          <div className="flex gap-4">
            <div className="h-20 w-20 bg-slate-700 rounded-lg shrink-0 overflow-hidden border border-slate-600/50 relative">
              {listing.image ? (
                <img src={listing.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1">
                  <div className="w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 py-1">
              <h4 className="font-serif font-medium text-white text-lg truncate group-hover:text-brand-orange transition-colors">
                {listing.title || 'Untitled Project'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 truncate font-light">
                {listing.location?.region || 'Location pending'}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] font-medium uppercase tracking-wider rounded border border-slate-600/50">
                  {listing.type || 'Type'}
                </span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] font-medium uppercase tracking-wider rounded border border-slate-600/50">
                  {listing.stage || 'Stage'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listing Strength Gauge */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-6">
          {/* Radial Gauge */}
          <div className="relative h-24 w-24 shrink-0">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                className="text-slate-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
              {/* Progress Circle */}
              <circle
                className={cn(
                  "transition-all duration-1000 ease-out",
                  progress === 100 ? "text-emerald-500" : "text-brand-orange"
                )}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-xl font-bold font-mono">{progress}%</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-white mb-1">Listing Strength</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed mb-3">
              {progress === 100 
                ? "Excellent! Your listing is ready to attract investors." 
                : "Complete more fields to improve visibility and trust score."}
            </p>
            {progress < 100 && (
              <div className="text-[10px] text-brand-orange font-medium uppercase tracking-wider flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                Improve Score
              </div>
            )}
          </div>
        </div>

        {missingItems.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-700/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Recommended Actions</p>
            <ul className="space-y-2.5">
              {missingItems.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-300 text-xs group">
                  <div className="h-4 w-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 group-hover:border-brand-orange/50 transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-brand-orange transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
              {missingItems.length > 3 && (
                <li className="text-[10px] text-slate-500 pl-6 italic">
                  + {missingItems.length - 3} more items
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <Button 
          variant="outline" 
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all h-11" 
          onClick={onPreview}
        >
          <Eye className="mr-2 h-4 w-4" /> Preview Listing
        </Button>
        
        {step === 3 ? (
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11 shadow-lg shadow-emerald-900/20" 
            disabled={!isPublishEnabled}
            onClick={onPublish}
          >
            Publish Listing
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full text-slate-500 hover:text-slate-300 hover:bg-slate-800/50" 
            onClick={onSaveDraft}
          >
            <Save className="mr-2 h-4 w-4" /> Save as Draft
          </Button>
        )}
      </div>
    </div>
  );
}
