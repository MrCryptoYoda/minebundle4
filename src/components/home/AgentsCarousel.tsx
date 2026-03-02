import React, { useRef } from 'react';
import { AgentCard, Agent } from './AgentCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    title: 'Senior Mining Agent specializing in Australian Gold Assets and exploration permits.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    linkedinUrl: 'https://linkedin.com',
    stats: { followers: 1200, deals: 45 }
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'Expert in Asian markets and cross-border commodity trading for copper and lithium.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    linkedinUrl: 'https://linkedin.com',
    stats: { followers: 850, deals: 32 }
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: 'South American lithium specialist with deep connections in the Lithium Triangle.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    linkedinUrl: 'https://linkedin.com',
    stats: { followers: 2100, deals: 67 }
  },
  {
    id: '4',
    name: 'James Wilson',
    title: 'Focusing on rare earth elements and strategic minerals in North America.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    linkedinUrl: 'https://linkedin.com',
    stats: { followers: 1500, deals: 50 }
  },
  {
    id: '5',
    name: 'Priya Patel',
    title: 'Connecting Indian investors with African mining opportunities.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    linkedinUrl: 'https://linkedin.com',
    stats: { followers: 980, deals: 28 }
  }
];

export function AgentsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400; // Approx card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Agents</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Connect with verified industry experts who can help you navigate the global mining marketplace.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 hidden sm:flex">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('left')}
              className="rounded-full h-12 w-12 border-slate-200 hover:bg-white hover:border-slate-300"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('right')}
              className="rounded-full h-12 w-12 border-slate-200 hover:bg-white hover:border-slate-300"
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_AGENTS.map((agent) => (
            <div key={agent.id} className="min-w-[300px] sm:min-w-[340px] snap-start">
              <AgentCard agent={agent} />
            </div>
          ))}
          
          {/* "View All" Card */}
          <div className="min-w-[200px] flex items-center justify-center snap-start">
             <Button variant="link" className="text-brand-orange text-lg font-medium group">
               View All Agents
               <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
             </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
