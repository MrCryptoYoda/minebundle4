
import * as React from "react"
import { Outlet } from "react-router-dom"
import { InsightsSidebar } from "./InsightsSidebar"
import { TopBar } from "./TopBar"
import { QAToggles } from "./QAToggles"
import { InsightsProvider, useInsights } from "@/context/InsightsContext"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"

function InsightsShell() {
  const { isSidebarCollapsed } = useInsights();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#13131A] font-sans text-slate-100">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <div className="flex flex-1 container mx-auto max-w-[1600px] px-0 md:px-6 gap-6 relative">
        {/* Desktop Sidebar */}
        <InsightsSidebar className="hidden md:flex" />

        {/* Mobile Sidebar Drawer */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-72 bg-[#1C1C24] border-r-slate-800 text-slate-100">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Main navigation for Insights dashboard</SheetDescription>
            <InsightsSidebar className="flex h-full w-full border-none static my-0 ml-0 rounded-none" />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)] py-6 px-4 md:px-0">
          <Outlet />
        </main>
      </div>
      
      <QAToggles />
    </div>
  )
}

export function InsightsLayout() {
  return (
    <InsightsProvider>
      <InsightsShell />
    </InsightsProvider>
  )
}
