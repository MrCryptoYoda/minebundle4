
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { ActionModal } from "@/components/admin/ui/ActionModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react"
import { MOCK_CAPITAL_REQS, CapitalRequirement } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function CapitalRequirements() {
  const { toast } = useToast()
  const [reqs, setReqs] = React.useState(MOCK_CAPITAL_REQS)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  // Form State
  const [formData, setFormData] = React.useState<Partial<CapitalRequirement>>({})

  const handleSave = () => {
    const newReq = {
      id: Math.random().toString(36).substr(2, 9),
      companyName: formData.companyName || "New Company",
      agentName: formData.agentName || "Agent",
      email: formData.email || "email@test.com",
      location: formData.location || "Unknown"
    }
    setReqs([...reqs, newReq])
    setIsAddOpen(false)
    setFormData({})
    toast({ title: "Requirement Added", description: "New capital requirement saved." })
  }

  const handleDelete = () => {
    setReqs(reqs.filter(r => r.id !== deleteId))
    setDeleteId(null)
    toast({ title: "Deleted", description: "Record removed successfully." })
  }

  const columns = [
    { header: "Company", accessorKey: "companyName" as keyof CapitalRequirement, cell: (r: CapitalRequirement) => <span className="font-medium">{r.companyName}</span> },
    { header: "Agent", accessorKey: "agentName" as keyof CapitalRequirement },
    { header: "Email", accessorKey: "email" as keyof CapitalRequirement },
    { header: "Location", accessorKey: "location" as keyof CapitalRequirement },
    {
      header: "Actions",
      cell: (r: CapitalRequirement) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => { setFormData(r); setIsAddOpen(true); }}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteId(r.id)} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" /> Delete
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
          <h1 className="text-2xl font-bold text-slate-900">Capital Requirements</h1>
          <p className="text-slate-600">Manage buyer/company capital records.</p>
        </div>
        <Button onClick={() => { setFormData({}); setIsAddOpen(true); }} className="bg-brand-orange hover:bg-brand-orange/90">
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>

      <DataTable
        data={reqs}
        columns={columns}
        searchKey="companyName"
        searchPlaceholder="Search companies..."
      />

      {/* Add/Edit Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit' : 'Add'} Capital Requirement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" value={formData.companyName || ''} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agent">Agent Name</Label>
              <Input id="agent" value={formData.agentName || ''} onChange={e => setFormData({...formData, agentName: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ActionModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Record"
        description="Are you sure? This action cannot be undone."
        actionLabel="Delete"
        variant="destructive"
        onAction={handleDelete}
      />
    </div>
  )
}
