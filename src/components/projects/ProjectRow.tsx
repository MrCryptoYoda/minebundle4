import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ProjectRowProps {
  title: string;
  image: string;
  link: string;
  badge?: React.ReactNode;
  subtitle?: React.ReactNode;
  description: string;
  metrics: React.ReactNode[];
  actions?: React.ReactNode;
  className?: string;
}

export function ProjectRow({
  title,
  image,
  link,
  badge,
  subtitle,
  description,
  metrics,
  actions,
  className
}: ProjectRowProps) {
  return (
    <Card className={cn("group bg-[#1C1C24] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-800 flex items-center gap-4", className)}>
      {/* Image Container */}
      <div className="relative h-24 w-32 overflow-hidden shrink-0 rounded-xl bg-[#13131A]">
        <Link to={link} className="block w-full h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Badge (Overlay on small image might be too cluttered, maybe put it next to title) */}
        {badge && (
          <div className="absolute top-2 left-2 scale-75 origin-top-left">
            {badge}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-3 mb-1">
          {subtitle}
          <Link to={link} className="block group-hover:text-brand-orange transition-colors truncate">
            <h3 className="font-bold text-lg text-white leading-tight truncate">
              {title}
            </h3>
          </Link>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed line-clamp-1 mb-3 pr-4">
          {description}
        </p>

        {/* Metrics Row */}
        <div className="flex items-center gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
              {metric}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pr-2">
        {actions}
        <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-brand-orange hover:bg-brand-orange/5">
          <Link to={link}>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
