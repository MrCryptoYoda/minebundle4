
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MOCK_QUESTIONS, AdminQuestion } from "@/data/mockAdminData"
import { useToast } from "@/components/ui/use-toast"

export default function QuestionManagement() {
  const { toast } = useToast()
  const [questions, setQuestions] = React.useState(MOCK_QUESTIONS)

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
    toast({ title: "Question Deleted", description: "Question removed successfully." })
  }

  const columns = [
    { header: "Question Text", accessorKey: "text" as keyof AdminQuestion, cell: (q: AdminQuestion) => <span className="font-medium">{q.text}</span> },
    { header: "Type", accessorKey: "type" as keyof AdminQuestion, cell: (q: AdminQuestion) => <Badge variant="outline">{q.type}</Badge> },
    { header: "Step", accessorKey: "step" as keyof AdminQuestion },
    { header: "Section", accessorKey: "section" as keyof AdminQuestion },
    { header: "Required", accessorKey: "required" as keyof AdminQuestion, cell: (q: AdminQuestion) => q.required ? <span className="text-red-500 text-xs font-bold">YES</span> : <span className="text-slate-400 text-xs">NO</span> },
    {
      header: "Actions",
      cell: (q: AdminQuestion) => (
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
            <DropdownMenuItem onClick={() => handleDelete(q.id)} className="text-red-600">
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
          <h1 className="text-2xl font-bold text-slate-900">Question Management</h1>
          <p className="text-slate-600">Configure dynamic questions for listings and arbitration.</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90">
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>
      </div>

      <DataTable
        data={questions}
        columns={columns}
        searchKey="text"
        searchPlaceholder="Search questions..."
        filterOptions={[
          { label: "Type", key: "type", options: ["Text", "YesNo", "Select", "MultiSelect", "FileUpload"] },
          { label: "Section", key: "section", options: ["Property Details", "Reserves"] }
        ]}
      />
    </div>
  )
}
