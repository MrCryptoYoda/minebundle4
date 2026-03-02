
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Filter, SlidersHorizontal, Briefcase, CheckCircle2, Users, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useDemo } from "@/context/DemoContext"

import { MOCK_AGENTS, Agent } from "@/data/mockAgents"
import { AgentCard } from "@/components/agents/AgentCard"
import { SuperAgentsCarousel } from "@/components/agents/SuperAgentsCarousel"
import { AgentFiltersPanel } from "@/components/agents/AgentFiltersPanel"
import { EnquiryDrawer } from "@/components/agents/EnquiryDrawer"

export default function ExploreAgentsPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useDemo()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState({
    regions: [] as string[],
    commodities: [] as string[],
    verified: false
  })
  
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null)
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({ regions: [], commodities: [], verified: false })
    setSearchQuery("")
  }

  const handleEnquire = (agent: Agent) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to contact agents.",
      })
      navigate(`/auth/sign-in?redirectTo=/agents`)
      return
    }
    setSelectedAgent(agent)
    setIsEnquiryOpen(true)
  }

  const handleViewProfile = (agent: Agent) => {
    // For now, just show a toast or open a drawer preview if we don't have a full profile page
    // The spec suggests /agents/:id but we might not have built that yet.
    // Let's just toast for now or maybe reuse the enquiry drawer with a different mode?
    // Actually, let's just log it.
    console.log("View profile", agent.id)
    toast({ title: "Profile View", description: "Agent profile page coming soon." })
  }

  // Filter Logic
  const filteredAgents = React.useMemo(() => {
    return MOCK_AGENTS.filter(agent => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matches = 
          agent.name.toLowerCase().includes(q) || 
          agent.company.toLowerCase().includes(q) ||
          agent.location.toLowerCase().includes(q) ||
          agent.commodities.some(c => c.toLowerCase().includes(q))
        if (!matches) return false
      }

      // Filters
      if (filters.verified && !agent.verified) return false
      if (filters.regions.length > 0 && !filters.regions.some(r => agent.regions.includes(r))) return false
      if (filters.commodities.length > 0 && !filters.commodities.some(c => agent.commodities.includes(c))) return false

      return true
    })
  }, [searchQuery, filters])

  const featuredAgents = MOCK_AGENTS.filter(a => a.featured)

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Explore Agents
            </h1>
            <p className="text-lg text-slate-600">
              Connect with trusted agents to list, market, and transact mining assets.
              Find specialists in your region and commodity.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search by agent name, region, commodity, or company..." 
                className="pl-10 h-12 text-base bg-white shadow-sm border-slate-300 focus-visible:ring-brand-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filters Trigger */}
            <div className="md:hidden w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full h-12 border-slate-300">
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <AgentFiltersPanel 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearAll={handleClearFilters} 
                    className="mt-6"
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Secondary CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/agents/become">
                <Button variant="ghost" className="text-slate-600 hover:text-brand-orange">
                  Become an agent
                </Button>
              </Link>
              <Link to="/list">
                <Button variant="outline" className="border-slate-300">
                  List an asset
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 2. Super Agents Carousel */}
        {!isLoading && searchQuery === "" && filters.regions.length === 0 && (
          <section className="mb-16">
            <SuperAgentsCarousel 
              agents={featuredAgents} 
              onEnquire={handleEnquire} 
              onViewProfile={handleViewProfile} 
            />
          </section>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* 3. Filters Panel (Desktop) */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24">
            <AgentFiltersPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearAll={handleClearFilters} 
            />
          </aside>

          {/* 4. Agent Directory */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {isLoading ? "Loading agents..." : `${filteredAgents.length} Agents Found`}
              </h2>
              {/* Sort dropdown could go here */}
            </div>

            {/* Active Filters Chips */}
            {(filters.verified || filters.regions.length > 0 || filters.commodities.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.verified && (
                  <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 cursor-pointer" onClick={() => handleFilterChange('verified', false)}>
                    Verified Only X
                  </Badge>
                )}
                {filters.regions.map(r => (
                  <Badge key={r} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer" onClick={() => handleFilterChange('regions', filters.regions.filter(x => x !== r))}>
                    {r} X
                  </Badge>
                ))}
                {filters.commodities.map(c => (
                  <Badge key={c} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer" onClick={() => handleFilterChange('commodities', filters.commodities.filter(x => x !== c))}>
                    {c} X
                  </Badge>
                ))}
                <Button variant="link" size="sm" onClick={handleClearFilters} className="text-slate-500 h-auto p-0">
                  Clear all
                </Button>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                ))}
              </div>
            ) : filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map(agent => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onEnquire={handleEnquire} 
                    onViewProfile={handleViewProfile} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No agents match your filters</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or removing some filters.</p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Trust & Process Block */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">How engaging an agent works</h2>
          <div className="grid md:grid-cols-4 gap-8 text-left">
            {[
              { title: "1. Choose", desc: "Browse profiles and find an agent with the right expertise." },
              { title: "2. Connect", desc: "Send an enquiry outlining your project or investment needs." },
              { title: "3. Agree", desc: "Sign a standard facilitation agreement to formalize terms." },
              { title: "4. Transact", desc: "Agent manages the deal process through to completion." }
            ].map((step, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-brand-orange/30">
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Band */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Are you a mining agent?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join our network to access a global database of projects and investors. 
            List on behalf of clients and manage your deal flow in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/agents/become">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
                Become an Agent
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white px-8">
                List with an Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Drawer */}
      <EnquiryDrawer 
        open={isEnquiryOpen} 
        onOpenChange={setIsEnquiryOpen} 
        agent={selectedAgent} 
      />
    </div>
  )
}
