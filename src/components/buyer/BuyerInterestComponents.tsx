
import * as React from "react"
import { Link } from "react-router-dom"
import { CheckCircle2, ShieldCheck, ArrowRight, Search, Users, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function SuccessStateCard() {
  return (
    <Card className="border-green-200 bg-green-50/50 shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Thanks — we've received your criteria.</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Our team and agent network will review your requirements. We'll contact you if we find opportunities that match your investment profile.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <Link to="/search">
            <Button className="w-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-brand-orange hover:border-brand-orange/30 shadow-sm">
              <Search className="mr-2 h-4 w-4" /> Search projects
            </Button>
          </Link>
          <Link to="/agents">
            <Button className="w-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-brand-orange hover:border-brand-orange/30 shadow-sm">
              <Users className="mr-2 h-4 w-4" /> Explore agents
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function WhatHappensNext() {
  const steps = [
    { title: "We review your criteria", desc: "Our team analyzes your investment focus." },
    { title: "We match opportunities", desc: "We identify listings that fit your profile." },
    { title: "We connect you", desc: "We facilitate introductions to sellers or agents." }
  ]

  return (
    <div className="py-8">
      <h3 className="text-lg font-bold text-slate-900 mb-6">What happens next?</h3>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TrustBlock() {
  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
      <div className="flex items-start gap-3 mb-4">
        <ShieldCheck className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
        <h3 className="font-semibold text-slate-900">Confidential Handling</h3>
      </div>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Your investment criteria is handled confidentially. We use NDA gating and controlled access to protect sensitive information on the platform.
      </p>
      <div className="flex flex-col gap-2 text-xs font-medium">
        <Link to="/legal/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link>
        <Link to="/legal/nda" className="text-brand-orange hover:underline">NDA Agreement</Link>
      </div>
    </div>
  )
}

interface ConsentRowProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function ConsentRow({ checked, onCheckedChange }: ConsentRowProps) {
  return (
    <div className="flex items-start space-x-3 pt-2">
      <Checkbox 
        id="consent" 
        checked={checked}
        onCheckedChange={(c) => onCheckedChange(c as boolean)}
        className="mt-1"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="consent"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
        >
          I consent to Minexchange contacting me regarding relevant opportunities.
        </label>
        <p className="text-xs text-slate-500">
          We respect your privacy. Read our <Link to="/legal/privacy" className="underline hover:text-brand-orange">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
