

import * as React from "react"
import { Link } from "react-router-dom"
import { 
  ArrowRight, 
  Hexagon, 
  Zap, 
  Factory, 
  Search, 
  CheckCircle2,
  Loader2,
  Globe,
  MapPin,
  Shield,
  Users,
  FileText,
  Layers,
  BarChart3,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// --- Components ---

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-3 block">
      {children}
    </span>
  )
}

function SectionHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight", className)}>
      {children}
    </h2>
  )
}

// --- Page ---

export default function ReetokenPartnerPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Section A: Hero (Top Banner) */}
      <section className="pt-6 pb-12 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="relative h-[480px] md:h-[520px] w-full rounded-[28px] overflow-hidden flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REEToken%20Hero%20Image%20(1).png" 
              alt="Tokenization Infrastructure" 
              className="w-full h-full object-cover"
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-white px-8 md:px-16 max-w-3xl w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REELogo.png" 
                alt="REEToken" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              From Mineral Assets to <span className="text-[#D35400]">Advanced Materials</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed">
              Nora Future Technologies (NFT) turns Dead Sea minerals and strategic deposits into high-value advanced materials using proprietary green extraction and nanomanufacturing.
            </p>
            <Button 
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-12 font-medium text-sm transition-all"
              onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore NFT Technology Platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Decorative Circle Placeholder */}
          <div className="absolute bottom-12 left-16 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full hidden md:block" />
        </div>
      </section>

      {/* Section B: "Our offering" (End-to-End Tokenization) */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto">
        <div className="mb-12 max-w-3xl">
          <SectionLabel>Our offering</SectionLabel>
          <SectionHeading>End-to-End Mineral-to-Material Value Chain</SectionHeading>
          <p className="text-lg text-slate-600 leading-relaxed">
            A structured pathway from resource proof to industrial readiness, integrating validation, extraction, and production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Offering Items */}
          <div className="space-y-12">
            {[
              { 
                icon: FileText, 
                title: "Technology-Backed Resource Structuring", 
                desc: "Validated resource models and processing pathways that support tokenizable asset structuring." 
              },
              { 
                icon: Zap, 
                title: "Extraction-to-Product Validation", 
                desc: "Pilot-scale validation to confirm technical credibility before any financial structuring." 
              },
              { 
                icon: Users, 
                title: "Industrial Offtake & Market Integration", 
                desc: "Materials for construction, water treatment, composites, and battery-grade mineral salts." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="h-12 w-12 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-md group-hover:bg-[#D35400] transition-colors duration-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{item.desc}</p>
                  <Link to="#" className="text-[#D35400] font-medium text-sm flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image Card */}
          <div className="h-full min-h-[500px] rounded-[28px] overflow-hidden shadow-xl relative">
            <img 
              src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REEToken%20Hero%20Image%20(1).png" 
              alt="End-to-End Tokenization" 
              className="w-full h-full object-cover"
            />
             {/* Subtle overlay for depth */}
             <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* Section C: "Who we are" (About REEToken) */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <SectionLabel>Who we are</SectionLabel>
            <SectionHeading>About Nora Future Technologies (NFT)</SectionHeading>
            <div className="text-slate-600 text-lg leading-relaxed">
              <p>
                An advanced mineral technology platform specializing in bio-assisted extraction systems, hybrid acid–base nanostructure formation, and lithium enrichment. We bridge geological assets to engineered materials for scalable industrial outcomes.
              </p>
            </div>
          </div>

          {/* Right Side Callouts */}
          <div className="space-y-8 pt-4">
            {[
              { 
                icon: Shield, 
                title: "Validated Resource & Process Framework", 
                desc: "Structured estimation protocols and feasibility-level modeling prior to industrial deployment." 
              },
              { 
                icon: BarChart3, 
                title: "Designed for Institutional Capital", 
                desc: "Moves assets from geological potential to validated pathways—reducing technical uncertainty." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 shrink-0 mt-1">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Large Visual Feature Image Block */}
      <section className="py-10 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="h-[400px] md:h-[500px] w-full rounded-[28px] overflow-hidden shadow-sm">
          <img 
            src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/about-ree-token.png" 
            alt="Gold nuggets and network connections" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section E: "Why Choose REEToken" */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="bg-[#FDF8F3] rounded-[28px] p-8 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why NFT-Powered Assets</h2>
              <p className="text-lg text-slate-600 mb-10">
                Regulated tokenization infrastructure for commodity RWAs, backed by proprietary green extraction IP and industrial pilot validation.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="bg-white border-transparent text-slate-900 hover:bg-slate-50 rounded-full px-8 h-12 shadow-sm">
                  Learn more
                </Button>
                <Button 
                  className="bg-[#D35400] hover:bg-[#b54800] text-white rounded-full px-8 h-12"
                  onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact NFT
                </Button>
              </div>
            </div>

            {/* Right Content - Relationship Map (Image) */}
            <div className="relative w-full flex items-center justify-center lg:justify-end py-8 md:py-0">
              <img 
                src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REEToken%20New%20Flow%20Image%20(1).png" 
                alt="REEToken Process Flow" 
                className="w-full max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section F: Proof Metrics (Stats Strip) */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Regulated tokenization of commodity RWAs
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg">
          Advanced extraction + material engineering to strengthen real-world asset defensibility before issuance.
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="text-[#D35400] text-6xl md:text-7xl font-bold tracking-tight">4</div>
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">Active Patent Filings</div>
          </div>
          <div className="space-y-2">
            <div className="text-[#D35400] text-6xl md:text-7xl font-bold tracking-tight">2</div>
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">Resource Streams</div>
          </div>
          <div className="space-y-2">
            <div className="text-[#D35400] text-6xl md:text-7xl font-bold tracking-tight">3</div>
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">Stage Validation</div>
          </div>
        </div>
      </section>

      {/* Section G: Enquiry Form */}
      <section id="enquiry-form" className="py-20 px-6 max-w-[860px] mx-auto">
        <div className="bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Send us your enquiry</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Reach out to learn how REEToken can support your venture.
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-20">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Thank you — your enquiry has been sent</h3>
              <p className="text-slate-600 mb-8">We’ll get back to you shortly.</p>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name <span className="text-red-500">*</span></Label>
                  <Input id="firstName" required className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name <span className="text-red-500">*</span></Label>
                  <Input id="lastName" required className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" required className="bg-white border-slate-200 h-12 rounded-xl" />
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex gap-3">
                  <select 
                    className="flex h-12 w-[120px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="AU"
                  >
                    <option value="AU">🇦🇺 +61</option>
                    <option value="US">🇺🇸 +1</option>
                    <option value="UK">🇬🇧 +44</option>
                    <option value="CA">🇨🇦 +1</option>
                  </select>
                  <Input id="phone" type="tel" className="bg-white border-slate-200 h-12 flex-1 rounded-xl" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name <span className="text-red-500">*</span></Label>
                  <Input id="companyName" required className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Company website</Label>
                  <Input id="website" type="url" className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Company address</Label>
                  <Input id="address" className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Mines location <span className="text-red-500">*</span></Label>
                  <Input id="location" required className="bg-white border-slate-200 h-12 rounded-xl" />
                </div>
              </div>

              {/* Row 6 */}
              <div className="space-y-2">
                <Label htmlFor="metrics">Key elements and metrics</Label>
                <Input id="metrics" placeholder="E.g., asset type, jurisdiction, stage, target raise, structure preference..." className="bg-white border-slate-200 h-12 rounded-xl" />
              </div>

              {/* Row 7 */}
              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe what you want to tokenize, target investors, compliance constraints, timelines, and any supporting context." 
                  required 
                  className="min-h-[160px] bg-white border-slate-200 resize-none p-4 rounded-xl" 
                />
              </div>

              {/* Row 8 - Privacy & reCAPTCHA */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Checkbox id="privacy" required className="mt-1" />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-slate-600 leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    You agree to our friendly privacy policy
                  </label>
                </div>

                {/* reCAPTCHA Placeholder */}
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center gap-3 w-fit pr-8">
                  <Checkbox id="recaptcha" className="h-6 w-6 border-2 border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                  <label htmlFor="recaptcha" className="text-sm text-slate-600 font-medium cursor-pointer">I'm not a robot</label>
                  <div className="ml-2 flex flex-col items-center justify-center">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="h-8 w-8 opacity-50" />
                    <span className="text-[8px] text-slate-400 leading-none mt-0.5">reCAPTCHA</span>
                    <span className="text-[8px] text-slate-400 leading-none">Privacy - Terms</span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#D35400] hover:bg-[#b54800] text-white font-medium px-10 h-14 rounded-full w-full sm:w-auto text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </div>

            </form>
          )}
        </div>
      </section>

    </div>
  )
}
