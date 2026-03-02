
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_SECTIONS, AdminSection } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function QuestionSections() {
  const { toast } = useToast()
  const [sections, setSections] = React.useState(MOCK_SECTIONS)

  const handleDelete = (id: string) => {
    setSections(sections.filter(s => s.id !== id))
    toast({ title: "Section Deleted", description: "Section removed successfully." })
  }

  const columns = [
    { header: "Section Name", accessorKey: "name" as keyof AdminSection, cell: (s: AdminSection) => <span className="font-medium">{s.name}</span> },
    { header: "Flow", accessorKey: "flow" as keyof AdminSection },
    { header: "Order", accessorKey: "order" as keyof AdminSection },
    {
      header: "Actions",
      cell: (s: AdminSection) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(s.id)} className="text-red-600">
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
          <h1 className="text-2xl font-bold text-slate-900">Question Sections</h1>
          <p className="text-slate-600">Manage section groupings for dynamic forms.</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90">
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <DataTable
        data={sections}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search sections..."
      />
    </div>
  )
}
