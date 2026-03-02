import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  CheckCircle, 
  Search, 
  User, 
  Bell, 
  Settings,
  LogOut
} from "lucide-react"
import { useDemo } from "@/context/DemoContext"

interface SidebarLinkProps {
  to: string
  icon: React.ElementType
  label: string
  active: boolean
}

const SidebarLink = ({ to, icon: Icon, label, active }: SidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 group relative mx-2",
      active 
        ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" 
        : "text-slate-400 hover:bg-white/10 hover:text-white"
    )}
  >
    <Icon className={cn("h-5 w-5 transition-colors", active ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
    <span>{label}</span>
  </Link>
)

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userRole, logout } = useDemo()
  const pathname = location.pathname

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-72 bg-[#1C1C24] h-[calc(100vh-4rem)] sticky top-16 hidden md:flex flex-col border-r border-slate-800 shadow-none">
      <div className="flex-1 px-2 py-6 space-y-8 overflow-y-auto scrollbar-hide">
        
        {/* Main Nav */}
        <div className="space-y-1">
          <SidebarLink 
            to="/app/dashboard" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={pathname === '/app/dashboard'} 
          />
          <SidebarLink 
            to="/app/messages" 
            icon={MessageSquare} 
            label="Messages" 
            active={pathname.startsWith('/app/messages')} 
          />
          <SidebarLink 
            to="/app/listings" 
            icon={FileText} 
            label="My Listings" 
            active={pathname.startsWith('/app/listings')} 
          />
          <SidebarLink 
            to="/app/my-projects" 
            icon={Briefcase} 
            label="Saved Projects" 
            active={pathname.startsWith('/app/my-projects')} 
          />
          <SidebarLink 
            to="/app/sold-projects" 
            icon={CheckCircle} 
            label="Sold Projects" 
            active={pathname.startsWith('/app/sold-projects')} 
          />
          <SidebarLink 
            to="/app/saved-searches" 
            icon={Search} 
            label="Saved Searches" 
            active={pathname.startsWith('/app/saved-searches')} 
          />
        </div>

        {/* Account */}
        <div className="space-y-1">
          <h4 className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Account</h4>
          <SidebarLink 
            to="/app/account"  
            icon={User} 
            label="Profile & Settings" 
            active={pathname.startsWith('/app/account')} 
          />
          <SidebarLink 
            to="/app/notifications" 
            icon={Bell} 
            label="Notifications" 
            active={pathname.startsWith('/app/notifications')} 
          />
          
          {userRole === 'agent' && (
            <SidebarLink 
              to="/app/agent-profile" 
              icon={Briefcase} 
              label="Agent Profile" 
              active={pathname.startsWith('/app/agent-profile')} 
            />
          )}
        </div>
      </div>

      {/* Logout / Bottom Action */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-full text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-colors justify-start mx-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}
