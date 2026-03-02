
import * as React from "react"
import { DataTable } from "@/components/admin/ui/DataTable"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Eye, Download, FileSignature } from "lucide-react"
import { MOCK_ADMIN_NDAS, AdminNDA } from "@/data/mockAdminData"

export default function ProjectContacts() {
  const [selectedNDA, setSelectedNDA] = React.useState<AdminNDA | null>(null)

  const columns = [
    { header: "Project Name", accessorKey: "projectName" as keyof AdminNDA, cell: (n: AdminNDA) => <span className="font-medium">{n.projectName}</span> },
    { header: "Buyer", accessorKey: "buyerName" as keyof AdminNDA },
    { header: "Seller", accessorKey: "sellerName" as keyof AdminNDA },
    { header: "Date Signed", accessorKey: "dateSigned" as keyof AdminNDA },
    {
      header: "Actions",
      cell: (n: AdminNDA) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedNDA(n)}>
          <Eye className="mr-2 h-4 w-4" /> View NDA
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">NDA Signatures</h1>
          <p className="text-slate-600">Track executed non-disclosure agreements.</p>
        </div>
      </div>

      <DataTable
        data={MOCK_ADMIN_NDAS}
        columns={columns}
        searchKey="projectName"
        searchPlaceholder="Search by project..."
      />

      <Sheet open={!!selectedNDA} onOpenChange={(o) => !o && setSelectedNDA(null)}>
        <SheetContent className="w-[600px] sm:w-[800px]">
          <SheetHeader className="mb-6">
            <SheetTitle>Executed NDA</SheetTitle>
            <SheetDescription>
              Signed on {selectedNDA?.dateSigned}
            </SheetDescription>
          </SheetHeader>
          
          <div className="border border-slate-200 rounded-lg p-8 bg-slate-50 min-h-[500px] text-sm font-mono text-slate-700 mb-6">
            <div className="text-center mb-8">
              <h3 className="font-bold text-lg uppercase mb-2">Non-Disclosure Agreement</h3>
              <p>Reference: {selectedNDA?.id.toUpperCase()}</p>
            </div>
            <p className="mb-4">
              This Agreement is made between <strong>{selectedNDA?.buyerName}</strong> ("Recipient") and <strong>{selectedNDA?.sellerName}</strong> ("Discloser") regarding the project <strong>{selectedNDA?.projectName}</strong>.
            </p>
            <p className="mb-4">
              1. Confidential Information...
            </p>
            <p className="mb-4">
              [... Full legal text placeholder ...]
            </p>
            <div className="mt-12 pt-8 border-t border-slate-300 grid grid-cols-2 gap-8">
              <div>
                <p className="mb-4">Signed by Recipient:</p>
                <div className="h-12 border-b border-slate-400 mb-2 font-handwriting text-2xl text-blue-800">
                  {selectedNDA?.buyerName}
                </div>
                <p className="text-xs text-slate-500">Date: {selectedNDA?.dateSigned}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
