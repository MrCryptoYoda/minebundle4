
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { Badge } from "@/components/ui/badge"
import { MOCK_ADMIN_ENQUIRIES, AdminEnquiry } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function ProjectEnquiries() {
  const { toast } = useToast()

  const columns = [
    { header: "User", accessorKey: "userName" as keyof AdminEnquiry, cell: (e: AdminEnquiry) => <span className="font-medium">{e.userName}</span> },
    { header: "Project", accessorKey: "projectName" as keyof AdminEnquiry },
    { header: "Owner", accessorKey: "projectOwner" as keyof AdminEnquiry },
    { 
      header: "Intent", 
      cell: (e: AdminEnquiry) => (
        <div className="flex gap-1">
          {e.terms && <Badge variant="outline" className="text-[10px]">Terms</Badge>}
          {e.price && <Badge variant="outline" className="text-[10px]">Price</Badge>}
          {e.moreInfo && <Badge variant="outline" className="text-[10px]">Info</Badge>}
        </div>
      )
    },
    { header: "Message", accessorKey: "description" as keyof AdminEnquiry, cell: (e: AdminEnquiry) => <span className="text-sm text-slate-500 truncate max-w-[200px] block">{e.description}</span> },
    { header: "Date", accessorKey: "enquiredAt" as keyof AdminEnquiry },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Enquiries</h1>
          <p className="text-slate-600">Operational view of all enquiries sent through the platform.</p>
        </div>
      </div>

      <DataTable
        data={MOCK_ADMIN_ENQUIRIES}
        columns={columns}
        searchKey="projectName"
        searchPlaceholder="Search enquiries..."
        onExport={() => toast({ title: "Export Started", description: "CSV download will begin shortly." })}
      />
    </div>
  )
}
