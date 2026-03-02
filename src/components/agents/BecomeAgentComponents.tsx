
import * as React from "react"
import { 
  Globe, 
  ShieldCheck, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Award,
  CheckCircle2,
  FileCheck,
  UserCheck,
  Building2,
  Loader2,
  ArrowRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function BenefitCardGrid() {
  const benefits = [
    {
      icon: Globe,
      title: "Global Buyer Reach",
      desc: "Access thousands of verified investors and mining companies worldwide."
    },
    {
      icon: Briefcase,
      title: "Professional Listing Tools",
      desc: "Create premium data rooms and listing pages with ease."
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality Controls",
      desc: "Integrated NDA gating protects your client's sensitive data."
    },
    {
      icon: MessageSquare,
      title: "Streamlined Enquiries",
      desc: "Manage all buyer communications in one secure dashboard."
    },
    {
      icon: TrendingUp,
      title: "Commission-Driven",
      desc: "Earn commissions by successfully closing deals on the platform."
    },
    {
      icon: Award,
      title: "Premium Positioning",
      desc: "Showcase your brand alongside top-tier mining assets."
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, idx) => (
        <Card key={idx} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-4">
              <benefit.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function WorkflowStepper() {
  const steps = [
    { title: "Apply and get approved", desc: "Submit your professional credentials for review." },
    { title: "Complete agent profile", desc: "Showcase your expertise, regions, and commodities." },
    { title: "List client projects", desc: "Upload project data securely via our wizard." },
    { title: "Manage enquiries", desc: "Handle NDAs and buyer questions directly." },
    { title: "Facilitate & Close", desc: "Negotiate terms and finalize the transaction." }
  ]

  return (
    <div className="relative pl-8 border-l-2 border-slate-200 space-y-10 my-8">
      {steps.map((step, idx) => (
        <div key={idx} className="relative">
          <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-brand-orange border-4 border-white shadow-sm flex items-center justify-center">
             {/* Dot */}
          </div>
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1 block">Step {idx + 1}</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
            <p className="text-slate-600 text-sm">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RequirementsChecklist() {
  const requirements = [
    "Professional experience in mining brokerage/advisory",
    "Ability to represent listings accurately and professionally",
    "Responsiveness to buyer enquiries within 48 hours",
    "Compliance with platform policies and code of conduct"
  ]

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardContent className="p-6 sm:p-8">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-brand-orange" /> Requirements
        </h3>
        <ul className="space-y-4">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm">{req}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
