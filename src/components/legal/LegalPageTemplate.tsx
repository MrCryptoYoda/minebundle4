
import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Download, AlertCircle, ChevronRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface LegalPageTemplateProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
  helperPanel?: React.ReactNode
  isLoading?: boolean
  error?: string
  onRetry?: () => void
}

export function LegalPageTemplate({
  title,
  lastUpdated,
  children,
  helperPanel,
  isLoading,
  error,
  onRetry
}: LegalPageTemplateProps) {
  const [headings, setHeadings] = React.useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = React.useState<string>("")

  const contentRef = React.useRef<HTMLDivElement>(null)

  // Extract headings for TOC
  React.useEffect(() => {
    if (isLoading || error || !contentRef.current) return

    const elements = Array.from(contentRef.current.querySelectorAll("h2, h3")) as HTMLElement[]
    const headingData = elements.map((elem, index) => ({
      id: elem.id || `heading-${index}`,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }))
    
    // Ensure IDs exist on elements if missing
    elements.forEach((elem, index) => {
      if (!elem.id) {
        elem.id = `heading-${index}`
      }
    })

    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -66%" }
    )

    elements.forEach((elem) => observer.observe(elem))

    return () => observer.disconnect()
  }, [children, isLoading, error])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", `#${id}`)
      setActiveId(id)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Couldn't load document</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button onClick={onRetry}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h1>
          {lastUpdated && (
            <p className="text-slate-400 text-sm">Last updated: {lastUpdated}</p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {helperPanel && (
            <div className="mb-10">
              {helperPanel}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-8 max-w-3xl">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-8 w-1/2" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ) : (
            <article ref={contentRef} className="prose prose-slate max-w-3xl prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
              {children}
            </article>
          )}
        </main>

        {/* Sidebar TOC (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">On this page</h3>
            <nav className="space-y-1 border-l border-slate-200">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToSection(heading.id)}
                  className={cn(
                    "block text-left text-sm py-1.5 pl-4 border-l-2 -ml-[1px] transition-colors w-full truncate",
                    activeId === heading.id
                      ? "border-brand-orange text-brand-orange font-medium"
                      : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                  )}
                  style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "1rem" }}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <Button variant="outline" className="w-full justify-start text-slate-600" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile TOC Drawer */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full h-12 w-12 shadow-lg bg-slate-900 text-white hover:bg-slate-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
              <div className="h-full overflow-y-auto pt-4">
                <h3 className="font-bold text-slate-900 mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToSection(heading.id)}
                      className={cn(
                        "block text-left text-sm py-2 w-full truncate",
                        activeId === heading.id ? "text-brand-orange font-medium" : "text-slate-600"
                      )}
                      style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>
  )
}
