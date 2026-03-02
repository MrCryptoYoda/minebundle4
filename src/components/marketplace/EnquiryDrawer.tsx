import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useDemo } from '@/context/DemoContext';
import { ServiceListing } from '@/data/marketplaceData';

interface EnquiryDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceListing;
}

export function EnquiryDrawer({ isOpen, onOpenChange, service }: EnquiryDrawerProps) {
  const { toast } = useToast();
  const { isAuthenticated, login } = useDemo();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      toast({
        title: "Enquiry Sent",
        description: `Your enquiry for ${service.title} has been sent to the provider.`,
      });
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="w-[300px] sm:w-[400px] bg-slate-950 border-l border-white/5 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Sign in to Enquire</SheetTitle>
            <SheetDescription className="text-slate-400">
              You need to be signed in to contact service providers.
            </SheetDescription>
          </SheetHeader>
          <div className="py-8 flex flex-col gap-4">
            <Button onClick={login} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
              Sign In / Sign Up
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white">
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[500px] flex flex-col h-full overflow-y-auto bg-slate-950 border-l border-white/5 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Enquire about Service</SheetTitle>
          <SheetDescription className="text-slate-400">
            Send a message to {service.provider?.name} regarding {service.title}.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Your Name</Label>
            <Input id="name" defaultValue="Demo User" required className="bg-slate-900 border-white/5 text-white placeholder:text-slate-600" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input id="email" type="email" defaultValue="user@example.com" required className="bg-slate-900 border-white/5 text-white placeholder:text-slate-600" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-300">Company</Label>
            <Input id="company" placeholder="Your Company Name" required className="bg-slate-900 border-white/5 text-white placeholder:text-slate-600" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-300">Message</Label>
            <Textarea 
              id="message" 
              placeholder="I'm interested in this service for my project..." 
              className="min-h-[150px] bg-slate-900 border-white/5 text-white placeholder:text-slate-600"
              required 
            />
          </div>
          
          <SheetFooter className="pt-4 border-t border-white/5 flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Enquiry"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
