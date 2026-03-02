import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Lock } from 'lucide-react';

interface DataRoomSkeletonProps {
  onAction: () => void;
  isAuthenticated: boolean;
}

export function DataRoomSkeleton({ onAction, isAuthenticated }: DataRoomSkeletonProps) {
  const actionLabel = isAuthenticated ? "Sign NDA to unlock" : "Sign in to access documents";

  return (
    <Card className="border-slate-200 shadow-sm relative overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between opacity-50 blur-[1px]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
            <div>
              <div className="h-5 w-40 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="h-9 w-32 bg-slate-200 rounded"></div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {/* Skeleton Rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between opacity-40 blur-[2px] pointer-events-none select-none">
              <div className="flex items-center gap-4 w-full">
                <div className="h-10 w-10 bg-slate-200 rounded-lg shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                  <div className="h-3 w-1/4 bg-slate-200 rounded"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-slate-200 rounded"></div>
                <div className="h-8 w-8 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Locked Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/60 backdrop-blur-[1px] z-10 p-6 text-center">
          <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Lock className="h-6 w-6 text-slate-500" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">
            Project Data Room Locked
          </h4>
          <p className="text-slate-500 max-w-md mb-6">
            Access detailed technical reports, drill data, and legal documents.
          </p>
          <Button 
            onClick={onAction} 
            className="gap-2 shadow-sm font-medium px-6 bg-brand-orange hover:bg-brand-orange/90"
          >
            <Lock className="h-4 w-4" /> {actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
