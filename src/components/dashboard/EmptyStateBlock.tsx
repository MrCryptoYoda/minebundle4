import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EmptyStateBlockProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    to: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    to: string;
    icon?: React.ReactNode;
  };
  suggestions?: React.ReactNode;
  className?: string;
}

export function EmptyStateBlock({ title, description, icon, primaryAction, secondaryAction, suggestions, className }: EmptyStateBlockProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full p-6 text-center", className)}>
      {icon && (
        <div className="mb-4 p-3 bg-slate-50 rounded-full text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-[240px] mb-4 leading-relaxed">
        {description}
      </p>
      
      {suggestions && (
        <div className="mb-6 w-full">
          {suggestions}
        </div>
      )}

      <div className="flex flex-col w-full gap-2 max-w-[200px]">
        {primaryAction && (
          <Button size="sm" className="w-full gap-2" asChild>
            <Link to={primaryAction.to}>
              {primaryAction.icon}
              {primaryAction.label}
            </Link>
          </Button>
        )}
        {secondaryAction && (
          <Button variant="outline" size="sm" className="w-full gap-2" asChild>
            <Link to={secondaryAction.to}>
              {secondaryAction.icon}
              {secondaryAction.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
