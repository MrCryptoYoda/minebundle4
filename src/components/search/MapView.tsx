import React from 'react';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  listings: Listing[];
  className?: string;
}

export function MapView({ listings, className }: MapViewProps) {
  return (
    <div className={cn("relative w-full h-full bg-slate-100 rounded-3xl overflow-hidden", className)}>
      {/* Map Background - Using a static map image for design reference look */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/13/4146/2847.png')`, // Example tile
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(90%) brightness(110%)' // Style to match the clean look
        }}
      />
      
      {/* Overlay Grid/Streets Pattern (Simulated for design) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
             backgroundSize: '100px 100px' 
           }} 
      />

      {/* Pins */}
      {listings.map((listing, index) => {
        // Deterministic pseudo-random position based on ID
        const idNum = listing.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const top = (idNum * 17) % 80 + 10; // 10% to 90%
        const left = (idNum * 23) % 80 + 10; // 10% to 90%

        return (
          <div
            key={listing.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            {/* Price Tag Pin */}
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2 transition-transform hover:scale-110 hover:z-10 relative z-0">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 shadow-lg border-2 border-white">
                 <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xs text-slate-900 whitespace-nowrap">
                {listing.price.amount 
                  ? `$${(listing.price.amount / 1000000).toFixed(1)}M` 
                  : 'Contact'}
              </span>
            </div>
            
            {/* Dot anchor */}
            <div className="w-2 h-2 bg-slate-900 rounded-full mx-auto mt-1 shadow-sm" />
          </div>
        );
      })}

      {/* Zoom Controls (Visual only) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-lg">+</button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-lg">-</button>
      </div>
    </div>
  );
}
