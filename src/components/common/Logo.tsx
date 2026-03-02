import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
  // showText prop is deprecated as the new logo includes text, but kept for compatibility
  showText?: boolean 
}

export function Logo({ 
  className, 
  variant = "light",
  showText = true 
}: LogoProps) {
  const logoUrl = variant === "dark" 
    ? "https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/MXE%20Logo%20Dark.svg"
    : "https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/MXE%20Logo%20Light%20Mode.svg"

  return (
    <img 
      src={logoUrl} 
      alt="The Minexchange" 
      className={cn("h-8 w-auto object-contain", className)}
    />
  )
}
