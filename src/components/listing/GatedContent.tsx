import React from 'react';
import { Lock, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GatedContentProps {
  title: string;
  isAuthenticated: boolean;
  onLogin: () => void;
  onSignNda: () => void;
  className?: string;
  description?: string;
  // Deprecated but kept for backward compatibility if needed, though we will remove usage
  onAction?: () => void; 
}

export function GatedContent({ title, isAuthenticated, onLogin, onSignNda, onAction, className, description }: GatedContentProps) {
  const handleAction = () => {
    if (isAuthenticated) {
      onSignNda();
    } else {
      onLogin();
    }
  };

  // Fallback to onAction if provided (for legacy usage)
  const finalAction = onAction || handleAction;

  return (
    <div className={cn(
      "border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center text-center bg-slate-50/50 relative overflow-hidden group hover:border-brand-orange/30 transition-colors",
      className
    )}>
      {/* Subtle background pattern or blur effect could go here */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-0" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
          <Lock className="h-5 w-5 text-slate-400 group-hover:text-brand-orange transition-colors" />
        </div>
        
        <h4 className="font-semibold text-slate-900 mb-2">Restricted Access</h4>
        
        <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
          {description || (isAuthenticated 
            ? `You must sign the Non-Disclosure Agreement (NDA) to view the ${title}.`
            : `Please sign in and execute the NDA to view the ${title}.`
          )}
        </p>
        
        <Button onClick={finalAction} className="gap-2 shadow-sm hover:shadow-md transition-all bg-slate-900 hover:bg-slate-800 text-white">
          {isAuthenticated ? <FileText className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          {isAuthenticated ? "Sign NDA to Unlock" : "Sign In to Access"}
        </Button>
      </div>
    </div>
  );
}
