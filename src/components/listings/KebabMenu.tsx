import React from 'react';
import { MoreVertical, Share2, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface KebabMenuProps {
  onShare?: () => void;
  onConvertToSold?: () => void;
  onDelete: () => void;
  type: 'live' | 'draft';
}

export function KebabMenu({ onShare, onConvertToSold, onDelete, type }: KebabMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {type === 'live' && (
          <>
            <DropdownMenuItem onClick={onShare} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onConvertToSold} className="cursor-pointer">
              <CheckCircle className="mr-2 h-4 w-4" />
              Convert to Sold
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600 focus:text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
