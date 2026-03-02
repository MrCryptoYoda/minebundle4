import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface LockedOverlayProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  isLocked: boolean;
  className?: string;
}

export function LockedOverlay({ 
  children, 
  title = "Premium Feature", 
  description = "Upgrade to Pro to unlock this insight.", 
  ctaText = "Upgrade to Pro", 
  ctaLink = "/insights/billing",
  isLocked,
  className
}: LockedOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative overflow-hidden group", className)}>
      {/* Blurred Content */}
      <div className="filter blur-sm opacity-50 pointer-events-none select-none transition-all duration-300 group-hover:blur-md group-hover:opacity-40">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-b from-transparent via-black/20 to-black/60 p-6 text-center animate-in fade-in duration-500">
        <div className="bg-[#1C1C24]/90 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl max-w-xs transform transition-transform duration-300 group-hover:scale-105">
          <div className="mx-auto bg-brand-orange/10 p-3 rounded-full w-fit mb-3 border border-brand-orange/20">
            <Lock className="h-6 w-6 text-brand-orange" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {description}
          </p>
          <Button size="sm" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium shadow-lg shadow-brand-orange/20" asChild>
            <Link to={ctaLink}>
              <Sparkles className="h-3 w-3 mr-2 fill-current" />
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
