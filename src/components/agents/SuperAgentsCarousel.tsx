
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AgentCard } from "./AgentCard"
import { Agent } from "@/data/mockAgents"

interface SuperAgentsCarouselProps {
  agents: Agent[]
  onEnquire: (agent: Agent) => void
  onViewProfile: (agent: Agent) => void
}

export function SuperAgentsCarousel({ agents, onEnquire, onViewProfile }: SuperAgentsCarouselProps) {
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-2xl font-bold text-slate-900">Super Agents</h2>
        <div className="hidden md:flex gap-2">
           {/* Custom controls could go here if not using default carousel arrows */}
        </div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {agents.map((agent) => (
            <CarouselItem key={agent.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="h-full py-2">
                 <AgentCard 
                   agent={agent} 
                   onEnquire={onEnquire} 
                   onViewProfile={onViewProfile} 
                   className="h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-brand-orange/20 ring-1 ring-brand-orange/5"
                 />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4" />
        <CarouselNext className="hidden md:flex -right-4" />
      </Carousel>
    </div>
  )
}
