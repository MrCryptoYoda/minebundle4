
import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Target, 
  MessageSquare, 
  Briefcase, 
  Users, 
  UserCircle, 
  CreditCard, 
  Bell, 
  LogOut,
  Lock,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { useDemo } from "@/context/DemoContext"
import { useInsights } from "@/context/InsightsContext"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarLinkProps {
  to: string
  icon: any
  label: string
  active: boolean
  locked?: boolean
  collapsed?: boolean
}

const InsightsSidebarLink = ({ to, icon: Icon, label, active, locked, collapsed }: SidebarLinkProps) => {
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={locked ? "/insights/billing" : to}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 relative group mx-auto",
                active 
                  ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" 
                  : "text-slate-400 hover:bg-white/10 hover:text-white",
                locked && "opacity-60 cursor-not-allowed"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
              {locked && <Lock className="h-3 w-3 absolute -top-1 -right-1 text-slate-500 bg-slate-900 rounded-full p-0.5 border border-slate-700" />}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label} {locked && "(Locked)"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      to={locked ? "/insights/billing" : to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 relative group mx-2",
        active 
          ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" 
          : "text-slate-400 hover:bg-white/10 hover:text-white",
        locked && "opacity-60"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
      <span className="flex-1 truncate">{label}</span>
      {locked && <Lock className="h-3 w-3 text-slate-600" />}
    </Link>
  )
}

export function InsightsSidebar({ className }: { className?: string }) {
  const location = useLocation()
  const { logout } = useDemo()
  const { plan, profileCompleteness, isSidebarCollapsed, setSidebarCollapsed } = useInsights()
  const pathname = location.pathname
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col py-6 bg-[#1C1C24] border-r border-slate-800 transition-all duration-300 ease-in-out h-screen sticky top-0 z-30",
        isSidebarCollapsed ? "w-20 items-center" : "w-72",
        className
      )}
    >
      {/* Company Block */}
      <div className={cn("mb-8 transition-all duration-300", isSidebarCollapsed ? "px-2" : "px-6")}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-brand-orange rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-white tracking-tight truncate">ACRU Mining</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest truncate">Service Provider</span>
            </div>
          )}
        </div>
        
        {/* Profile Completeness Meter */}
        {!isSidebarCollapsed && (
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Profile Strength</span>
              <span className={cn("text-[10px] font-bold", profileCompleteness === 100 ? "text-emerald-500" : "text-brand-orange")}>
                {profileCompleteness}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", profileCompleteness === 100 ? "bg-emerald-500" : "bg-brand-orange")} 
                style={{ width: `${profileCompleteness}%` }} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <div className="flex-1 space-y-1 w-full overflow-y-auto scrollbar-hide">
        <InsightsSidebarLink 
          to="/insights/dashboard" 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={pathname === '/insights/dashboard'}
          collapsed={isSidebarCollapsed} 
        />
        
        {/* Operations Section */}
        <div className={cn("mt-4 mb-2", isSidebarCollapsed ? "mx-2" : "mx-6")}>
          {!isSidebarCollapsed && <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Operations</h4>}
        </div>

        <InsightsSidebarLink 
          to="/insights/leads" 
          icon={Target} 
          label="Biz Dev Leads" 
          active={pathname.startsWith('/insights/leads')}
          collapsed={isSidebarCollapsed} 
        />
        <InsightsSidebarLink 
          to="/insights/enquiries" 
          icon={MessageSquare} 
          label="Enquiries" 
          active={pathname.startsWith('/insights/enquiries')}
          collapsed={isSidebarCollapsed} 
        />
        <InsightsSidebarLink 
          to="/insights/service-listings" 
          icon={Briefcase} 
          label="Service Listings" 
          active={pathname.startsWith('/insights/service-listings')}
          collapsed={isSidebarCollapsed} 
        />
        <InsightsSidebarLink 
          to="/insights/team" 
          icon={Users} 
          label="Approved Team" 
          active={pathname.startsWith('/insights/team')}
          collapsed={isSidebarCollapsed} 
        />
        
        {/* Locked Intelligence Section */}
        <div className={cn("my-4 border-t border-slate-800 pt-4", isSidebarCollapsed ? "mx-2" : "mx-6")}>
          {!isSidebarCollapsed && <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Intelligence</h4>}
          <InsightsSidebarLink 
            to="/insights/intelligence" 
            icon={Sparkles} 
            label="Market Intel" 
            active={pathname.startsWith('/insights/intelligence')}
            locked={plan === 'SP_FREE'}
            collapsed={isSidebarCollapsed} 
          />
        </div>
      </div>

      {/* Settings & Footer */}
      <div className="pt-4 border-t border-slate-800 w-full">
        <div className="space-y-1 mb-4">
          {!isSidebarCollapsed && <h4 className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Settings</h4>}
          <InsightsSidebarLink 
            to="/insights/profile" 
            icon={UserCircle} 
            label="Profile" 
            active={pathname.startsWith('/insights/profile')}
            collapsed={isSidebarCollapsed} 
          />
          <InsightsSidebarLink 
            to="/insights/billing" 
            icon={CreditCard} 
            label="Billing" 
            active={pathname.startsWith('/insights/billing')}
            collapsed={isSidebarCollapsed} 
          />
          <InsightsSidebarLink 
            to="/insights/notifications" 
            icon={Bell} 
            label="Notifications" 
            active={pathname.startsWith('/insights/notifications')}
            collapsed={isSidebarCollapsed} 
          />
        </div>

        <div className="px-2 pb-4">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full text-slate-400 hover:text-white hover:bg-white/10 rounded-full h-10",
              isSidebarCollapsed ? "justify-center px-0" : "justify-start px-4"
            )}
            onClick={handleLogout}
          >
            <LogOut className={cn("h-4 w-4", !isSidebarCollapsed && "mr-3")} />
            {!isSidebarCollapsed && "Log out"}
          </Button>
        </div>
        
        {/* Collapse Toggle */}
        <div className="hidden md:flex justify-end px-4 pb-4">
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-slate-500 hover:text-white hover:bg-white/10 rounded-full h-8 w-8"
             onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
           >
             <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", isSidebarCollapsed ? "" : "rotate-180")} />
           </Button>
        </div>
      </div>
    </aside>
  )
}
