import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  linkedinUrl: string;
  stats: {
    followers: number;
    deals: number;
  };
}

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  return (
    <div className={cn("relative aspect-[3/4] w-full overflow-hidden rounded-[32px] group cursor-pointer", className)}>
      {/* Background Image */}
      <img
        src={agent.image}
        alt={agent.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient Overlay (Darkens bottom for text readability) */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Premium Blur Fade Effect */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-md pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
        
        {/* Name & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-2xl font-bold tracking-tight">{agent.name}</h3>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
            <CheckCircle className="h-3 w-3 text-white fill-white" />
          </div>
        </div>

        {/* Title/Bio */}
        <p className="text-white/80 text-sm mb-6 line-clamp-2 font-light leading-relaxed">
          {agent.title}
        </p>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          {/* Stats (Replacing Follower count with simple stats or just View Agent) */}
          <div className="flex items-center gap-4">
             <a 
               href={agent.linkedinUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
               onClick={(e) => e.stopPropagation()}
             >
               <Linkedin className="h-5 w-5 text-white fill-current" />
             </a>
          </div>

          {/* View Agent Button */}
          <Button 
            asChild 
            className="bg-white text-slate-900 group-hover:bg-[#F27D26] group-hover:text-white rounded-full pl-5 pr-1.5 h-12 flex items-center gap-3 transition-all shadow-lg hover:shadow-xl border-none"
          >
            <Link to={`/agent/${agent.id}`}>
              <span className="font-bold text-base">View Agent</span>
              <div className="h-9 w-9 bg-slate-900 text-white group-hover:bg-white group-hover:text-[#F27D26] rounded-full flex items-center justify-center transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
