import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function SkeletonCards({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="flex flex-col h-full rounded-3xl p-3 bg-[#1C1C24] border-slate-800 shadow-sm">
          <Skeleton className="aspect-[4/3] w-full rounded-xl bg-slate-800" />
          
          <div className="flex-1 px-2 pt-4 pb-2 flex flex-col gap-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-slate-800 rounded" />
              <Skeleton className="h-6 w-3/4 bg-slate-800 rounded" />
            </div>
            
            <div className="space-y-2 mt-2">
               <Skeleton className="h-4 w-1/2 bg-slate-800 rounded" />
            </div>
            
            <div className="flex-1" />
            <div className="border-t border-slate-800 my-2" />
            
            <div className="flex items-center justify-between">
               <Skeleton className="h-4 w-20 bg-slate-800 rounded" />
               <Skeleton className="h-4 w-24 bg-slate-800 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
