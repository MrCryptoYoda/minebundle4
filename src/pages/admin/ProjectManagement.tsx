
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_PROJECTS, AdminProject } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function ProjectManagement() {
  const { toast } = useToast()
  // Filter out pending/rejected for the main list if desired, but spec says "All Projects"
  // Usually "Project Management" implies the live/historical database.
  const projects = MOCK_ADMIN_PROJECTS

  const columns = [
    { header: "Project Name", accessorKey: "name" as keyof AdminProject, cell: (p: AdminProject) => <span className="font-medium">{p.name}</span> },
    { header: "Listed By", accessorKey: "listedBy" as keyof AdminProject },
    { header: "Location", accessorKey: "location" as keyof AdminProject },
    { header: "Commodity", accessorKey: "commodity" as keyof AdminProject },
    { header: "Intention", accessorKey: "intention" as keyof AdminProject },
    { header: "Date Listed", accessorKey: "dateListed" as keyof AdminProject },
    { header: "Status", accessorKey: "status" as keyof AdminProject, cell: (p: AdminProject) => <StatusBadge status={p.status} /> },
    { 
      header: "Agreement", 
      accessorKey: "agreementStatus" as keyof AdminProject,
      cell: (p: AdminProject) => <StatusBadge status={p.agreementStatus} className="text-xs" />
    },
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
            <DropdownMenuItem onClick={() => window.open(`/listing/${p.id}`, '_blank')}>
              <Eye className="mr-2 h-4 w-4" /> View Listing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" /> View Agreement
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
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600">Master list of all projects on the platform.</p>
        </div>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search projects..."
        filterOptions={[
          { label: "Status", key: "status", options: ["Live", "Draft", "Sold", "Rejected", "Pending Approval"] },
          { label: "Commodity", key: "commodity", options: ["Gold", "Copper", "Lithium", "REE"] }
        ]}
        onExport={() => toast({ title: "Export Started", description: "CSV download will begin shortly." })}
      />
    </div>
  )
}
