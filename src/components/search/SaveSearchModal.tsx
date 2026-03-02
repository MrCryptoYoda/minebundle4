import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  filters: Record<string, any>;
}

export function SaveSearchModal({ isOpen, onClose, query, filters }: SaveSearchModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchName, setSearchName] = useState(query || 'New Search');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = () => {
    // Mock save logic
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-6"
            >
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-lg font-semibold text-slate-900 mb-2">Search Saved!</DialogTitle>
              <p className="text-sm text-slate-500 mb-6">
                You'll receive alerts for new listings matching "{searchName}".
              </p>
              <Button onClick={handleClose} className="w-full bg-brand-orange hover:bg-brand-orange/90">
                Manage Saved Searches
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle>Save Search</DialogTitle>
                <DialogDescription>
                  Save your current search criteria to get notified about new opportunities.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Search Name</Label>
                  <Input
                    id="name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-slate-50">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="alerts" className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4 text-brand-orange" />
                      Email Alerts
                    </Label>
                    <span className="text-xs text-slate-500">
                      Be the first to see new listings matching this search.
                    </span>
                  </div>
                  <Switch
                    id="alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">Save Search</Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
