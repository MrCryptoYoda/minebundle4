import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2, Edit2, Clock } from 'lucide-react';
import { Listing } from '@/data/mockData';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DraftCardProps {
  draft: Listing;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const DraftCard: React.FC<DraftCardProps> = ({ draft, onDelete, onComplete }) => {
  return (
    <Card className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl flex flex-col p-3 h-full">
      {/* Thumbnail / Placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
        {/* Draft Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/30 backdrop-blur-md text-white hover:bg-black/40 shadow-sm font-medium border border-white/20 px-3 py-1 text-xs tracking-wide rounded-md">
            Draft
          </Badge>
        </div>

        {/* Kebab Menu (Top Right) */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-brand-orange shadow-sm border border-white/20">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onComplete(draft.id)} className="cursor-pointer">
                <Edit2 className="mr-2 h-4 w-4" />
                Complete Listing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(draft.id)} className="cursor-pointer text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-center">
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Edit2 className="h-6 w-6 text-slate-400" />
          </div>
          <span className="text-sm font-medium text-slate-500">Draft Listing</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 pt-4 px-2 pb-2">
        <div className="space-y-1 w-full mb-4">
          {/* Type (Orange) */}
          <div className="text-brand-orange font-bold text-sm uppercase tracking-wide">
            {draft.type}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg leading-tight text-slate-900 line-clamp-2 min-h-[3rem]">
            {draft.title || 'Untitled Draft'}
          </h3>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-auto space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Listing Progress</span>
            <span className="font-medium text-slate-900">45%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-orange rounded-full" style={{ width: '45%' }} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-4" />

        {/* Footer */}
        <div className="flex items-center justify-between text-slate-500 text-sm">
          <div className="flex items-center text-xs">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            Saved {format(draft.createdAt, 'MMM d, h:mm a')}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-brand-orange hover:text-brand-orange/80 hover:bg-brand-orange/10 px-3 -mr-2"
            onClick={() => onComplete(draft.id)}
          >
            Complete
          </Button>
        </div>
      </div>
    </Card>
  );
}
