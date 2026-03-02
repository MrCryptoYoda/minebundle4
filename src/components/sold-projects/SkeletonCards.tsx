import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="overflow-hidden border-slate-200 shadow-sm flex flex-col h-full rounded-3xl p-3 bg-white">
          <Skeleton className="aspect-[4/3] w-full bg-slate-100 rounded-xl" />
          
          <div className="flex-1 px-2 pt-4 pb-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 bg-slate-100 rounded-full" />
              <Skeleton className="h-4 w-16 bg-slate-100 rounded" />
            </div>
            <Skeleton className="h-6 w-3/4 bg-slate-100 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2 bg-slate-100 rounded" />
              <Skeleton className="h-4 w-1/3 bg-slate-100 rounded" />
            </div>
            
            <div className="flex-1" />
            <div className="border-t border-slate-100 my-2" />
            
            <div className="flex items-center justify-between">
               <Skeleton className="h-4 w-16 bg-slate-100 rounded" />
               <Skeleton className="h-4 w-16 bg-slate-100 rounded" />
               <Skeleton className="h-4 w-16 bg-slate-100 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
