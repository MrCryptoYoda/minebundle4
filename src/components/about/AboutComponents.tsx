
import * as React from "react"
import { 
  Search, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  Briefcase, 
  Globe, 
  TrendingUp, 
  Users,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function PillarCards() {
  const pillars = [
    {
      icon: Search,
      title: "Discover",
      desc: "Advanced search and filtering to find transactable assets globally."
    },
    {
      icon: FileText,
      title: "Evaluate",
      desc: "Structured data rooms and standardized listing details for efficient review."
    },
    {
      icon: ShieldCheck,
      title: "Confidential Access",
      desc: "Integrated NDA gating protects sensitive data while enabling access."
    },
    {
      icon: MessageSquare,
      title: "Connect",
      desc: "Direct enquiries and secure messaging between verified parties."
    },
    {
      icon: Briefcase,
      title: "Facilitate",
      desc: "Trusted agent ecosystem to support negotiation and transaction."
    }
  ]

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
      {pillars.map((pillar, idx) => (
        <Card key={idx} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 h-full">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <div className="h-12 w-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4">
              <pillar.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{pillar.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function TrustPanel() {
  return (
    <Card className="bg-slate-900 text-white border-slate-800 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none" />
      <CardContent className="p-8 sm:p-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-orange font-semibold tracking-wide uppercase text-sm mb-4">
              <Lock className="h-4 w-4" /> Confidential by Design
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure Data Rooms & NDA Gating</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We balance transparency with confidentiality. Public listings show high-level teasers, while sensitive geological and financial data remains locked until a Non-Disclosure Agreement is signed.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link to="/legal/nda" className="text-brand-orange hover:text-brand-orange/80 hover:underline">
                View NDA Agreement →
              </Link>
              <Link to="/legal/privacy" className="text-brand-orange hover:text-brand-orange/80 hover:underline">
                Privacy Policy →
              </Link>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="font-bold text-white mb-6">How Access Works</h3>
            <div className="space-y-6">
              {[
                "Open listing to view summary",
                "Create account / Sign in",
                "Sign digital NDA",
                "Access full data room"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0 border border-slate-600">
                    {i + 1}
                  </div>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RoleSwitcher() {
  const [activeRole, setActiveRole] = React.useState<'buyers' | 'sellers' | 'agents' | 'providers'>('buyers')

  const content = {
    buyers: {
      title: "For Buyers & Investors",
      desc: "Access a global pipeline of verified mining projects. Streamline your due diligence with structured data rooms and direct seller communication.",
      bullets: ["Search and shortlist projects globally", "Unlock documents via NDA", "Direct enquiries to sellers"],
      cta: "Search projects",
      link: "/search"
    },
    sellers: {
      title: "For Project Owners",
      desc: "List your asset securely to a qualified audience. Control who sees your data and manage interest through a professional dashboard.",
      bullets: ["List projects with guided wizard", "Control access via NDA", "Track views and engagement"],
      cta: "List an asset",
      link: "/list"
    },
    agents: {
      title: "For Agents & Brokers",
      desc: "Expand your reach and manage client mandates efficiently. Use our platform to market listings while protecting your commission.",
      bullets: ["List on behalf of clients", "Manage enquiries and deals", "Premium listing tools"],
      cta: "Explore Agents",
      link: "/agents"
    },
    providers: {
      title: "For Service Providers",
      desc: "Showcase your expertise to active mining companies. Connect with project owners who need your services to advance their assets.",
      bullets: ["List services in the marketplace", "Use Insights for leads", "Build brand authority"],
      cta: "Visit Marketplace",
      link: "/marketplace"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        {(['buyers', 'sellers', 'agents', 'providers'] as const).map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
              activeRole === role
                ? "bg-brand-orange text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {role.charAt(0).toUpperCase() + role.slice(1).replace('providers', 'Service Providers')}
          </button>
        ))}
      </div>

      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="p-8 sm:p-10 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">{content[activeRole].title}</h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {content[activeRole].desc}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left max-w-2xl mx-auto">
            {content[activeRole].bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">{bullet}</span>
              </div>
            ))}
          </div>
          <Link to={content[activeRole].link}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
              {content[activeRole].cta}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export function DifferentiatorsGrid() {
  const items = [
    { title: "Global Buyer Reach", desc: "Connect with investors across 50+ countries." },
    { title: "Structured Listings", desc: "Standardized data formats for easier comparison." },
    { title: "Confidentiality Controls", desc: "Bank-grade security for your sensitive documents." },
    { title: "Agent Ecosystem", desc: "Access to top-tier brokers and advisors." },
    { title: "Service Network", desc: "Integrated marketplace for mining services." },
    { title: "Data Insights", desc: "Market intelligence to inform your decisions." }
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <Card key={idx} className="border-slate-200 hover:border-brand-orange/30 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function PlatformPillarsGrid() {
  const pillars = [
    {
      title: "Explore Assets",
      desc: "Discover mining projects globally.",
      link: "/search",
      cta: "Search Projects",
      icon: Globe
    },
    {
      title: "Agents Directory",
      desc: "Find trusted brokers and advisors.",
      link: "/agents",
      cta: "Find an Agent",
      icon: Users
    },
    {
      title: "Marketplace",
      desc: "Connect with service providers.",
      link: "/marketplace",
      cta: "Browse Services",
      icon: Building2
    },
    {
      title: "Insights",
      desc: "Data and leads for providers.",
      link: "/insights",
      cta: "View Insights",
      icon: TrendingUp,
      note: "For Service Providers"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {pillars.map((p, idx) => (
        <Link key={idx} to={p.link} className="group">
          <Card className="h-full border-slate-200 hover:border-brand-orange/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-8 flex flex-col items-start h-full">
              <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-600 mb-6 flex-1">{p.desc}</p>
              {p.note && <span className="text-xs font-medium text-brand-orange mb-2 block">{p.note}</span>}
              <div className="text-sm font-bold text-brand-orange flex items-center group-hover:translate-x-1 transition-transform">
                {p.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
