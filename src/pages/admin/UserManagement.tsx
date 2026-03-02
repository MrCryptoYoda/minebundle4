
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { StatusBadge } from "@/components/admin/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Ban, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_ADMIN_USERS, AdminUser } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function UserManagement() {
  const { toast } = useToast()
  const [users, setUsers] = React.useState(MOCK_ADMIN_USERS)

  const handleStatusChange = (userId: string, newStatus: 'Active' | 'Disabled') => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u))
    toast({
      title: "User Updated",
      description: `User status changed to ${newStatus}`,
    })
  }

  const columns = [
    { header: "Name", accessorKey: "name" as keyof AdminUser, cell: (u: AdminUser) => <span className="font-medium">{u.name}</span> },
    { header: "Email", accessorKey: "email" as keyof AdminUser },
    { header: "Role", accessorKey: "role" as keyof AdminUser },
    { header: "Date Joined", accessorKey: "dateJoined" as keyof AdminUser },
    { header: "Status", accessorKey: "status" as keyof AdminUser, cell: (u: AdminUser) => <StatusBadge status={u.status} /> },
    {
      header: "Actions",
      cell: (u: AdminUser) => (
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
            {u.status === 'Active' ? (
              <DropdownMenuItem onClick={() => handleStatusChange(u.id, 'Disabled')} className="text-red-600">
                <Ban className="mr-2 h-4 w-4" /> Disable Account
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleStatusChange(u.id, 'Active')} className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" /> Enable Account
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-600">Manage platform users and access.</p>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search users..."
        filterOptions={[
          { label: "Role", key: "role", options: ["Individual", "Agent", "Service Provider"] },
          { label: "Status", key: "status", options: ["Active", "Disabled"] }
        ]}
        onExport={() => toast({ title: "Export Started", description: "CSV download will begin shortly." })}
      />
    </div>
  )
}
