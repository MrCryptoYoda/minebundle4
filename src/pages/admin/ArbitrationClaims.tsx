
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_ARBITRATION, AdminArbitration } from "@/data/mockAdminData"

export default function ArbitrationClaims() {
  const claims = MOCK_ADMIN_ARBITRATION

  const columns = [
    { header: "Claim Name", accessorKey: "claimName" as keyof AdminArbitration, cell: (c: AdminArbitration) => <span className="font-medium">{c.claimName}</span> },
    { header: "Type", accessorKey: "type" as keyof AdminArbitration },
    { header: "Sector", accessorKey: "sector" as keyof AdminArbitration },
    { header: "Intention", accessorKey: "intention" as keyof AdminArbitration },
    { header: "Date Listed", accessorKey: "dateListed" as keyof AdminArbitration },
    { header: "Status", accessorKey: "status" as keyof AdminArbitration, cell: (c: AdminArbitration) => <StatusBadge status={c.status} /> },
    {
      header: "Actions",
      cell: (c: AdminArbitration) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Claim
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
          <h1 className="text-2xl font-bold text-slate-900">Arbitration Claims</h1>
          <p className="text-slate-600">Manage arbitration listings.</p>
        </div>
      </div>

      <DataTable
        data={claims}
        columns={columns}
        searchKey="claimName"
        searchPlaceholder="Search claims..."
        filterOptions={[
          { label: "Status", key: "status", options: ["Live", "Pending Approval", "Rejected"] },
          { label: "Type", key: "type", options: ["Contract", "Treaty", "Commercial"] }
        ]}
      />
    </div>
  )
}
