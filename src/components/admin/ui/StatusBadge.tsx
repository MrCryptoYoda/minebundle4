
import * as React from "react"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary"
  let bgClass = "bg-slate-100 text-slate-700"

  switch (status.toLowerCase()) {
    case 'active':
    case 'live':
    case 'signed':
    case 'approved':
      variant = "default"
      bgClass = "bg-green-100 text-green-700 hover:bg-green-100"
      break
    case 'pending':
    case 'pending approval':
      variant = "secondary"
      bgClass = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      break
    case 'rejected':
    case 'disabled':
    case 'not sent':
      variant = "destructive"
      bgClass = "bg-red-100 text-red-700 hover:bg-red-100"
      break
    case 'draft':
      variant = "secondary"
      bgClass = "bg-slate-100 text-slate-600 hover:bg-slate-100"
      break
    case 'sold':
      variant = "default"
      bgClass = "bg-blue-100 text-blue-700 hover:bg-blue-100"
      break
  }

  return (
    <Badge variant={variant} className={`${bgClass} border-0 font-medium ${className}`}>
      {status}
    </Badge>
  )
}
