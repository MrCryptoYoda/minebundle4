
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Download, CheckCircle } from "lucide-react"
import { Guide } from "@/data/mockContent"

interface DownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guide: Guide | null
}

export function DownloadModal({ open, onOpenChange, guide }: DownloadModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    updates: false
  })

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setIsSuccess(false)
      setFormData({ name: "", email: "", company: "", updates: false })
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({
        title: "Download Started",
        description: `Check your email (${formData.email}) for the download link.`
      })
    }, 1500)
  }

  if (!guide) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 mb-2">Success!</DialogTitle>
            <p className="text-slate-600 mb-6">
              Your download of <strong>{guide.title}</strong> has started. We've also sent a copy to your email.
            </p>
            <Button onClick={() => onOpenChange(false)} className="w-full">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Download Guide</DialogTitle>
              <DialogDescription>
                Enter your details to access <strong>{guide.title}</strong>.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input 
                  id="company" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="updates" 
                  checked={formData.updates}
                  onCheckedChange={(c) => setFormData({...formData, updates: c as boolean})}
                />
                <label
                  htmlFor="updates"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 mt-0.5"
                >
                  Send me relevant updates and market insights.
                </label>
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
