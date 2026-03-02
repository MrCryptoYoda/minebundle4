import * as React from "react"
import { useDemo } from "@/context/DemoContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Settings, X } from "lucide-react"

export function DevToggle() {
  const { 
    hasInsightsSubscription, 
    setHasInsightsSubscription, 
    profileCompleteness, 
    setProfileCompleteness 
  } = useDemo()
  const [isOpen, setIsOpen] = React.useState(false)

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-white border-slate-200 hover:bg-slate-50"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="h-5 w-5 text-slate-600" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 p-4 shadow-xl border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-slate-900">Dev Controls</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Subscription Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Plan</label>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={!hasInsightsSubscription ? "default" : "outline"}
              className={!hasInsightsSubscription ? "bg-slate-900 text-white" : ""}
              onClick={() => setHasInsightsSubscription(false)}
            >
              SP_FREE
            </Button>
            <Button 
              size="sm" 
              variant={hasInsightsSubscription ? "default" : "outline"}
              className={hasInsightsSubscription ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""}
              onClick={() => setHasInsightsSubscription(true)}
            >
              SP_PAID
            </Button>
          </div>
        </div>

        {/* Profile Completeness Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Profile Completeness</label>
          <div className="flex gap-2">
            {[45, 85, 100].map((val) => (
              <Button 
                key={val}
                size="sm" 
                variant={profileCompleteness === val ? "default" : "outline"}
                className={profileCompleteness === val ? "bg-brand-orange text-white hover:bg-brand-orange/90" : ""}
                onClick={() => setProfileCompleteness(val)}
              >
                {val}%
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
