
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { ActionModal } from "@/components/admin/ui/ActionModal"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, CheckCircle, XCircle, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_PROJECTS, AdminProject } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function ProjectApprovals() {
  const { toast } = useToast()
  // Filter for Pending Approval
  const [projects, setProjects] = React.useState(MOCK_ADMIN_PROJECTS.filter(p => p.status === 'Pending Approval'))
  
  const [selectedProject, setSelectedProject] = React.useState<AdminProject | null>(null)
  const [modalType, setModalType] = React.useState<'approve' | 'reject' | null>(null)

  const handleAction = (reason?: string) => {
    if (!selectedProject || !modalType) return

    const newStatus = modalType === 'approve' ? 'Live' : 'Rejected'
    
    // In a real app, API call here
    setProjects(projects.filter(p => p.id !== selectedProject.id))
    
    toast({
      title: modalType === 'approve' ? "Project Approved" : "Project Rejected",
      description: `Project ${selectedProject.name} has been ${newStatus.toLowerCase()}. ${reason ? `Reason: ${reason}` : ''}`,
      variant: modalType === 'reject' ? 'destructive' : 'default'
    })
    
    setModalType(null)
    setSelectedProject(null)
  }

  const columns = [
    { header: "Project Name", accessorKey: "name" as keyof AdminProject, cell: (p: AdminProject) => <span className="font-medium">{p.name}</span> },
    { header: "Location", accessorKey: "location" as keyof AdminProject },
    { header: "Commodity", accessorKey: "commodity" as keyof AdminProject },
    { header: "Date Requested", accessorKey: "dateListed" as keyof AdminProject },
    { 
      header: "Agreement", 
      accessorKey: "agreementStatus" as keyof AdminProject,
      cell: (p: AdminProject) => <StatusBadge status={p.agreementStatus} />
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
              <Eye className="mr-2 h-4 w-4" /> Review Submission
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSelectedProject(p); setModalType('approve'); }} className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSelectedProject(p); setModalType('reject'); }} className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" /> Reject
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
          <h1 className="text-2xl font-bold text-slate-900">Project Approvals</h1>
          <p className="text-slate-600">Review and moderate new listing requests.</p>
        </div>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search queue..."
      />

      <ActionModal 
        open={modalType === 'approve'} 
        onOpenChange={(o) => !o && setModalType(null)}
        title="Approve Project"
        description={`Are you sure you want to approve "${selectedProject?.name}"? It will go live immediately.`}
        actionLabel="Approve"
        onAction={() => handleAction()}
      />

      <ActionModal 
        open={modalType === 'reject'} 
        onOpenChange={(o) => !o && setModalType(null)}
        title="Reject Project"
        description={`Are you sure you want to reject "${selectedProject?.name}"?`}
        actionLabel="Reject"
        variant="destructive"
        requireReason
        onAction={handleAction}
      />
    </div>
  )
}
