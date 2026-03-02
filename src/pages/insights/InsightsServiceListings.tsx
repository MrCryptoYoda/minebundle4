
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, MessageSquare, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { MOCK_SERVICES } from "@/data/marketplaceData"

export default function InsightsServiceListings() {
  // In a real app, we would filter by the logged-in provider's ID
  // For demo, let's just show the first few services or a specific set
  const myServices = MOCK_SERVICES.slice(0, 3); 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Listings</h1>
          <p className="text-slate-400">Manage your services visible in the Marketplace.</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none" asChild>
          <Link to="/marketplace/provider/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {myServices.map((service) => (
          <Card key={service.id} className="bg-[#1C1C24] border-slate-800 text-slate-300 hover:border-slate-700 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg text-white">{service.title}</h3>
                  <Badge className="bg-emerald-900/30 text-emerald-500 hover:bg-emerald-900/40 border-emerald-900/50">Published</Badge>
                </div>
                <p className="text-sm text-slate-400">Category: {service.category} • Updated 2 days ago</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-slate-500" />
                    <span>{Math.floor(Math.random() * 200) + 50} Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span>{Math.floor(Math.random() * 20)} Enquiries</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {myServices.length === 0 && (
            <div className="text-center py-12 bg-[#1C1C24] rounded-xl border border-dashed border-slate-800 text-slate-500">
                No services listed yet. Create your first listing to get started.
            </div>
        )}
      </div>
    </div>
  )
}
