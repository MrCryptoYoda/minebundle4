
import * as React from "react"
import { Link } from "react-router-dom"
import { Search, FileText, Calendar, Download, Eye, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import { MOCK_GUIDES, Guide } from "@/data/mockContent"
import { FilterChips } from "@/components/content/FilterChips"
import { DownloadModal } from "@/components/content/DownloadModal"

export default function HowToGuidesPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedGuide, setSelectedGuide] = React.useState<Guide | null>(null)
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const categories = Array.from(new Set(MOCK_GUIDES.map(g => g.category)))

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filteredGuides = React.useMemo(() => {
    return MOCK_GUIDES.filter(guide => {
      const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            guide.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(guide.category)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])

  const handleDownload = (guide: Guide) => {
    setSelectedGuide(guide)
    setIsDownloadOpen(true)
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* 1. Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              How-To Guides
            </h1>
            <p className="text-lg text-slate-600">
              Practical guides for buyers, sellers, and agents navigating mining asset transactions.
            </p>
          </div>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search guides..." 
              className="pl-10 h-12 text-base bg-white shadow-sm border-slate-300 focus-visible:ring-brand-orange"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 2. Filters */}
        <div className="mb-10">
          <FilterChips 
            categories={categories} 
            selected={selectedCategories} 
            onToggle={handleCategoryToggle} 
            onClear={() => setSelectedCategories([])} 
          />
        </div>

        {/* 3. Guide Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
            ))}
          </div>
        ) : filteredGuides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map(guide => (
              <Card key={guide.id} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-200 border-slate-200 group">
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={guide.thumbnail} 
                    alt={guide.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white shadow-sm backdrop-blur-sm">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> {guide.fileType}
                      {guide.pages && ` • ${guide.pages} pages`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {new Date(guide.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <Button className="flex-1 bg-brand-orange hover:bg-brand-orange/90" onClick={() => handleDownload(guide)}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white" title="Preview">
                    <Eye className="h-4 w-4 text-slate-600" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-100">
            <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No guides match your filters</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or clearing filters.</p>
            <Button variant="outline" onClick={() => {setSearchQuery(""); setSelectedCategories([])}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* 4. CTA Band */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 text-center mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Ready to explore opportunities?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-lg h-12 px-8">
                Search projects
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
                List an asset
              </Button>
            </Link>
            <Link to="/agents">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-12 px-8 text-slate-400 hover:text-white hover:bg-slate-800">
                Explore Agents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DownloadModal open={isDownloadOpen} onOpenChange={setIsDownloadOpen} guide={selectedGuide} />
    </div>
  )
}
