import React from 'react';
import { cn } from '@/lib/utils';

interface CoverageMapProps {
  selectedRegions: string[];
  onToggleRegion: (region: string) => void;
}

// Simplified schematic regions for the map
const REGIONS = [
  { id: 'North America', cx: 150, cy: 100, r: 45, label: 'North America' },
  { id: 'South America', cx: 220, cy: 280, r: 40, label: 'South America' },
  { id: 'Europe', cx: 420, cy: 90, r: 30, label: 'Europe' },
  { id: 'Africa', cx: 420, cy: 220, r: 50, label: 'Africa' },
  { id: 'Asia', cx: 600, cy: 120, r: 60, label: 'Asia' },
  { id: 'Australia', cx: 650, cy: 300, r: 40, label: 'Australia' },
];

export function CoverageMap({ selectedRegions, onToggleRegion }: CoverageMapProps) {
  return (
    <div className="w-full aspect-[2/1] bg-[#13131A] rounded-xl border border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1C1C24" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* Connecting Lines (Stylistic) */}
          <path d="M 150 100 L 220 280" stroke="#2D2D35" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 150 100 L 420 90" stroke="#2D2D35" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 420 90 L 600 120" stroke="#2D2D35" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 420 220 L 600 120" stroke="#2D2D35" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 600 120 L 650 300" stroke="#2D2D35" strokeWidth="2" strokeDasharray="4 4" />

          {/* Regions */}
          {REGIONS.map((region) => {
            const isSelected = selectedRegions.includes(region.id);
            return (
              <g 
                key={region.id} 
                onClick={() => onToggleRegion(region.id)}
                className="cursor-pointer group"
              >
                {/* Pulse Effect when selected */}
                {isSelected && (
                  <circle cx={region.cx} cy={region.cy} r={region.r + 10} className="fill-brand-orange/20 animate-pulse" />
                )}
                
                {/* Region Circle */}
                <circle 
                  cx={region.cx} 
                  cy={region.cy} 
                  r={region.r} 
                  className={cn(
                    "transition-all duration-300",
                    isSelected 
                      ? "fill-brand-orange stroke-brand-orange stroke-2" 
                      : "fill-slate-800 stroke-slate-700 stroke-1 group-hover:fill-slate-700 group-hover:stroke-slate-500"
                  )}
                />
                
                {/* Label */}
                <text 
                  x={region.cx} 
                  y={region.cy} 
                  textAnchor="middle" 
                  dy=".3em"
                  className={cn(
                    "text-xs font-medium pointer-events-none transition-colors select-none",
                    isSelected ? "fill-white" : "fill-slate-400 group-hover:fill-slate-200"
                  )}
                >
                  {region.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-[#1C1C24]/90 backdrop-blur px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">
        Click regions to toggle coverage
      </div>
    </div>
  );
}
