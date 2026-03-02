
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_ARBITRATION, AdminArbitration } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function RejectedArbitration() {
  const { toast } = useToast()
  // Mock rejected items
  const [claims, setClaims] = React.useState([
    { ...MOCK_ADMIN_ARBITRATION[0], status: 'Rejected' as const, id: 'r1', claimName: 'Rejected Claim Example' }
  ])

  const handleReopen = (claim: AdminArbitration) => {
    setClaims(claims.filter(c => c.id !== claim.id))
    toast({ title: "Claim Re-opened", description: "Moved back to pending approval." })
  }

  const columns = [
    { header: "Claim Name", accessorKey: "claimName" as keyof AdminArbitration, cell: (c: AdminArbitration) => <span className="font-medium">{c.claimName}</span> },
    { header: "Type", accessorKey: "type" as keyof AdminArbitration },
    { header: "Date Rejected", accessorKey: "dateListed" as keyof AdminArbitration },
    { header: "Reason", cell: () => <span className="text-sm text-slate-500 italic">Invalid documentation</span> },
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
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReopen(c)}>
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
          <h1 className="text-2xl font-bold text-slate-900">Rejected Arbitration</h1>
          <p className="text-slate-600">Audit rejected claims.</p>
        </div>
      </div>

      <DataTable
        data={claims}
        columns={columns}
        searchKey="claimName"
        searchPlaceholder="Search rejected..."
      />
    </div>
  )
}
