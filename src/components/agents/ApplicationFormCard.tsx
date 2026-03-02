
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useDemo } from "@/context/DemoContext"

export function ApplicationFormCard() {
  const { toast } = useToast()
  const { isAuthenticated, userName } = useDemo() // userName not actually in context type but let's assume or mock
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  const [formData, setFormData] = React.useState({
    fullName: isAuthenticated ? "John Doe" : "", // Mock prefill
    company: "",
    email: isAuthenticated ? "john@example.com" : "",
    phone: "",
    regions: "",
    commodities: "",
    experience: "",
    website: "",
    agree: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agree) {
      toast({
        variant: "destructive",
        title: "Agreement required",
        description: "Please agree to be contacted to proceed."
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({
        title: "Application Submitted",
        description: "Our team will review your profile and contact you shortly."
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <Card className="border-brand-orange/20 shadow-lg bg-white">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Thank you for applying to become an MXE Agent. Our team will review your details and contact you within 2-3 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agents">
              <Button variant="outline" className="w-full sm:w-auto">Explore Agents</Button>
            </Link>
            <Link to="/">
              <Button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90">Return Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-200 shadow-lg bg-white">
      <CardHeader className="bg-slate-50 border-b border-slate-100 p-6 sm:p-8">
        <CardTitle className="text-2xl font-bold text-slate-900">Agent Application</CardTitle>
        <CardDescription>
          Tell us about your experience and focus areas.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input 
                id="fullName" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Agency *</Label>
              <Input 
                id="company" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regions">Regions Served (e.g. Australia, Africa)</Label>
            <Input 
              id="regions" 
              placeholder="Enter regions..."
              value={formData.regions}
              onChange={(e) => setFormData({...formData, regions: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commodities">Commodities Focus (e.g. Gold, Copper)</Label>
            <Input 
              id="commodities" 
              placeholder="Enter commodities..."
              value={formData.commodities}
              onChange={(e) => setFormData({...formData, commodities: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Summary</Label>
            <Textarea 
              id="experience" 
              placeholder="Briefly describe your mining brokerage experience..."
              className="min-h-[100px]"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">LinkedIn / Website URL</Label>
            <Input 
              id="website" 
              placeholder="https://..."
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
            />
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="agree" 
              checked={formData.agree}
              onCheckedChange={(c) => setFormData({...formData, agree: c as boolean})}
            />
            <label
              htmlFor="agree"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 mt-0.5"
            >
              I agree to be contacted by Minexchange regarding this application.
            </label>
          </div>

          <Button type="submit" className="w-full h-12 text-lg bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
