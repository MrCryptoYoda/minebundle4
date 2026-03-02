import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <Card className={cn("border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm", className)}>
      <CardHeader className="bg-transparent border-b border-slate-100 px-6 py-5">
        <CardTitle className="text-xl font-serif font-medium text-slate-900">{title}</CardTitle>
        {description && <p className="text-sm text-slate-500 mt-1 font-light">{description}</p>}
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
