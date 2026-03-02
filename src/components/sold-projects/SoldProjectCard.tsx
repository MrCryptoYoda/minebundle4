import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Share2, Trash2, ArrowUpRight, MapPin, Pickaxe, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SoldProject } from '@/data/mockSoldProjects';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SoldProjectCardProps {
  project: SoldProject;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}

export function SoldProjectCard({ project, onDelete, onShare }: SoldProjectCardProps) {
  return (
    <Card className="group h-full bg-[#1C1C24] rounded-[32px] p-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-800 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0 rounded-[24px] bg-[#13131A] mb-4">
        <Link to={`/listing/${project.id}`} className="block w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.2]"
            loading="lazy"
          />
        </Link>
        
        {/* Top Left Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            className="bg-slate-900/90 backdrop-blur-md text-white font-medium shadow-sm border border-white/20 px-3 py-1.5 text-xs tracking-wide rounded-lg hover:bg-slate-800"
          >
            SOLD
          </Badge>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-[#1C1C24]/90 backdrop-blur-md text-slate-400 hover:bg-[#1C1C24] hover:text-brand-orange shadow-sm border border-white/10">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl bg-[#1C1C24] border-slate-800 text-slate-300">
              <DropdownMenuItem onClick={() => onShare(project.id)} className="focus:bg-white/5 focus:text-white">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(project.id)}
                className="text-red-500 focus:text-red-400 focus:bg-red-500/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 relative px-2">
        
        {/* Title Row */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1 min-w-0 pt-1">
            <Link to={`/listing/${project.id}`} className="block group-hover:text-brand-orange transition-colors">
              <h3 className="font-bold text-xl text-white leading-tight line-clamp-2">
                {project.title}
              </h3>
            </Link>
            {project.stage && (
              <Badge variant="outline" className="shrink-0 rounded-md px-2 py-0.5 border-slate-700 text-slate-400 font-normal text-[10px] mt-1.5">
                {project.stage}
              </Badge>
            )}
          </div>

          {/* Circular Arrow Button */}
          <Button asChild className="h-12 w-12 rounded-full bg-[#13131A] hover:bg-white/5 text-slate-400 hover:text-brand-orange p-0 shrink-0 shadow-sm border border-slate-800 transition-colors">
            <Link to={`/listing/${project.id}`}>
              <ArrowUpRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6 pr-2">
          {project.summary}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer Divider */}
        <div className="border-t border-slate-800 mb-4" />

        {/* Footer Details Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Location */}
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate" title={`${project.location.region}, ${project.location.country}`}>
              {project.location.region}
            </span>
          </div>

          {/* Commodity */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate">
              {project.commodity.join(', ')}
            </span>
          </div>

          {/* Sold Date */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate font-medium">
              {format(project.soldDate, 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
