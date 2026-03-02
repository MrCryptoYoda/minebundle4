
import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Agent } from "@/data/mockAgents"
import { Loader2 } from "lucide-react"

interface EnquiryDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: Agent | null
}

export function EnquiryDrawer({ open, onOpenChange, agent }: EnquiryDrawerProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [topic, setTopic] = React.useState("")
  const [message, setMessage] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      toast({
        title: "Enquiry Sent",
        description: `Your message has been sent to ${agent?.name}. You can view it in your messages.`,
      })
      setTopic("")
      setMessage("")
    }, 1500)
  }

  if (!agent) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Contact {agent.name}</SheetTitle>
          <SheetDescription>
            Send a direct enquiry to {agent.company}. They typically respond within 24 hours.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sell">I want to sell a project</SelectItem>
                <SelectItem value="buy">I'm looking for opportunities</SelectItem>
                <SelectItem value="general">General enquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hi, I'm interested in discussing..." 
              className="min-h-[150px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <SheetFooter className="pt-4">
            <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Enquiry"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
