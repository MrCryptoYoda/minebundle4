
import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  XSquare,
  Scale,
  FileSignature,
  MessageSquare,
  DollarSign,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDemo } from "@/context/DemoContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminSidebarLinkProps {
  to: string
  icon: React.ElementType
  label: string
  active?: boolean
  badge?: number
}

const AdminSidebarLink = ({ to, icon: Icon, label, active, badge }: AdminSidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
      active
        ? "bg-slate-800 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon className="h-5 w-5" />
    <span className="flex-1">{label}</span>
    {badge ? (
      <span className="bg-brand-orange text-white text-xs px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    ) : null}
  </Link>
)

export function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useDemo()
  const p = location.pathname

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <Link to="/" className="p-4 border-b border-slate-800 flex items-center gap-2 hover:bg-slate-800/50 transition-colors">
        <div className="h-8 w-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">
          M
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-wide leading-none">ADMIN</span>
          <span className="text-[10px] text-slate-500 font-medium mt-1">Back to App</span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div className="space-y-1">
          <AdminSidebarLink to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" active={p === '/admin/dashboard'} />
          <AdminSidebarLink to="/admin/users" icon={Users} label="Users" active={p === '/admin/users'} />
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Projects</p>
          <AdminSidebarLink to="/admin/projects" icon={FileText} label="All Projects" active={p === '/admin/projects'} />
          <AdminSidebarLink to="/admin/project-approvals" icon={CheckSquare} label="Approvals" active={p === '/admin/project-approvals'} badge={2} />
          <AdminSidebarLink to="/admin/rejected-projects" icon={XSquare} label="Rejected" active={p === '/admin/rejected-projects'} />
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Arbitration</p>
          <AdminSidebarLink to="/admin/arbitration-claims" icon={Scale} label="All Claims" active={p === '/admin/arbitration-claims'} />
          <AdminSidebarLink to="/admin/arbitration-approvals" icon={CheckSquare} label="Approvals" active={p === '/admin/arbitration-approvals'} />
          <AdminSidebarLink to="/admin/rejected-arbitration" icon={XSquare} label="Rejected" active={p === '/admin/rejected-arbitration'} />
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Operations</p>
          <AdminSidebarLink to="/admin/project-contacts" icon={FileSignature} label="NDA Signatures" active={p === '/admin/project-contacts'} />
          <AdminSidebarLink to="/admin/project-enquiries" icon={MessageSquare} label="Enquiries" active={p === '/admin/project-enquiries'} />
          <AdminSidebarLink to="/admin/capital-requirements" icon={DollarSign} label="Capital Reqs" active={p === '/admin/capital-requirements'} />
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Configuration</p>
          <AdminSidebarLink to="/admin/question-management" icon={HelpCircle} label="Questions" active={p === '/admin/question-management'} />
          <AdminSidebarLink to="/admin/question-sections" icon={LayersIcon} label="Sections" active={p === '/admin/question-sections'} />
          <AdminSidebarLink to="/admin/settings" icon={Settings} label="Settings" active={p === '/admin/settings'} />
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-700">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

function LayersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.44 9.8 5.55a.83.83 0 0 1 0 1.44l-9.8 5.55a.83.83 0 0 1-.83 0l-9.8-5.55a.83.83 0 0 1 0-1.44l9.8-5.55a.83.83 0 0 1 .83 0Z" />
      <path d="M2 12l10 5.55a.83.83 0 0 0 .83 0L22.83 12" />
      <path d="M2 17l10 5.55a.83.83 0 0 0 .83 0L22.83 17" />
    </svg>
  )
}
