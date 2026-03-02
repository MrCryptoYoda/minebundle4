import React from 'react';
import { Lead } from '@/data/insightsMockData';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LeadsMapViewProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export const LeadsMapView: React.FC<LeadsMapViewProps> = ({ leads, onLeadClick }) => {
  // Mock coordinates for a world map visualization
  // In a real app, we would use a mapping library like Leaflet or Google Maps
  // Here we'll project regions to approximate positions on a static map background
  
  const getPosition = (region: string) => {
    // Very rough approximation for demo purposes
    const r = region.toLowerCase();
    if (r.includes('australia') || r.includes('wa') || r.includes('qld')) return { top: '75%', left: '85%' };
    if (r.includes('africa') || r.includes('ghana') || r.includes('mali')) return { top: '55%', left: '52%' };
    if (r.includes('south america') || r.includes('chile') || r.includes('peru')) return { top: '70%', left: '28%' };
    if (r.includes('north america') || r.includes('canada') || r.includes('usa')) return { top: '30%', left: '20%' };
    if (r.includes('europe')) return { top: '25%', left: '50%' };
    if (r.includes('asia')) return { top: '35%', left: '75%' };
    return { top: '50%', left: '50%' };
  };

  return (
    <div className="relative w-full aspect-[16/9] bg-[#13131A] rounded-2xl overflow-hidden border border-slate-800">
      {/* Map Background */}
      <div 
        className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center invert"
        style={{ filter: 'grayscale(100%) contrast(1.2)' }}
      />
      
      {/* Lead Markers */}
      <div className="absolute inset-0">
        {leads.map((lead, index) => {
          const pos = getPosition(lead.region[0] || 'Global');
          // Add some random offset to prevent exact overlap
          const offsetTop = (index % 5) * 2; 
          const offsetLeft = (index % 3) * 2;
          
          return (
            <TooltipProvider key={lead.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="absolute h-4 w-4 -ml-2 -mt-2 rounded-full bg-brand-orange border-2 border-[#13131A] hover:scale-150 transition-transform cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.5)] z-10"
                    style={{ 
                      top: `calc(${pos.top} + ${offsetTop}px)`, 
                      left: `calc(${pos.left} + ${offsetLeft}px)` 
                    }}
                    onClick={() => onLeadClick(lead)}
                  >
                    <span className="sr-only">{lead.title}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1C1C24] border-slate-800 text-slate-200 p-3 max-w-xs">
                  <div className="font-bold text-white mb-1">{lead.title}</div>
                  <div className="text-xs text-slate-400 mb-2">{lead.company} • {lead.region.join(', ')}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${lead.fitScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {lead.fitScore}% Match
                    </span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                      {lead.stage[0]}
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 text-slate-300">
          <span className="text-lg font-bold">+</span>
        </Button>
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-[#1C1C24] border border-slate-700 hover:bg-slate-800 text-slate-300">
          <span className="text-lg font-bold">-</span>
        </Button>
      </div>
      
      <div className="absolute top-4 left-4 bg-[#1C1C24]/90 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-400 flex items-center gap-2">
        <MapPin className="h-3 w-3 text-brand-orange" />
        Showing {leads.length} opportunities globally
      </div>
    </div>
  );
};
