import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SavedSearch } from '@/data/mockSavedSearches';

interface EditSavedSearchModalProps {
  savedSearch: SavedSearch | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, name: string, emailAlerts: boolean) => void;
}

export function EditSavedSearchModal({ savedSearch, isOpen, onClose, onSave }: EditSavedSearchModalProps) {
  const [name, setName] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (savedSearch) {
      setName(savedSearch.name);
      setEmailAlerts(savedSearch.emailAlerts);
      setError('');
    }
  }, [savedSearch, isOpen]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Search name is required');
      return;
    }
    if (savedSearch) {
      onSave(savedSearch.id, name, emailAlerts);
      onClose();
    }
  };

  if (!savedSearch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Saved Search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Search Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className={error ? 'border-red-500' : ''}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
          <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
            <Label htmlFor="email-alerts" className="flex flex-col space-y-1">
              <span>Email Alerts</span>
              <span className="font-normal text-xs text-slate-500">Receive notifications for new matches</span>
            </Label>
            <Switch
              id="email-alerts"
              checked={emailAlerts}
              onCheckedChange={setEmailAlerts}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
