
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_PROJECTS, AdminProject } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function RejectedProjects() {
  const { toast } = useToast()
  const [projects, setProjects] = React.useState(MOCK_ADMIN_PROJECTS.filter(p => p.status === 'Rejected'))

  const handleReopen = (project: AdminProject) => {
    setProjects(projects.filter(p => p.id !== project.id))
    toast({ title: "Project Re-opened", description: "Moved back to pending approval." })
  }

  const columns = [
    { header: "Project Name", accessorKey: "name" as keyof AdminProject, cell: (p: AdminProject) => <span className="font-medium">{p.name}</span> },
    { header: "Location", accessorKey: "location" as keyof AdminProject },
    { header: "Commodity", accessorKey: "commodity" as keyof AdminProject },
    { header: "Date Rejected", accessorKey: "dateListed" as keyof AdminProject },
    { header: "Reason", cell: () => <span className="text-sm text-slate-500 italic">Incomplete documentation</span> },
    {
      header: "Actions",
      cell: (p: AdminProject) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReopen(p)}>
              <RefreshCw className="mr-2 h-4 w-4" /> Re-open
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rejected Projects</h1>
          <p className="text-slate-600">Audit and manage rejected listings.</p>
        </div>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search rejected..."
      />
    </div>
  )
}
