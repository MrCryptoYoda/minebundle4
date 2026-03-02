import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SavedSearch } from '@/data/mockSavedSearches';

interface DeleteSavedSearchModalProps {
  savedSearch: SavedSearch | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteSavedSearchModal({ savedSearch, isOpen, onClose, onConfirm }: DeleteSavedSearchModalProps) {
  if (!savedSearch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this saved search?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-slate-500">
            You will stop receiving alerts for <strong>{savedSearch.name}</strong>.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => {
            onConfirm(savedSearch.id);
            onClose();
          }}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
