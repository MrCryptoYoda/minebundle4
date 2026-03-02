import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface CompactRowProps {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
  };
  icon?: React.ReactNode;
  action?: {
    to?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    label?: string;
  };
  className?: string;
}

export function CompactRow({ title, subtitle, meta, badge, icon, action, className }: CompactRowProps) {
  return (
    <div className={cn("group flex items-center justify-between p-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0", className)}>
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors">
            {icon}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-900 truncate">{title}</span>
            {badge && (
              <Badge variant={badge.variant as any} className="h-5 px-1.5 text-[10px] font-normal">
                {badge.label}
              </Badge>
            )}
          </div>
          {(subtitle || meta) && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {subtitle && <span className="truncate">{subtitle}</span>}
              {subtitle && meta && <span>•</span>}
              {meta && <span>{meta}</span>}
            </div>
          )}
        </div>
      </div>
      
      {action && (
        <div className="flex-shrink-0 ml-2">
          {action.to ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-orange" asChild>
              <Link to={action.to}>
                {action.icon || <ChevronRight className="h-4 w-4" />}
                <span className="sr-only">{action.label || "View"}</span>
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-orange" onClick={action.onClick}>
              {action.icon || <ChevronRight className="h-4 w-4" />}
              <span className="sr-only">{action.label || "View"}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
