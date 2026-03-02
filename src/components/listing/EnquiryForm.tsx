import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send, AlertCircle, CheckCircle2, Lock, FileSignature } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnquiryFormProps {
  isAuthenticated: boolean;
  isNdaSigned: boolean;
  onLogin: () => void;
  onSignNda: () => void;
  listingTitle: string;
}

export function EnquiryForm({ isAuthenticated, isNdaSigned, onLogin, onSignNda, listingTitle }: EnquiryFormProps) {
  const [intents, setIntents] = useState({
    terms: false,
    price: false,
    contact: false,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      onLogin();
      return;
    }

    if (!isNdaSigned) {
      onSignNda();
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    if (message.trim().length < 20) {
      setError("Message must be at least 20 characters long.");
      return;
    }

    if (!Object.values(intents).some(Boolean)) {
      setError("Please select at least one topic for your enquiry.");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setMessage('');
      setIntents({ terms: false, price: false, contact: false });
      setAgreedToTerms(false);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <Card className="border-green-100 bg-green-50/50 shadow-sm" id="enquiry-section">
        <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-green-900 mb-2">Enquiry Sent!</h3>
          <p className="text-green-700 text-sm mb-6 max-w-xs mx-auto">
            The listing agent has received your message regarding <span className="font-medium">"{listingTitle}"</span> and will be in touch shortly.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
            className="bg-white border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden relative" id="enquiry-section">
      {!isAuthenticated && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 max-w-sm w-full">
            <h3 className="font-bold text-slate-900 mb-2">Sign in to Enquire</h3>
            <p className="text-sm text-slate-500 mb-6">
              Create an account or sign in to contact the agent and discuss this opportunity.
            </p>
            <Button onClick={onLogin} className="w-full bg-brand-orange hover:bg-brand-orange/90">
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      )}

      {isAuthenticated && !isNdaSigned && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 max-w-sm w-full">
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Confidential Enquiry</h3>
            <p className="text-sm text-slate-500 mb-6">
              This listing requires a signed Non-Disclosure Agreement (NDA) before you can contact the agent.
            </p>
            <Button onClick={onSignNda} className="w-full bg-brand-orange hover:bg-brand-orange/90 gap-2">
              <FileSignature className="h-4 w-4" /> Sign NDA to Enquire
            </Button>
          </div>
        </div>
      )}

      <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-orange/10 rounded-full flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-brand-orange" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">Enquire about this project</CardTitle>
            <p className="text-sm text-slate-500 mt-0.5">Contact the listing agent directly</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700">I'm interested in:</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={intents.terms}
                  onCheckedChange={(checked) => setIntents(prev => ({ ...prev, terms: checked as boolean }))}
                  className="border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600">
                  Commercial Terms
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="price" 
                  checked={intents.price}
                  onCheckedChange={(checked) => setIntents(prev => ({ ...prev, price: checked as boolean }))}
                  className="border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <label htmlFor="price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600">
                  Price Discussion
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="contact" 
                  checked={intents.contact}
                  onCheckedChange={(checked) => setIntents(prev => ({ ...prev, contact: checked as boolean }))}
                  className="border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <label htmlFor="contact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600">
                  More Information
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hi, I'm interested in this project. Could you please provide more details about..." 
              className="min-h-[120px] resize-none bg-slate-50 border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <p className={cn("text-xs", message.length > 0 && message.length < 20 ? "text-red-500" : "text-slate-400")}>
                {message.length} / 20 characters minimum
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2 border-t border-slate-100">
            <Checkbox 
              id="tos" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-0.5 border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
            />
            <label htmlFor="tos" className="text-xs text-slate-500 leading-normal cursor-pointer">
              I agree to the <a href="#" className="text-brand-orange hover:underline">Terms of Service</a> and <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a>. I understand that my enquiry will be sent directly to the listing agent.
            </label>
          </div>

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1 font-medium bg-red-50 p-2 rounded">
              <AlertCircle className="h-3 w-3" /> {error}
            </p>
          )}

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 font-medium shadow-sm transition-all" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" /> Send Enquiry
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
