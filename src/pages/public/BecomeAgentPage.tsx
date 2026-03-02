
import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

import { BenefitCardGrid, WorkflowStepper, RequirementsChecklist } from "@/components/agents/BecomeAgentComponents"
import { ApplicationFormCard } from "@/components/agents/ApplicationFormCard"

export default function BecomeAgentPage() {
  const formRef = React.useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 text-brand-orange border-brand-orange/30 px-4 py-1.5 text-sm font-medium rounded-full">
            For Brokers & Advisors
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Become an MXE Agent
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Earn commissions by connecting sellers with qualified buyers on The Minexchange.
            Join a trusted network of mining professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-14 px-8"
            >
              Apply now <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/agents">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent text-white border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Explore Agents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why become an agent?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Scale your brokerage business with our purpose-built platform for mining transactions.
          </p>
        </div>
        <BenefitCardGrid />
      </section>

      {/* 3. Workflow & Requirements */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How it works</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our streamlined process helps you get set up and listing projects quickly.
            </p>
            <WorkflowStepper />
            <div className="mt-8">
              <Button onClick={scrollToForm} variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange/5">
                Ready to apply?
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Requirements & Agreements</h2>
            <RequirementsChecklist />
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Legal Agreements</h3>
              <p className="text-sm text-slate-600 mb-4">
                You'll be required to review and accept applicable agreements during onboarding.
              </p>
              <div className="space-y-2">
                <Link to="/legal/agent-facilitation-agreement" className="block text-sm font-medium text-brand-orange hover:underline">
                  View Agent Facilitation Agreement →
                </Link>
                <Link to="/legal/facilitation-agreement" className="block text-sm font-medium text-brand-orange hover:underline">
                  View Facilitation Agreement →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Application Form */}
      <section ref={formRef} className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <ApplicationFormCard />
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "How do commissions work?", a: "Commissions are agreed upon between the seller and agent. Minexchange facilitates the connection and agreement process but does not dictate your specific commission rates." },
              { q: "Who can become an agent?", a: "We accept applications from experienced mining brokers, corporate advisors, and boutique investment firms with a proven track record." },
              { q: "How do NDAs and confidentiality work?", a: "Our platform has a built-in digital NDA system. You can control who sees sensitive data and require NDAs before granting access to data rooms." },
              { q: "How do I list projects for clients?", a: "Once approved, you'll have an 'Agent Dashboard' where you can create and manage listings for multiple clients efficiently." },
              { q: "What happens after I apply?", a: "Our team reviews your application to ensure you meet our professional standards. We typically respond within 48 hours." },
              { q: "Can I feature listings?", a: "Yes, agents have access to premium listing features to boost visibility for their clients' projects." },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-slate-200 rounded-lg px-6 bg-white">
                <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. Final CTA Band */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Start your agent application today</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-12 px-8"
            >
              Apply now
            </Button>
            <Link to="/agents">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
                Explore Agents
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-12 px-8 text-slate-400 hover:text-white hover:bg-slate-800">
                List an asset
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
