import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
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

export function ProjectCard({
  title,
  image,
  link,
  badge,
  subtitle,
  description,
  metrics,
  actions,
  className
}: ProjectCardProps) {
  return (
    <Card className={cn("group h-full bg-[#1C1C24] rounded-[32px] p-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-800 flex flex-col", className)}>
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0 rounded-[24px] bg-[#13131A] mb-4">
        <Link to={link} className="block w-full h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Top Left Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            {badge}
          </div>
        )}

        {/* Top Right Actions */}
        {actions && (
          <div className="absolute top-4 right-4 flex gap-2">
            {actions}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 relative px-2">
        
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1 min-w-0 pt-1">
            {/* Subtitle (e.g. Seller Name or Status) */}
            {subtitle && (
              <div className="mb-1.5">
                {subtitle}
              </div>
            )}

            {/* Title */}
            <Link to={link} className="block group-hover:text-brand-orange transition-colors">
              <h3 className="font-bold text-xl text-white leading-tight line-clamp-2">
                {title}
              </h3>
            </Link>
          </div>

          {/* Circular Arrow Button */}
          <Button asChild className="h-12 w-12 rounded-full bg-[#13131A] hover:bg-white/5 text-slate-400 hover:text-brand-orange p-0 shrink-0 shadow-sm border border-slate-800 transition-colors">
            <Link to={link}>
              <ArrowUpRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6 pr-2">
          {description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer Divider */}
        <div className="border-t border-slate-800 mb-4" />

        {/* Footer Details Grid */}
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 overflow-hidden text-slate-400">
              {metric}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
