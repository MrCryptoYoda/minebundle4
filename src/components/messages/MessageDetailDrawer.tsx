import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Message } from '@/data/mockMessages';
import { format } from 'date-fns';
import { ExternalLink, Reply, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MessageDetailDrawerProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
  type: 'received' | 'sent';
}

export function MessageDetailDrawer({ message, isOpen, onClose, type }: MessageDetailDrawerProps) {
  const navigate = useNavigate();

  if (!message) return null;

  const otherParty = type === 'received' ? message.sender : message.recipient;
  const isReceived = type === 'received';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <Badge variant={message.status === 'new' ? 'default' : 'secondary'} className="mb-2">
              {message.status === 'new' ? 'New Enquiry' : message.status}
            </Badge>
            <span className="text-xs text-slate-500">
              {format(new Date(message.timestamp), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
          <SheetTitle className="text-xl font-semibold">
            {message.enquiry.title}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-2 mt-1">
            Listing ID: <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{message.enquiry.listingId}</span>
            <span className="text-slate-300">•</span>
            {message.enquiry.type}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Sender/Recipient Info */}
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={otherParty.avatar} alt={otherParty.name} />
              <AvatarFallback className="bg-slate-200 text-slate-600">
                {otherParty.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-slate-900">{otherParty.name}</h4>
              {otherParty.organization && (
                <p className="text-sm text-slate-500">{otherParty.organization}</p>
              )}
              <p className="text-xs text-slate-400 mt-1">
                {isReceived ? 'Sent an enquiry' : 'Recipient'}
              </p>
            </div>
          </div>

          {/* Enquiry Details (Checkboxes) */}
          {isReceived && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Requested Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`flex items-center gap-2 p-3 rounded-md border ${message.details.terms ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  {message.details.terms ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span className="text-sm font-medium">Terms</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-md border ${message.details.price ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  {message.details.price ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span className="text-sm font-medium">Price</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-md border ${message.details.furtherInfo ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  {message.details.furtherInfo ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span className="text-sm font-medium">More Info</span>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Message Content */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Message</h4>
            <div className="p-4 bg-white border rounded-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button className="w-full gap-2" size="lg">
              <Reply className="h-4 w-4" />
              Reply to {otherParty.name.split(' ')[0]}
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => navigate(`/listing/${message.enquiry.listingId}`)}
            >
              <ExternalLink className="h-4 w-4" />
              View Listing
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
