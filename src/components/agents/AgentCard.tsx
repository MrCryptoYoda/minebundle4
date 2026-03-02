
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2, MapPin, Briefcase } from "lucide-react"
import { Agent } from "@/data/mockAgents"
import { cn } from "@/lib/utils"

interface AgentCardProps {
  agent: Agent
  onEnquire: (agent: Agent) => void
  onViewProfile: (agent: Agent) => void
  className?: string
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onEnquire, onViewProfile, className }) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all duration-200 border-slate-800 bg-[#1C1C24] flex flex-col h-full", className)}>
      <CardContent className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border border-slate-700">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="bg-slate-800 text-slate-300">{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-white flex items-center gap-1.5">
                {agent.name}
                {agent.verified && <CheckCircle2 className="h-4 w-4 text-brand-orange" />}
              </h3>
              <p className="text-sm text-slate-400 font-medium">{agent.company}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {agent.location}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Regions Served</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.regions.slice(0, 3).map(r => (
                <Badge key={r} variant="secondary" className="bg-slate-800 text-slate-300 font-normal text-xs">
                  {r}
                </Badge>
              ))}
              {agent.regions.length > 3 && (
                <Badge variant="secondary" className="bg-slate-800 text-slate-400 font-normal text-xs">
                  +{agent.regions.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialties</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.commodities.slice(0, 3).map(c => (
                <Badge key={c} variant="outline" className="border-slate-700 text-slate-300 font-normal text-xs">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          
          {agent.stats && (
             <div className="pt-3 border-t border-slate-800 flex gap-4 text-xs text-slate-400">
                <span><strong className="text-slate-300">{agent.stats.liveListings}</strong> Live Listings</span>
                <span className="text-slate-600">|</span>
                <span><strong className="text-slate-300">{agent.stats.soldProjects}</strong> Sold</span>
             </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-[#13131A] border-t border-slate-800 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full bg-[#1C1C24] border-slate-700 text-white hover:bg-white/5" onClick={() => onViewProfile(agent)}>
          View Profile
        </Button>
        <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => onEnquire(agent)}>
          Enquire
        </Button>
      </CardFooter>
    </Card>
  )
}
