
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { ActionModal } from "@/components/admin/ui/ActionModal"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_ARBITRATION, AdminArbitration } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function ArbitrationApprovals() {
  const { toast } = useToast()
  const [claims, setClaims] = React.useState(MOCK_ADMIN_ARBITRATION.filter(c => c.status === 'Pending Approval'))
  
  const [selectedClaim, setSelectedClaim] = React.useState<AdminArbitration | null>(null)
  const [modalType, setModalType] = React.useState<'approve' | 'reject' | null>(null)

  const handleAction = (reason?: string) => {
    if (!selectedClaim || !modalType) return
    
    setClaims(claims.filter(c => c.id !== selectedClaim.id))
    toast({
      title: modalType === 'approve' ? "Claim Approved" : "Claim Rejected",
      description: `Claim ${selectedClaim.claimName} has been processed.`,
      variant: modalType === 'reject' ? 'destructive' : 'default'
    })
    setModalType(null)
    setSelectedClaim(null)
  }

  const columns = [
    { header: "Claim Name", accessorKey: "claimName" as keyof AdminArbitration, cell: (c: AdminArbitration) => <span className="font-medium">{c.claimName}</span> },
    { header: "Type", accessorKey: "type" as keyof AdminArbitration },
    { header: "Sector", accessorKey: "sector" as keyof AdminArbitration },
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
              <Eye className="mr-2 h-4 w-4" /> Review Claim
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSelectedClaim(c); setModalType('approve'); }} className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSelectedClaim(c); setModalType('reject'); }} className="text-red-600">
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
          <h1 className="text-2xl font-bold text-slate-900">Arbitration Approvals</h1>
          <p className="text-slate-600">Review pending arbitration claims.</p>
        </div>
      </div>

      <DataTable
        data={claims}
        columns={columns}
        searchKey="claimName"
        searchPlaceholder="Search queue..."
      />

      <ActionModal 
        open={!!modalType} 
        onOpenChange={(o) => !o && setModalType(null)}
        title={modalType === 'approve' ? "Approve Claim" : "Reject Claim"}
        description={`Are you sure you want to ${modalType} "${selectedClaim?.claimName}"?`}
        actionLabel={modalType === 'approve' ? "Approve" : "Reject"}
        variant={modalType === 'reject' ? 'destructive' : 'default'}
        requireReason={modalType === 'reject'}
        onAction={handleAction}
      />
    </div>
  )
}
