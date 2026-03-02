
import * as React from "react"
import { Shield, Users, FileText, Lock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function NdaHelperPanel() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-brand-orange" /> How NDA works on Minexchange
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { step: 1, text: "Users request access to a private listing." },
          { step: 2, text: "They digitally sign this NDA agreement." },
          { step: 3, text: "Access is granted to the data room." }
        ].map((item) => (
          <div key={item.step} className="flex gap-3 items-start">
            <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
              {item.step}
            </div>
            <p className="text-sm text-slate-600 leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-sm">
        <span className="text-slate-500 font-medium">Related links:</span>
        <Link to="/legal/facilitation-agreement" className="text-brand-orange hover:underline">Facilitation Agreement</Link>
      </div>
    </div>
  )
}

export function FacilitationHelperPanel() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 flex items-start gap-4">
      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
        <FileText className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold text-slate-900 mb-2">Who this applies to</h3>
        <p className="text-sm text-slate-600 mb-2">
          This agreement applies to <strong>Users engaging facilitation services</strong>, including Sellers, Buyers, and Agents where applicable.
        </p>
      </div>
    </div>
  )
}

export function AgentFacilitationHelperPanel() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">For Agents & Brokers</h3>
            <p className="text-sm text-slate-600">
              This agreement governs the relationship for agents acting on behalf of clients.
            </p>
          </div>
        </div>
        <Link to="/agents/become" className="text-sm font-medium text-brand-orange hover:underline flex items-center whitespace-nowrap">
          Become an Agent <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
