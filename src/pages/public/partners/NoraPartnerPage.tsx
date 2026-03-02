
import * as React from "react"
import { 
  ArrowRight, 
  TrendingUp, 
  Search, 
  MapPin,
  CheckCircle2,
  ClipboardList,
  Database,
  Crosshair,
  Rocket,
  Beaker,
  History,
  Scale,
  Zap,
  FileText,
  Target,
  BarChart3,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// --- Components ---

function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("text-orange-500 font-bold text-sm uppercase tracking-widest mb-3 block", className)}>
      {children}
    </span>
  )
}

function SectionHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight", className)}>
      {children}
    </h2>
  )
}

function SectionSubtext({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("text-slate-600 text-lg leading-relaxed", className)}>
      {children}
    </p>
  )
}

// --- Page ---

export default function NoraPartnerPage() {
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
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* 1. Hero Section */}
      <div className="px-4 pt-4 pb-12 md:px-8 max-w-[1440px] mx-auto">
        <section className="relative h-[600px] w-full overflow-hidden rounded-3xl flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="Mining Excavation" 
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient (Left to Right) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          {/* Content - Left Aligned */}
          <div className="relative z-10 text-white px-8 md:px-16 max-w-3xl">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/Nore%20Logo.png" 
                alt="NORA Future Technologies" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              NORA <span className="text-orange-500">Future technologies</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-xl font-light leading-relaxed opacity-90">
              Nano-Engineered Extraction Platforms for Sustainable Mineral Recovery
            </p>
            <Button 
              onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-14 text-lg font-medium transition-all hover:scale-105"
            >
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      {/* 2. Offerings Section */}
      <section id="offerings" className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:sticky lg:top-24 pr-8">
            <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-8">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-[1.15]">
              Cleaner mineral recovery from tailings
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Mining tailings are a major underutilized source of critical metals. Nora Future Technologies addresses this through nano-engineered selective extraction systems that enhance recovery efficiency while reducing environmental footprint at industrial scale.
            </p>
          </div>

          {/* Right Column - 2x2 Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { 
                icon: ClipboardList, 
                title: "Tailings assessment intake", 
                desc: "Comprehensive mineralogical and geochemical analysis to determine recovery potential." 
              },
              { 
                icon: Database, 
                title: "Existing data review", 
                desc: "Evaluation of historical processing data to identify optimization opportunities." 
              },
              { 
                icon: Target, 
                title: "Target mineral focus", 
                desc: "Specialized extraction pathways for gold, copper, rare earths, and other critical metals." 
              },
              { 
                icon: Rocket, 
                title: "Pilot to commercial roadmap", 
                desc: "Scalable implementation from initial testing to full industrial deployment." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start h-full min-h-[280px]">
                <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white mb-6">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 leading-tight">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">{card.desc}</p>
                <div className="flex items-center text-orange-500 text-sm font-semibold cursor-pointer hover:text-orange-600 group">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <SectionLabel className="text-center mx-auto">Features</SectionLabel>
          <SectionHeading className="text-center">Nanotechnology-driven extraction for mining tailings</SectionHeading>
          <SectionSubtext className="text-center max-w-2xl mx-auto">
            We transform legacy tailings into economically viable resources through advanced recovery engineering, unlocking new revenue opportunities.
          </SectionSubtext>
        </div>

        {/* Banner Image */}
        <div className="w-full h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden mb-16 relative shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2000&auto=format&fit=crop" 
            alt="Robotic Hand Technology" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3 Columns Sub-features */}
        <div className="grid md:grid-cols-3 gap-12 px-4 max-w-6xl mx-auto">
          {[
            { title: "Tailings composition & volume", desc: "Deep analysis of historical tailings to maximize extraction efficiency." },
            { title: "Processing history context", desc: "Leveraging historical data to optimize nano-enabled separation processes." },
            { title: "Regulatory & site logistics", desc: "Solutions engineered to meet evolving environmental standards and logistics." }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="h-1 w-16 bg-orange-500 mx-auto mb-6 rounded-full" />
              <h3 className="font-bold text-slate-900 text-lg mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Nora */}
      <div className="px-4 md:px-8 max-w-[1440px] mx-auto py-12">
        <section className="bg-[#FFFBF5] rounded-[2.5rem] py-24 px-6 md:px-16 overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Why Choose Nora</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                Nora Future Technologies combines scientific innovation with industrial execution to accelerate the transition toward cleaner mineral recovery. We advance nano-enabled solutions capable of supporting modern mining operations in a sustainability-driven economy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="bg-white border-slate-200 text-slate-900 hover:bg-slate-50 rounded-full px-8 h-12 font-medium">
                  Learn more
                </Button>
                <Button 
                  onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 h-12 shadow-lg shadow-orange-600/20 font-medium"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right Collage - 3 Column Grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]">
              {/* Image B: Top Left */}
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  alt="Industrial" 
                />
              </div>
              
              {/* Image A: Right (Tall) - Spans 2 cols, 2 rows */}
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1740&auto=format&fit=crop" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  alt="Lab" 
                />
              </div>

              {/* Image C: Bottom Left */}
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1516937941344-00b4ec7330f1?q=80&w=1740&auto=format&fit=crop" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  alt="Space" 
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. Stats / About Us Section */}
      <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <SectionLabel className="text-center mx-auto">About us</SectionLabel>
          <SectionHeading className="text-center max-w-3xl mx-auto">Innovating for a Sustainable Future</SectionHeading>
          <SectionSubtext className="text-center max-w-3xl mx-auto">
            Developing advanced extraction platforms that enable responsible resource recovery and long-term environmental performance.
          </SectionSubtext>
        </div>

        <div className="w-full h-[500px] rounded-[2rem] overflow-hidden relative flex items-end justify-center pb-12 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Office Meeting" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Frosted Glass Tiles */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl gap-6 px-6">
            {[
              { val: "400+", label: "Samples Processed" },
              { val: "600%", label: "Recovery Uplift" },
              { val: "10k", label: "Tons Assessed" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl text-center text-white hover:bg-white/40 transition-colors shadow-lg">
                <div className="text-5xl font-bold mb-2">{stat.val}</div>
                <div className="text-sm font-medium opacity-90 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Enquiry Form */}
      <section id="enquiry-form" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
          
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading className="mb-12">Enquire on how Nora Future<br/>Technologies can support you</SectionHeading>

          {isSuccess ? (
            <div className="text-center py-20">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent Successfully</h3>
              <p className="text-slate-600 mb-8 text-lg">Thank you for your enquiry. Our team will be in touch shortly.</p>
              <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full px-8">Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Group 1 */}
              <div className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Ex: John Mineral Group" required className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-orange-500" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Primary Contact Person</Label>
                      <Input id="contactPerson" placeholder="Ex: John Doe" required className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-orange-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Ex: john@company.com" required className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-orange-500" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Title</Label>
                      <Input id="position" placeholder="Ex: Director" required className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-orange-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🇦🇪 +971</span>
                        <Input id="phone" type="tel" placeholder="Enter phone number" required className="bg-slate-50 border-slate-200 pl-20 h-12 rounded-xl focus:ring-orange-500" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Country/Site Location</Label>
                    <div className="relative">
                      <select 
                        id="location" 
                        required 
                        defaultValue=""
                        className="w-full bg-slate-50 border border-slate-200 h-12 rounded-xl focus:ring-orange-500 px-4 appearance-none text-slate-900"
                      >
                        <option value="" disabled>Select a location</option>
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">United States</option>
                        <option value="chile">Chile</option>
                        <option value="peru">Peru</option>
                        <option value="south-africa">South Africa</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2 */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <div>
                  <Label className="text-base font-semibold text-slate-900 mb-4 block">Target Minerals</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {["Gold", "Silver", "Copper", "Nickel", "Cobalt", "Rare Earth Elements", "Iron", "Aluminum"].map((m) => (
                      <div key={m} className="flex items-center space-x-2 border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                        <Checkbox id={`mineral-${m}`} />
                        <label htmlFor={`mineral-${m}`} className="text-sm text-slate-600 cursor-pointer flex-1">{m}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold text-slate-900 mb-4 block">Priority Objectives</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {["Maximum recovery", "Environmental remediation", "Commercial feasibility study", "Pilot-scale testing", "Full-scale processing"].map((o) => (
                      <div key={o} className="flex items-center space-x-2 border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                        <Checkbox id={`obj-${o}`} />
                        <label htmlFor={`obj-${o}`} className="text-sm text-slate-600 cursor-pointer flex-1">{o}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group 3 */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <div>
                  <Label className="text-base font-semibold text-slate-900 mb-4 block">Timeline</Label>
                  <RadioGroup defaultValue="immediate" className="flex flex-wrap gap-4">
                    {["Immediate", "Within 1-2 months", "Within 6 months"].map((t) => (
                      <div key={t} className="flex items-center space-x-2 border border-slate-100 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                        <RadioGroupItem value={t.toLowerCase().replace(/\s/g, '-')} id={`time-${t}`} />
                        <Label htmlFor={`time-${t}`} className="text-sm font-normal text-slate-600 cursor-pointer">{t}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-base font-semibold text-slate-900 mb-4 block">Outcomes</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {["Full feasibility study", "Nanotechnology-based extraction proposal", "Pilot plant design", "Commercial partnership"].map((o) => (
                      <div key={o} className="flex items-center space-x-2 border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                        <Checkbox id={`outcome-${o}`} />
                        <label htmlFor={`outcome-${o}`} className="text-sm text-slate-600 cursor-pointer flex-1">{o}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group 4 */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <div>
                  <Label className="text-base font-semibold text-slate-900 mb-4 block">Additional Notes</Label>
                  <Textarea placeholder="Please provide any additional information..." className="min-h-[120px] bg-slate-50 border-slate-200 rounded-xl focus:ring-orange-500" />
                </div>
              </div>

              {/* Recaptcha Placeholder */}
              <div className="bg-slate-50 border border-slate-200 rounded p-3 w-fit flex items-center gap-4">
                <Checkbox id="robot" />
                <label htmlFor="robot" className="text-sm text-slate-600">I'm not a robot</label>
                <div className="flex flex-col items-center ml-4">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="h-8 w-8 opacity-50" />
                  <span className="text-[8px] text-slate-400">reCAPTCHA</span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium h-14 text-lg rounded-full w-full shadow-xl shadow-orange-900/10 transition-all hover:scale-[1.01]"
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
