import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NotificationOptInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: () => void;
}

export function NotificationOptInModal({ isOpen, onClose, onActivate }: NotificationOptInModalProps) {
  const { toast } = useToast();

  const handleActivate = () => {
    onActivate();
    toast({
      title: "Notifications enabled",
      description: "You will now receive alerts for new listings and messages.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="flex flex-col items-center text-center space-y-4">
          <div className="bg-brand-orange/10 p-4 rounded-full">
            <Bell className="h-8 w-8 text-brand-orange" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">Be the first to know</DialogTitle>
          <DialogDescription className="text-slate-500 max-w-[300px] mx-auto">
            Activate notifications to get instant alerts for new listings matching your saved searches and important messages.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">New Listing Alerts</span>
              <span className="text-xs text-slate-500">Get notified when assets match your criteria</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">Message Notifications</span>
              <span className="text-xs text-slate-500">Never miss an enquiry or reply</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2 sm:space-x-0">
          <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleActivate}>
            Activate Notifications
          </Button>
          <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-600" onClick={onClose}>
            Skip this step
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
