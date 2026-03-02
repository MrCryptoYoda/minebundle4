
import * as React from "react"
import { Link } from "react-router-dom"
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Globe, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  UserPlus, 
  Users, 
  Briefcase,
  TrendingUp,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 border-brand-orange/20 px-4 py-1.5 text-sm font-medium rounded-full">
            How It Works
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Market your project to a global buyer database in minutes
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Minexchange connects project owners with qualified investors and buyers through a secure, transparent, and efficient digital marketplace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/list">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-12 px-8">
                List an asset <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-white">
                Browse projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Listing Flow (Seller) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-orange font-semibold tracking-wide uppercase text-sm">
              <FileText className="h-4 w-4" /> Listing
            </div>
            <h2 className="text-3xl font-bold text-slate-900">List a mining project in 5 minutes</h2>
            <p className="text-lg text-slate-600">
              Create a listing, preview it, publish, and start receiving enquiries from verified buyers.
            </p>
            
            {/* Inline CTA Card */}
            <Card className="bg-slate-50 border-slate-200 shadow-sm mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Looking to sell your mining project?</h3>
                <p className="text-sm text-slate-500 mb-4">Get started today and reach thousands of investors.</p>
                <Link to="/list">
                  <Button className="w-full bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-brand-orange">
                    List your project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 grid gap-8">
            <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
              {[
                { 
                  icon: UserPlus, 
                  title: "Create an account", 
                  desc: "Sign up as an Individual or Agent to start listing." 
                },
                { 
                  icon: FileText, 
                  title: "Add project information", 
                  desc: "Enter key details: location, commodity, stage, and geology." 
                },
                { 
                  icon: CheckCircle2, 
                  title: "Preview & publish", 
                  desc: "Review your listing card and detail page, then go live." 
                },
                { 
                  icon: TrendingUp, 
                  title: "Receive market feedback", 
                  desc: "Track views, saves, and engagement in real-time." 
                },
                { 
                  icon: MessageSquare, 
                  title: "Communicate with buyers", 
                  desc: "Manage enquiries and NDA requests directly in the platform." 
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-brand-orange border-4 border-white shadow-sm" />
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange shrink-0">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Agent Flow */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-brand-orange border-brand-orange/30">For Agents & Brokers</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">List and sell projects on behalf of clients</h2>
            <p className="text-lg text-slate-300">
              Earn commission by connecting sellers with our global network of buyers. 
              Manage multiple client listings from a single professional dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { title: "1. Become an Agent", desc: "Apply for a verified agent account." },
              { title: "2. List Client Project", desc: "Upload project data securely." },
              { title: "3. Market & Manage", desc: "Handle enquiries and NDAs." },
              { title: "4. Close & Get Paid", desc: "Facilitate the deal and earn fees." }
            ].map((step, i) => (
              <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/agents/become">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
                Become an MXE Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Engaging an Agent (Comparison) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Engaging an agent to sell your mining project</h2>
            <p className="text-lg text-slate-600 mb-8">
              Not sure if you should list yourself or use an agent? Our marketplace supports both paths. 
              Agents bring specialized expertise and networks to help maximize your sale value.
            </p>
            <Link to="/agents">
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700">
                Find an agent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-slate-400" /> List Yourself
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Full control</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Direct communication</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> No commission fees</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-brand-orange" /> Work with Agent
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" /> Market expertise</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" /> Negotiation support</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" /> Broader network</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" /> Confidentiality mgmt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buyer Flow */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-orange font-semibold tracking-wide uppercase text-sm mb-4">
              <Search className="h-4 w-4" /> Buying
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Buying a mining project</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover opportunities, access data rooms securely, and negotiate directly with sellers.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-200 -z-10" />
            
            {[
              { title: "1. Search", desc: "Filter by commodity, location, and stage." },
              { title: "2. Open Listing", desc: "View public teasers and summaries." },
              { title: "3. Sign NDA", desc: "Unlock sensitive data room documents." },
              { title: "4. Review", desc: "Analyze technical reports and data." },
              { title: "5. Enquire", desc: "Start conversations with the seller." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-bold mx-auto mb-4 border-4 border-white shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 max-w-3xl mx-auto flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Why do I need to sign an NDA?</h3>
              <p className="text-sm text-slate-600">
                Mining projects often contain sensitive geological and financial data. 
                Our integrated NDA system protects sellers while giving qualified buyers instant access to the information they need to make decisions.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/search">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
                Search projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              How does the NDA process work?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Our platform features a built-in digital NDA system. When you request access to a project's data room, you'll be prompted to review and sign a standard Non-Disclosure Agreement electronically. Once signed, access is typically granted immediately or after a quick seller review.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              What information is visible before signing an NDA?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Public listings show high-level information such as the project name (or alias), location (region/country), commodity type, development stage, and a teaser summary. Sensitive data like specific coordinates, detailed drill logs, and financial models are locked behind the NDA.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              How do I list an asset?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Simply create an account, click "List an asset," and follow our step-by-step wizard. You'll be asked to provide project details, upload documents, and set your terms. You can save your progress as a draft at any time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              Can I list as an agent?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Yes. During sign-up or in your account settings, you can apply to become a verified Agent. This allows you to list projects on behalf of clients, manage multiple listings, and handle enquiries professionally.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              How do enquiries work?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Interested buyers can send enquiries directly through the listing page. These appear in your Messages dashboard, where you can reply, share additional files, and track the conversation history securely.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              What does it cost to list?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Basic listings are free. We offer premium listing packages that provide enhanced visibility, featured placement, and advanced analytics. Please check our Pricing page for current rates.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              How do saved searches work?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              You can save any search configuration (e.g., "Gold projects in Australia"). You'll receive email notifications when new listings matching your criteria are published.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border border-slate-200 rounded-lg px-6">
            <AccordionTrigger className="text-slate-900 font-medium hover:no-underline hover:text-brand-orange">
              How do I get notifications?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Notifications for new enquiries, NDA signatures, and saved search matches are sent to your email and appear in the Notifications tab of your dashboard.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 7. CTA Band */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/list">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-12 px-8">
                List an asset
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
                Browse projects
              </Button>
            </Link>
            <Link to="/agents/become">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-12 px-8 text-slate-400 hover:text-white hover:bg-slate-800">
                Become an agent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
