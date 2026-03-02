
import * as React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { ShieldCheck, Search, Sparkles, ArrowRight } from "lucide-react"
import { Logo } from "@/components/common/Logo"

export default function AuthLayout() {
  const location = useLocation();
  const isSignUp = location.pathname.includes("sign-up");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6] p-4 md:p-6 lg:p-8">
      {/* Main Card Container */}
      <div className="w-full max-w-[1400px] bg-white rounded-[40px] overflow-hidden flex min-h-[800px] shadow-2xl shadow-slate-200/50">
        
        {/* Left Side - Form Container */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12 relative">
          <div className="max-w-[440px] mx-auto w-full flex flex-col items-center">
            {/* Logo */}
            <Link to="/" className="inline-block mb-16 group">
              <Logo className="h-10 w-auto" />
            </Link>

            <div className="w-full text-left">
              <Outlet />
            </div>

            {/* Footer Links */}
            <div className="mt-16 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-8">
              <div className="flex gap-6">
                <Link to="/legal/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
                <Link to="/legal/terms" className="hover:text-brand-orange transition-colors">Terms of Service</Link>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Secure Encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visuals */}
        <div className="hidden lg:flex lg:w-1/2 p-3">
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-900">
            {/* Background Image */}
            <img 
              src="https://picsum.photos/seed/open_pit_mine_golden_hour/1200/1600" 
              alt="Mining Operations" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
              <div className="flex justify-end">
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Market Data
                </div>
              </div>

              <div className="space-y-8">
                <div className="max-w-lg">
                  <h2 className="text-4xl md:text-5xl font-light leading-[1.1] mb-6">
                    {isSignUp ? "Join the world's leading" : "Welcome back to the"} <br />
                    <span className="text-brand-orange">mining marketplace</span>
                  </h2>
                  <p className="text-lg text-white/80 font-light leading-relaxed">
                    Connect with verified buyers, sellers, and agents in a secure, transparent global ecosystem.
                  </p>
                </div>

                {/* Mock AI Search Interface */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium text-white/90 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-brand-orange" />
                    AI-Powered Discovery
                  </div>
                  <div className="bg-white rounded-xl p-1.5 flex items-center gap-3 pr-2">
                    <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 shrink-0 ml-1">
                      <Search className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-slate-800 text-sm font-medium truncate">
                      "Find copper projects in Chile with &gt;10yr mine life..."
                    </div>
                    <div className="h-10 w-10 bg-brand-orange rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
