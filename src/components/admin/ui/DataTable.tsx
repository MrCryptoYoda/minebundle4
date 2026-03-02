
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, Filter, Download } from "lucide-react"

interface DataTableProps<T> {
  data: T[]
  columns: {
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => React.ReactNode
  }[]
  searchKey?: keyof T
  searchPlaceholder?: string
  filterOptions?: {
    label: string
    key: keyof T
    options: string[]
  }[]
  onExport?: () => void
  actionLabel?: string
  onAction?: () => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  filterOptions,
  onExport,
  actionLabel,
  onAction
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filters, setFilters] = React.useState<Record<string, string[]>>({})

  // Filter Logic
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Search
      if (searchKey) {
        const value = String(item[searchKey]).toLowerCase()
        if (!value.includes(searchTerm.toLowerCase())) return false
      }
      
      // Filters
      for (const [key, value] of Object.entries(filters)) {
        const selectedOptions = value as string[]
        if (selectedOptions && selectedOptions.length > 0) {
          const itemValue = String(item[key as keyof T])
          if (!selectedOptions.includes(itemValue)) return false
        }
      }
      
      return true
    })
  }, [data, searchTerm, filters, searchKey])

  const toggleFilter = (key: string, option: string) => {
    setFilters(prev => {
      const current = prev[key] || []
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      return { ...prev, [key]: updated }
    })
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          {searchKey && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
          )}
          
          {filterOptions?.map((filter) => (
            <DropdownMenu key={String(filter.key)}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-dashed">
                  <Filter className="mr-2 h-4 w-4" />
                  {filter.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {filter.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={(filters[String(filter.key)] || []).includes(option)}
                    onCheckedChange={() => toggleFilter(String(filter.key), option)}
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          {actionLabel && onAction && (
            <Button onClick={onAction} className="bg-brand-orange hover:bg-brand-orange/90">
              {actionLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className="font-semibold text-slate-700">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  {columns.map((col, idx) => (
                    <TableCell key={idx}>
                      {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] || '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-slate-500">
          Showing {filteredData.length} results
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  )
}
