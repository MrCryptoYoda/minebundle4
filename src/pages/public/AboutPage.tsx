
import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  PillarCards, 
  TrustPanel, 
  RoleSwitcher, 
  DifferentiatorsGrid, 
  PlatformPillarsGrid 
} from "@/components/about/AboutComponents"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 text-brand-orange border-brand-orange/30 px-4 py-1.5 text-sm font-medium rounded-full">
            About Minexchange
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Built to modernize mining asset transactions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            A global marketplace connecting buyers, sellers, and agents with controlled access to project information.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-14 px-8">
                Explore opportunities
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent text-white border-slate-700 hover:bg-slate-800 hover:text-white">
                List an asset
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/agents" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Looking for an agent? Explore Agents →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. The Problem */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              The mining transaction market is fragmented and opaque.
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              For decades, buying and selling mining projects has relied on scattered networks, email chains, and static PDFs. This inefficiency slows down deals and limits visibility for great assets.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Key Challenges</h3>
            <ul className="space-y-4">
              {[
                "Deals are fragmented across private networks",
                "Data is difficult to access and compare",
                "Confidentiality needs slow down evaluation",
                "Sellers struggle to reach qualified global buyers",
                "Buyers struggle to validate opportunities efficiently"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. The Solution */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              A structured marketplace for transactable mining assets
            </h2>
            <p className="text-lg text-slate-600">
              We provide the infrastructure for secure, efficient, and transparent deal-making.
            </p>
          </div>
          <PillarCards />
        </div>
      </section>

      {/* 4. Trust & Confidentiality */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <TrustPanel />
      </section>

      {/* 5. Who It's For */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Built for the entire ecosystem</h2>
          <RoleSwitcher />
        </div>
      </section>

      {/* 6. Differentiators */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Minexchange?</h2>
            <p className="text-lg text-slate-600">The modern standard for mining asset transactions.</p>
          </div>
          <DifferentiatorsGrid />
        </div>
      </section>

      {/* 7. Platform Pillars */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore our ecosystem</h2>
        </div>
        <PlatformPillarsGrid />
      </section>

      {/* 8. Final CTA */}
      <section className="bg-slate-900 py-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Start exploring today</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-12 px-8">
                Explore opportunities
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
                List an asset
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-12 px-8 text-slate-400 hover:text-white hover:bg-slate-800">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
