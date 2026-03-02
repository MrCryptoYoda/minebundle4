
import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowDown, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useDemo } from "@/context/DemoContext"

import { MultiSelectTypeahead, Option } from "@/components/buyer/MultiSelectTypeahead"
import { SuccessStateCard, WhatHappensNext, TrustBlock, ConsentRow } from "@/components/buyer/BuyerInterestComponents"
import { COMMODITY_TAXONOMY } from "@/data/commodityTaxonomy"
import { LOCATION_TAXONOMY } from "@/data/locationTaxonomy"

export default function BuyerInterestPage() {
  const { isAuthenticated } = useDemo()
  const { toast } = useToast()
  const formRef = React.useRef<HTMLDivElement>(null)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Form State
  const [formData, setFormData] = React.useState({
    fullName: isAuthenticated ? "John Doe" : "",
    email: isAuthenticated ? "john@example.com" : "",
    phone: "",
    company: "",
    role: "",
    sectors: [] as string[],
    commodities: [] as string[],
    regions: [] as string[],
    assetTypes: [] as string[],
    stage: [] as string[],
    ticketSize: "",
    dealStructures: [] as string[],
    timeline: "",
    agentConnect: "yes",
    ndaReadiness: false,
    notes: "",
    consent: false
  })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Options Data
  const sectorOptions: Option[] = COMMODITY_TAXONOMY.map(s => ({ label: s.name, value: s.id }))
  const commodityOptions: Option[] = COMMODITY_TAXONOMY.flatMap(s => s.commodities).map(c => ({ label: c.name, value: c.id }))
  const regionOptions: Option[] = LOCATION_TAXONOMY.map(r => ({ label: r.name, value: r.id }))
    .concat(LOCATION_TAXONOMY.flatMap(r => r.countries).map(c => ({ label: c.name, value: c.name })))
  
  const assetTypes = ["Mining Project", "Claim", "Royalty Asset", "Renewable Asset", "Offtake"]
  const stages = ["Exploration", "Development", "Production", "Care & Maintenance"]
  const dealStructures = ["Direct Sale", "Joint Venture", "Farm-in/out", "Royalty", "Offtake", "M&A"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.fullName || !formData.email) {
      setError("Please fill in all required contact fields.")
      return
    }
    if (formData.sectors.length === 0 && formData.commodities.length === 0) {
      setError("Please select at least one commodity sector or commodity.")
      return
    }
    if (formData.regions.length === 0) {
      setError("Please select at least one preferred region.")
      return
    }
    if (!formData.consent) {
      setError("Please agree to the consent checkbox to proceed.")
      return
    }

    setIsSubmitting(true)

    // Simulate API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: "Interest Registered",
        description: "We've received your criteria successfully."
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Register Buyer Interest
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Share your investment criteria and receive relevant opportunities from the Minexchange network.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-slate-400 mb-10">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> Confidential handling</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> Vetted opportunities</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> Agent facilitation</span>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 h-12 text-lg"
          >
            Submit your criteria <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-12">
        
        {/* Main Form Column */}
        <div className="lg:col-span-2" ref={formRef}>
          {isSuccess ? (
            <SuccessStateCard />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Section A: Contact */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-lg font-bold text-slate-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
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
                      <Label htmlFor="role">Role / Title (Optional)</Label>
                      <Input 
                        id="role" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company / Organization</Label>
                      <Input 
                        id="company" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section B: Investment Criteria */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-lg font-bold text-slate-900">Investment Criteria</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Commodity Sectors *</Label>
                    <MultiSelectTypeahead 
                      options={sectorOptions}
                      selected={formData.sectors}
                      onChange={(val) => setFormData({...formData, sectors: val})}
                      placeholder="Select sectors..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Specific Commodities</Label>
                    <MultiSelectTypeahead 
                      options={commodityOptions}
                      selected={formData.commodities}
                      onChange={(val) => setFormData({...formData, commodities: val})}
                      placeholder="Select commodities..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Regions *</Label>
                    <MultiSelectTypeahead 
                      options={regionOptions}
                      selected={formData.regions}
                      onChange={(val) => setFormData({...formData, regions: val})}
                      placeholder="Select regions or countries..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <Label>Asset Types</Label>
                      <MultiSelectTypeahead 
                        options={assetTypes.map(a => ({ label: a, value: a }))}
                        selected={formData.assetTypes}
                        onChange={(val) => setFormData({...formData, assetTypes: val})}
                        placeholder="Select asset types..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Stage</Label>
                      <MultiSelectTypeahead 
                        options={stages.map(s => ({ label: s, value: s }))}
                        selected={formData.stage}
                        onChange={(val) => setFormData({...formData, stage: val})}
                        placeholder="Select stages..."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Ticket Size / Capital Range</Label>
                      <Select value={formData.ticketSize} onValueChange={(val) => setFormData({...formData, ticketSize: val})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<5M">&lt; $5M</SelectItem>
                          <SelectItem value="5M-20M">$5M - $20M</SelectItem>
                          <SelectItem value="20M-50M">$20M - $50M</SelectItem>
                          <SelectItem value="50M-100M">$50M - $100M</SelectItem>
                          <SelectItem value="100M+">$100M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Deal Structures</Label>
                      <MultiSelectTypeahead 
                        options={dealStructures.map(d => ({ label: d, value: d }))}
                        selected={formData.dealStructures}
                        onChange={(val) => setFormData({...formData, dealStructures: val})}
                        placeholder="Select deal types..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section C: Timing & Engagement */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-lg font-bold text-slate-900">Timing & Engagement</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <Label>Investment Timeline</Label>
                    <RadioGroup value={formData.timeline} onValueChange={(val) => setFormData({...formData, timeline: val})} className="flex flex-wrap gap-4">
                      {["Immediately", "3-6 months", "6-12 months"].map(t => (
                        <div key={t} className="flex items-center space-x-2">
                          <RadioGroupItem value={t} id={`timeline-${t}`} />
                          <Label htmlFor={`timeline-${t}`} className="font-normal">{t}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Would you like to be connected to an agent?</Label>
                    <RadioGroup value={formData.agentConnect} onValueChange={(val) => setFormData({...formData, agentConnect: val})} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="agent-yes" />
                        <Label htmlFor="agent-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="agent-no" />
                        <Label htmlFor="agent-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="nda" 
                      checked={formData.ndaReadiness}
                      onCheckedChange={(c) => setFormData({...formData, ndaReadiness: c as boolean})}
                    />
                    <label
                      htmlFor="nda"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 mt-0.5"
                    >
                      I am comfortable signing an NDA to review data rooms.
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Section D: Notes */}
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Criteria or Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Preferred jurisdictions, grade thresholds, infrastructure constraints..."
                      className="min-h-[100px]"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                  
                  <ConsentRow checked={formData.consent} onCheckedChange={(c) => setFormData({...formData, consent: c})} />
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-14 text-lg bg-brand-orange hover:bg-brand-orange/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Buyer Interest"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <WhatHappensNext />
          <TrustBlock />
        </div>
      </div>

      {/* CTA Band */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 px-4 sm:px-6 text-center mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Not ready to submit?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                Browse projects
              </Button>
            </Link>
            <Link to="/agents">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-slate-600 hover:text-brand-orange">
                Explore Agents
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
