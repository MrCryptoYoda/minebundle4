import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  moreLink?: string;
  className?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function DashboardCard({ title, moreLink, className, children, headerAction }: DashboardCardProps) {
  return (
    <Card className={cn("flex flex-col h-full overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="text-base font-semibold text-slate-800">{title}</CardTitle>
        {headerAction}
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {children}
      </CardContent>
      {moreLink && (
        <div className="p-3 border-t border-slate-100 bg-slate-50/30">
          <Button variant="ghost" size="sm" className="w-full justify-between text-slate-500 hover:text-brand-orange hover:bg-orange-50 group" asChild>
            <Link to={moreLink}>
              <span className="text-xs font-medium uppercase tracking-wider">View All</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
}
