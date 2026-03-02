import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Scale, Bell } from "lucide-react"
import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Part 1: MXE Arbitration Center Hero Card (Homepage Only) */}
        {isHomePage && (
          <div className="relative w-full rounded-[40px] overflow-hidden mb-20 group">
            {/* Background Image with Glassmorphic Overlay */}
            <div className="absolute inset-0 bg-slate-900">
              <img 
                src="https://picsum.photos/seed/mining/1920/1080" 
                alt="Mining Landscape" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 gap-10">
              
              {/* Left Side: Text */}
              <div className="max-w-2xl space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                  <Scale className="h-4 w-4" />
                  <span>Official Dispute Resolution</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                  MXE Arbitration Center
                </h2>
                <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                  Fair, transparent, and efficient dispute resolution for the global mining industry. 
                  Secure your transactions with confidence.
                </p>
              </div>

              {/* Right Side: Glass Card Action */}
              <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white/5 rounded-2xl p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold text-lg">Coming Soon to MXE...</h3>
                    <p className="text-white/60 text-sm">Subscribe to be notified.</p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Input 
                        placeholder="Enter your email address" 
                        className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-brand-orange focus-visible:border-brand-orange"
                      />
                    </div>
                    <Button className="h-12 w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl font-semibold">
                      <Bell className="mr-2 h-4 w-4" />
                      Notify Me
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Part 2: Clean Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="block">
              <Logo variant="dark" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The world's leading mining marketplace. Connecting buyers, sellers, and agents in a secure, transparent ecosystem.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Marketplace */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Marketplace</h4>
              <ul className="space-y-4">
                <FooterLink to="/search">Browse Projects</FooterLink>
                <FooterLink to="/marketplace">Find Services</FooterLink>
                <FooterLink to="/agents">Verified Agents</FooterLink>
                <FooterLink to="/list">List Asset</FooterLink>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
              <ul className="space-y-4">
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
                <FooterLink to="/partners/nora">Partners</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-4">
                <FooterLink to="/insights">Market Insights</FooterLink>
                <FooterLink to="/how-to-guides">How-to Guides</FooterLink>
                <FooterLink to="/mxe-tv">MXE TV</FooterLink>
                <FooterLink to="/pricing">Pricing</FooterLink>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-4">
                <FooterLink to="/legal/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/legal/terms">Terms of Use</FooterLink>
                <FooterLink to="/legal/nda">Standard NDA</FooterLink>
                <FooterLink to="/legal/facilitation-agreement">Facilitation Agreement</FooterLink>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} The Minexchange. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <Link to="/legal/cookies" className="hover:text-white transition-colors">Cookies Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-slate-400 hover:text-brand-orange transition-colors text-sm font-medium">
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-brand-orange hover:text-white transition-all"
    >
      {icon}
    </a>
  )
}

