import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, FileSignature, CheckCircle2, Type, PenTool, Eraser } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

interface NDAPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  listingTitle: string;
}

export function NDAPromptModal({ isOpen, onClose, onContinue, listingTitle }: NDAPromptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-slate-400" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Confidential Access Required</DialogTitle>
          <DialogDescription className="text-center text-slate-500 mt-2">
            To access the data room and sensitive details for <span className="font-semibold text-slate-900">"{listingTitle}"</span>, 
            you must execute a Non-Disclosure Agreement (NDA).
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 sm:justify-center gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button onClick={onContinue} className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 gap-2">
            <FileSignature className="h-4 w-4" /> Review & Sign NDA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface NDASigningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: () => void;
  listingTitle: string;
}

export function NDASigningModal({ isOpen, onClose, onSign, listingTitle }: NDASigningModalProps) {
  const [signatureType, setSignatureType] = useState('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

  const handleSign = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      onSign();
      onClose();
    }, 1000);
  };

  const clearCanvas = () => {
    sigCanvas.current?.clear();
    setIsCanvasEmpty(true);
  };

  const isFormValid = agreed && (
    (signatureType === 'type' && typedSignature.length >= 3) ||
    (signatureType === 'draw' && !isCanvasEmpty)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-brand-orange" />
            Sign Non-Disclosure Agreement
          </DialogTitle>
          <DialogDescription>
            Please review the terms below for <span className="font-semibold text-slate-900">{listingTitle}</span>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-md bg-slate-50 p-4 h-48 overflow-y-auto text-xs text-slate-600 leading-relaxed mb-4 font-mono">
          <p className="font-bold mb-2 text-slate-900">CONFIDENTIALITY AGREEMENT</p>
          <p className="mb-2">This Agreement is made effective as of {new Date().toLocaleDateString()} between The Minexchange ("Discloser") and the User ("Recipient").</p>
          <p className="mb-2">1. <strong>Confidential Information.</strong> The term "Confidential Information" means any information or material which is proprietary to the Discloser, whether or not owned or developed by the Discloser, which is not generally known other than by the Discloser, and which the Recipient may obtain through any direct or indirect contact with the Discloser.</p>
          <p className="mb-2">2. <strong>Protection of Confidential Information.</strong> The Recipient understands and acknowledges that the Confidential Information has been developed or obtained by the Discloser by the investment of significant time, effort and expense, and that the Confidential Information is a valuable, special and unique asset of the Discloser which provides the Discloser with a significant competitive advantage, and needs to be protected from improper disclosure.</p>
          <p className="mb-2">3. <strong>Non-Disclosure.</strong> The Recipient agrees to hold the Confidential Information in confidence and to not disclose the Confidential Information to any person or entity without the prior written consent of the Discloser.</p>
          <p className="mb-2">4. <strong>Term.</strong> The obligations of this Agreement shall survive for a period of two (2) years from the date hereof.</p>
          <p>...</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="agree" 
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="agree" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-700">
              I have read and agree to the terms of the Non-Disclosure Agreement.
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Signature Method</label>
            <Tabs defaultValue="type" onValueChange={setSignatureType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="type" className="gap-2"><Type className="h-4 w-4" /> Type</TabsTrigger>
                <TabsTrigger value="draw" className="gap-2"><PenTool className="h-4 w-4" /> Draw</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="mt-4 space-y-2">
                <Input 
                  placeholder="Type your full name" 
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  className="font-serif italic text-lg h-12 bg-slate-50 border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20"
                />
                <p className="text-xs text-slate-400">By typing your name, you are executing this agreement electronically.</p>
              </TabsContent>
              
              <TabsContent value="draw" className="mt-4 space-y-2">
                <div className="border rounded-md bg-white h-32 relative overflow-hidden touch-none">
                  <SignatureCanvas 
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: 'w-full h-full' }}
                    onEnd={() => setIsCanvasEmpty(false)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCanvas}
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    title="Clear Signature"
                  >
                    <Eraser className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-400">Draw your signature above using your mouse or touch screen.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSign} 
            disabled={!isFormValid || isSigning}
            className="bg-brand-orange hover:bg-brand-orange/90 min-w-[120px]"
          >
            {isSigning ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Sign & Access
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
