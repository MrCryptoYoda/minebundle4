
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  actionLabel: string
  onAction: (reason?: string) => void
  variant?: 'default' | 'destructive'
  requireReason?: boolean
}

export function ActionModal({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
  requireReason = false
}: ActionModalProps) {
  const [reason, setReason] = React.useState("")

  const handleAction = () => {
    onAction(reason)
    setReason("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {requireReason && (
          <div className="py-4">
            <Label htmlFor="reason" className="mb-2 block">Reason (Required)</Label>
            <Input 
              id="reason" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleAction}
            className={variant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-orange hover:bg-brand-orange/90'}
            disabled={requireReason && !reason.trim()}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
